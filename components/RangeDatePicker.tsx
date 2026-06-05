import moment, { Moment } from 'moment';
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { View, Text, Pressable, Modal, Dimensions } from 'react-native';
import { FlashList, type FlashListRef } from '@shopify/flash-list';

const { width } = Dimensions.get('window');
const CELL_SIZE = Math.floor((width - 80) / 7); // 40px padding total (px-5 on container)
const WEEKDAYS_SHORT = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

/** Saturday = start of week, Friday = end (Persian calendar grid). */
const isWeekStart = (day: Moment) => day.day() === 6;
const isWeekEnd = (day: Moment) => day.day() === 0;

type Props = {
  initialStartDate?: Moment;
  initialEndDate?: Moment;
  year?: {
    beginningYear?: number;
    range?: [number, number];
  };
  errorMessage?: string;
  onChange?: (start: Moment | undefined, end: Moment | undefined) => void;
  onClose: () => void;
  onConfirm: (start: Moment | undefined, end: Moment | undefined) => void;
};

export default function RangeDatePicker(props: Props) {
  const { initialStartDate, initialEndDate, onChange, year, onClose, onConfirm, errorMessage } =
    props;

  const [currentMonth, setCurrentMonth] = useState(initialStartDate || moment());
  const [startDate, setStartDate] = useState<Moment | undefined>(initialStartDate);
  const [endDate, setEndDate] = useState<Moment | undefined>(initialEndDate);
  const [pointer, setPointer] = useState<'start' | 'end'>('start');
  const [showYearPicker, setShowYearPicker] = useState(false);

  const flashListRef = useRef<FlashListRef<Moment>>(null);
  // 1. Generate list of years
  const YEARS = useMemo(() => {
    const yearRange = year?.range;
    if (yearRange) {
      const [from, to] = yearRange;
      return Array.from({ length: to - from + 1 }, (_, i) => from + i);
    }
    const values = [];
    const currentYear = moment().year();
    for (let i = year?.beginningYear || 2020; i <= currentYear + 5; i++) {
      values.push(i);
    }
    return values;
  }, [year]);

  // 2. Generate list of all months to feed FlashList
  const scrollMonths = useMemo(() => {
    const months: Moment[] = [];
    YEARS.forEach((y) => {
      for (let m = 0; m < 12; m++) {
        months.push(moment().year(y).month(m).startOf('month'));
      }
    });
    return months;
  }, [YEARS]);

  // Handle auto-scroll to initial date or selected month
  const scrollToMonth = useCallback(
    (target: Moment, animated = false) => {
      const index = scrollMonths.findIndex(
        (m) => m.year() === target.year() && m.month() === target.month()
      );
      if (index !== -1 && flashListRef.current) {
        // Approximate height estimate per month block for smooth tracking
        flashListRef.current.scrollToIndex({ index, animated });
      }
    },
    [scrollMonths]
  );

  useEffect(() => {
    const target = initialStartDate || moment();
    setTimeout(() => scrollToMonth(target, false), 100);
  }, [scrollToMonth, initialStartDate]);

  const goToToday = () => {
    const now = moment();
    setCurrentMonth(now);
    scrollToMonth(now, true);
  };

  const clearDates = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setPointer('start');
    onChange?.(undefined, undefined);
  };

  const handleYearChange = (selectedYear: number) => {
    const nextMonth = currentMonth.clone().year(selectedYear);
    setCurrentMonth(nextMonth);
    setShowYearPicker(false);
    // Defer scroll slightly to let UI close the modal smoothly
    setTimeout(() => scrollToMonth(nextMonth, true), 50);
  };

  const handleDateClick = useCallback(
    (date: Moment) => {
      let newStart = startDate;
      let newEnd = endDate;

      if (!startDate || pointer === 'start') {
        newStart = date;
        newEnd = undefined;
        setPointer('end');
      } else if (date.isBefore(startDate)) {
        newStart = date;
        newEnd = undefined;
        setPointer('end');
      } else {
        newEnd = date;
      }

      setStartDate(newStart);
      setEndDate(newEnd);
      onChange?.(newStart, newEnd);
    },
    [startDate, endDate, pointer, onChange]
  );
  // 1. Update this function to explicitly chunk days into weeks of 7
  const getMonthGrid = useCallback((month: Moment) => {
    const start = month.clone().startOf('month').startOf('week');
    const end = month.clone().endOf('month').endOf('week');
    const days: Moment[] = [];
    let d = start.clone();

    while (d.isBefore(end) || d.isSame(end, 'day')) {
      days.push(d.clone());
      d.add(1, 'day');
    }

    // Chunk the flat array into arrays of 7 days (weeks)
    const weeks: Moment[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
  }, []);

  // Memoized grid data builder to optimize FlashList item loops
  const getMonthDays = useCallback((month: Moment) => {
    const start = month.clone().startOf('month').startOf('week');
    const end = month.clone().endOf('month').endOf('week');
    const days: Moment[] = [];
    let d = start.clone();

    while (d.isBefore(end)) {
      days.push(d.clone());
      d.add(1, 'day');
    }
    return days;
  }, []);

  // Performance optimized individual cell renderer
  const renderDayCell = useCallback(
    (day: Moment, month: Moment) => {
      const isActive = day.month() === month.month() && day.year() === month.year();
      const today = moment();

      // Removed styling separation gaps between cells completely
      if (!isActive) {
        return (
          <View key={day.format('YYYY-MM-DD')} style={{ width: CELL_SIZE, height: CELL_SIZE }} />
        );
      }

      const isToday = day.isSame(today, 'day');
      const isStart = !!(startDate && day.isSame(startDate, 'day'));
      const isEnd = !!(endDate && day.isSame(endDate, 'day'));
      const inRange =
        !!startDate && !!endDate && day.isAfter(startDate, 'day') && day.isBefore(endDate, 'day');

      return (
        <Pressable
          key={day.format('YYYY-MM-DD')}
          onPress={() => handleDateClick(day)}
          style={{ width: CELL_SIZE, height: CELL_SIZE }}
          className="relative items-center justify-center">
          {/* Continuous block background for inner-range dates */}
          {inRange && (
            <View
              className={`absolute inset-y-1 left-0 right-0 bg-blue-100 ${isWeekStart(day) ? 'rounded-e-lg' : isWeekEnd(day) ? 'rounded-s-lg' : ''} `}
            />
          )}

          {/* Tailored ends for Start and End dates to remove rendering spacing artifacts */}
          {isStart && (
            <View className="absolute inset-y-1 left-1/2 right-0 rounded-s-lg bg-blue-100 opacity-100" />
          )}
          {isEnd && startDate && (
            <View className="absolute inset-y-1 left-0 right-1/2 rounded-e-lg bg-blue-100 opacity-100" />
          )}

          {/* Solid indicator layer */}
          {(isStart || isEnd) && <View className="absolute h-9 w-9 rounded-full bg-blue-600" />}

          {isToday && !(isStart || isEnd) && (
            <View className="absolute h-9 w-9 rounded-full border-2 border-blue-600" />
          )}

          <Text
            className={`z-10 text-sm font-semibold ${
              isStart || isEnd ? 'text-white' : 'text-neutral-800'
            }`}>
            {day.date()}
          </Text>
        </Pressable>
      );
    },
    [startDate, endDate, handleDateClick]
  );

  // Main optimization engine: Item component mapping inside FlashList row pipelines
  const renderMonthItem = useCallback(
    ({ item: month }: { item: Moment }) => {
      const weeks = getMonthGrid(month);

      return (
        <View className="mb-6">
          <Text className="mb-3 px-1 text-center text-lg font-bold text-gray-800">
            {month.format('MMMM YYYY')}
          </Text>

          {/* Render each week as an isolated, un-breakable row */}
          {weeks.map((week, weekIndex) => (
            <View key={weekIndex} className="flex-row justify-start">
              {week.map((day) => renderDayCell(day, month))}
            </View>
          ))}
        </View>
      );
    },
    [getMonthGrid, renderDayCell]
  );

  // Track scroll position changes to smoothly update header tracking values
  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems && viewableItems.length > 0) {
      const firstVisible = viewableItems[0].item;
      if (firstVisible) setCurrentMonth(firstVisible);
    }
  }).current;

  return (
    <View className="flex-1 bg-white">
      {/* Header Controls */}
      <View className="flex-row items-center justify-between px-5 pb-3">
        <View className="flex-row items-center gap-3">
          <Pressable
            onPress={() => setShowYearPicker(true)}
            className="flex-row items-center gap-1 rounded-2xl bg-gray-100 px-5 py-2.5">
            <Text className="text-base font-semibold text-gray-800">{currentMonth.year()}</Text>
            <Text className="text-xs text-gray-500">▼</Text>
          </Pressable>

          <Pressable
            onPress={goToToday}
            className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-2.5">
            <Text className="text-sm font-medium text-blue-600">Today</Text>
          </Pressable>
        </View>

        <Pressable onPress={clearDates} className="rounded-2xl border border-gray-300 px-5 py-2.5">
          <Text className="text-sm font-medium text-gray-600">Clear</Text>
        </Pressable>
      </View>

      {/* Selected Range Display Panel */}
      <View className="m-5 flex-row rounded-2xl border border-blue-100 bg-blue-50">
        <Pressable
          onPress={() => setPointer('start')}
          className="relative flex-1 border-r border-blue-200 p-4">
          <Text className="text-xs font-semibold uppercase text-blue-600 text-center">Start Date</Text>
          <Text className="mt-1 text-sm font-bold text-gray-800 text-center">
            {startDate ? startDate.format('ddd, MMM D') : '—'}
          </Text>
          {pointer === 'start' && (
            <View className={`absolute bottom-0 right-4 h-1 w-full rounded-md bg-blue-400`} />
          )}
        </Pressable>

        <Pressable onPress={() => setPointer('end')} className="flex-1 p-4">
          <Text className="text-xs font-semibold uppercase text-blue-600 text-center">End Date</Text>
          <Text className="mt-1 text-sm font-bold text-gray-800 text-center">
            {endDate ? endDate.format('ddd, MMM D') : '—'}
          </Text>
          {pointer === 'end' && (
            <View className={`absolute bottom-0 right-4 h-1 w-full rounded-md bg-blue-400`} />
          )}
        </Pressable>
      </View>
      {/* Sticky Weekdays Header Section */}
      <View className="border-b border-gray-100 bg-white px-5 pb-3 pt-2">
        <View className="flex-row justify-start">
          {WEEKDAYS_SHORT.map((w, i) => (
            <Text
              key={i}
              style={{ width: CELL_SIZE }}
              className="text-center text-xs font-bold uppercase tracking-wider text-gray-400">
              {w}
            </Text>
          ))}
        </View>
      </View>

      {/* Recycler engine substituting ScrollView */}
      <View className="flex-1 px-5">
        <FlashList
          ref={flashListRef}
          data={scrollMonths}
          renderItem={renderMonthItem}
          showsVerticalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          extraData={`${startDate?.format()}-${endDate?.format()}-${pointer}`}
        />
      </View>

      {/* Action Buttons Block */}
      <View className="border-t border-gray-100 bg-white px-5 pt-4">
        {errorMessage && (
          <View className="mb-4 flex-row items-center gap-2 rounded-xl bg-red-50 p-3">
            <Text className="text-sm font-medium text-red-600">{errorMessage}</Text>
          </View>
        )}

        <View className="flex-row gap-3">
          <Pressable onPress={onClose} className="flex-1 rounded-2xl border border-gray-300 py-4">
            <Text className="text-center font-semibold text-gray-600">Cancel</Text>
          </Pressable>

          <Pressable
            onPress={() => onConfirm(startDate, endDate)}
            className="flex-1 rounded-2xl bg-blue-600 py-4">
            <Text className="text-center font-semibold text-white">Confirm</Text>
          </Pressable>
        </View>
      </View>

      {/* Full Grid Modal for Year Picker Selection */}
      <Modal visible={showYearPicker} transparent animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/40 px-6">
          <View className="max-h-[70%] w-full rounded-3xl bg-white p-6 shadow-xl">
            <Text className="mb-4 text-center text-xl font-bold text-gray-800">Select Year</Text>

            <View className="flex-row flex-wrap justify-between gap-y-3">
              {YEARS.map((y) => {
                const isSelected = currentMonth.year() === y;
                return (
                  <Pressable
                    key={y}
                    onPress={() => handleYearChange(y)}
                    style={{ width: '30%' }}
                    className={`items-center justify-center rounded-xl py-3 ${
                      isSelected ? 'bg-blue-600' : 'bg-gray-100'
                    }`}>
                    <Text
                      className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-700'}`}>
                      {y}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              onPress={() => setShowYearPicker(false)}
              className="mt-6 w-full rounded-2xl border border-gray-300 py-3.5">
              <Text className="text-center font-semibold text-gray-600">Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
