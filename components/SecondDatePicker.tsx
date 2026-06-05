import React, { useState, useMemo } from 'react';
import { Pressable, ScrollView, Text, View, StyleProp, ViewStyle } from 'react-native';
import LeftIcon from 'assets/icons/tools/direction left.svg';

// Prop interfaces for complete integration versatility
type DatePickerProps = {
  initialDate?: Date;
  onDateSelect?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  containerStyle?: StyleProp<ViewStyle>;
  accentColorClass?: string; // e.g. 'bg-secondary-400' or 'bg-blue-600'
  textColorClass?: string;   // e.g. 'text-secondary-400' or 'text-blue-600'
};

const WEEKDAY_HEADERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function SecondDatePicker({
  initialDate = new Date(),
  onDateSelect,
  minDate,
  maxDate,
  containerStyle,
  accentColorClass = 'bg-secondary-400',
  textColorClass = 'text-secondary-400',
}: DatePickerProps) {
  
  // Format utility to lock down state identifiers
  const formatDateString = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const [selectedDateStr, setSelectedDateStr] = useState<string>(formatDateString(initialDate));
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(initialDate.getFullYear(), initialDate.getMonth(), 1));
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  const todayStr = formatDateString(new Date());
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long' });
  const year = currentMonth.getFullYear();

  // Navigation handlers
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const goToToday = () => {
    const now = new Date();
    setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
    handleDateSelection(now);
  };

  const handleDateSelection = (date: Date) => {
    // Boundary validations
    if (minDate && date < new Date(minDate.setHours(0,0,0,0))) return;
    if (maxDate && date > new Date(maxDate.setHours(23,59,59,999))) return;

    const dateStr = formatDateString(date);
    setSelectedDateStr(dateStr);
    onDateSelect?.(date);
  };

  // 1. Generate Structured Week View Array (Aligned to Start of Week)
  const weekDates = useMemo(() => {
    const activeDate = selectedDateStr ? new Date(selectedDateStr) : new Date();
    const currentDayOfWeek = activeDate.getDay();
    const sundayOffset = new Date(activeDate);
    sundayOffset.setDate(activeDate.getDate() - currentDayOfWeek);

    return Array.from({ length: 7 }, (_, i) => {
      const targetDate = new Date(sundayOffset);
      targetDate.setDate(sundayOffset.getDate() + i);
      const str = formatDateString(targetDate);
      
      return {
        dayLetter: targetDate.toLocaleDateString('en-US', { weekday: 'short' })[0],
        dayNumber: targetDate.getDate(),
        fullDate: targetDate,
        dateStr: str,
        isToday: str === todayStr,
        isSelected: str === selectedDateStr,
      };
    });
  }, [selectedDateStr, todayStr]);

  // 2. Generate Monthly View Layout Components (With Grid Empty Placeholders)
  const monthGridData = useMemo(() => {
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    
    const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday etc.
    const daysInMonth = lastDayOfMonth.getDate();

    const grid = [];

    // Append necessary prefix spacers to push the 1st of the month to its correct weekday column
    for (let i = 0; i < startingDayOfWeek; i++) {
      grid.push({ isPlaceholder: true, key: `space-${i}`, dayNumber: 0, dateStr: '', isToday: false, isSelected: false, fullDate: new Date() });
    }

    // Append actual operational days
    for (let day = 1; day <= daysInMonth; day++) {
      const targetDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const str = formatDateString(targetDate);
      grid.push({
        isPlaceholder: false,
        key: `day-${day}`,
        dayNumber: day,
        dateStr: str,
        isToday: str === todayStr,
        isSelected: str === selectedDateStr,
        fullDate: targetDate,
      });
    }

    return grid;
  }, [currentMonth, selectedDateStr, todayStr]);

  return (
    <View
      className="gap-3 rounded-3xl bg-white p-4 py-6 shadow-e1 shadow-neutral-300"
      style={[{ boxShadow: '0 6px 16px 0 rgba(180, 188, 201, 0.12)' }, containerStyle]}
    >
      {/* Top Banner Navigation */}
      <View className="flex-row items-center justify-between">
        <Pressable onPress={goToToday}>
          <Text className="font-interBold text-lg text-neutral-900">
            {monthName} {year}
          </Text>
        </Pressable>
        <View className="flex-row items-center gap-4">
          <Pressable onPress={goToPreviousMonth} hitSlop={12}>
            <LeftIcon />
          </Pressable>
          <Pressable onPress={goToNextMonth} hitSlop={12}>
            <LeftIcon style={{ transform: [{ rotate: '180deg' }] }} />
          </Pressable>
        </View>
      </View>

      {/* View Mode Select Toggles */}
      <View className="flex-row gap-2">
        <Pressable
          className={`rounded-full px-4 py-2 ${viewMode === 'week' ? accentColorClass : 'bg-neutral-100'}`}
          onPress={() => setViewMode('week')}
        >
          <Text className={`font-interMedium text-sm ${viewMode === 'week' ? 'text-white' : 'text-neutral-600'}`}>Week</Text>
        </Pressable>
        <Pressable
          className={`rounded-full px-4 py-2 ${viewMode === 'month' ? accentColorClass : 'bg-neutral-100'}`}
          onPress={() => setViewMode('month')}
        >
          <Text className={`font-interMedium text-sm ${viewMode === 'month' ? 'text-white' : 'text-neutral-600'}`}>Month</Text>
        </Pressable>
      </View>

      {/* Conditional Presentation Content Layout */}
      {viewMode === 'week' ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row items-center gap-2">
            {weekDates.map((item) => (
              <Pressable
                key={item.dateStr}
                className={`items-center gap-2 rounded-xl min-w-[50px] p-3 ${
                  item.isSelected ? accentColorClass : item.isToday ? 'bg-neutral-100' : ''
                }`}
                onPress={() => handleDateSelection(item.fullDate)}
              >
                <Text
                  className={`font-interRegular text-xs ${
                    item.isSelected ? 'text-white' : item.isToday ? textColorClass : 'text-neutral-400'
                  }`}
                >
                  {item.dayLetter}
                </Text>
                <Text
                  className={`font-interMedium text-base ${
                    item.isSelected ? 'text-white' : item.isToday ? textColorClass : 'text-neutral-900'
                  }`}
                >
                  {item.dayNumber}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row flex-wrap">
          {/* Static Calendar Grid Header Row */}
          {WEEKDAY_HEADERS.map((day, i) => (
            <View key={`header-${i}`} className="w-[14.28%] items-center p-2">
              <Text className="font-interMedium text-neutral-400 text-xs">{day}</Text>
            </View>
          ))}

          {/* Dynamic Month Layout Days */}
          {monthGridData.map((cell) => {
            if (cell.isPlaceholder) {
              return <View key={cell.key} className="w-[14.28%] p-3" />;
            }

            return (
              <Pressable
                key={cell.dateStr}
                className={`w-[14.28%] items-center rounded-xl p-3 ${
                  cell.isSelected ? accentColorClass : cell.isToday ? 'bg-neutral-100' : ''
                }`}
                onPress={() => handleDateSelection(cell.fullDate)}
              >
                <Text
                  className={`font-interMedium text-sm ${
                    cell.isSelected ? 'text-white' : cell.isToday ? textColorClass : 'text-neutral-900'
                  }`}
                >
                  {cell.dayNumber}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}