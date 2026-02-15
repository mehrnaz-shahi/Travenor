import { Pressable, Text, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';

import LeftIcon from 'assets/icons/tools/direction left.svg';
import CalenderIcon from 'assets/icons/tools/Calendar.svg';
import LocationIcon from 'assets/icons/tools/Location.svg';

export default function Schedule() {
  const insets = useSafeAreaInsets();
  const [selectedDate, setSelectedDate] = useState<number | null>();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'week' or 'month'

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long' });
  const year = currentMonth.getFullYear();

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(null);
  };

  // Generate week dates
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentMonth);
    date.setDate(date.getDate() + i);
    return {
      dayLetter: date.toLocaleDateString('en-US', { weekday: 'short' })[0],
      dayNumber: date.getDate(),
      fullDate: date,
      month: date.getMonth(),
      year: date.getFullYear(),
      isToday: date.toDateString() === new Date().toDateString(),
    };
  });

  // Generate month dates
  const getMonthDates = () => {
    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    return Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i + 1);
      return {
        dayNumber: i + 1,
        fullDate: date,
        isToday: date.toDateString() === new Date().toDateString(),
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      };
    });
  };

  return (
    <View className="flex-1 p-5" style={{ paddingTop: insets.top }}>
      <View
        className="gap-3 rounded-3xl bg-white p-4 py-6 shadow-e1 shadow-neutral-300"
        style={{ boxShadow: '0 6px 16px 0 rgba(180, 188, 201, 0.12)' }}>
        
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <Pressable onPress={goToToday}>
            <Text className="font-interBold text-lg">{monthName} {year}</Text>
          </Pressable>
          <View className="flex-row items-center gap-4">
            <Pressable 
              onPress={goToPreviousMonth}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <LeftIcon />
            </Pressable>
            <Pressable 
              onPress={goToNextMonth}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <LeftIcon style={{ transform: [{ rotate: '180deg' }] }} />
            </Pressable>
          </View>
        </View>

        {/* View mode toggle */}
        <View className="flex-row gap-2">
          <Pressable 
            className={`px-4 py-2 rounded-full ${viewMode === 'week' ? 'bg-secondary-400' : 'bg-neutral-100'}`}
            onPress={() => setViewMode('week')}>
            <Text className={viewMode === 'week' ? 'text-white' : 'text-neutral-600'}>Week</Text>
          </Pressable>
          <Pressable 
            className={`px-4 py-2 rounded-full ${viewMode === 'month' ? 'bg-secondary-400' : 'bg-neutral-100'}`}
            onPress={() => setViewMode('month')}>
            <Text className={viewMode === 'month' ? 'text-white' : 'text-neutral-600'}>Month</Text>
          </Pressable>
        </View>

        {/* Date selector */}
        {viewMode === 'week' ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row items-center gap-2">
              {weekDates.map((date, index) => (
                <Pressable
                  key={`${date.month}-${date.dayNumber}-${index}`}
                  className={`items-center gap-2 rounded-xl ${
                    selectedDate === index ? 'bg-secondary-400' : date.isToday ? 'bg-neutral-100' : ''
                  } p-3 min-w-[50px]`}
                  onPress={() => setSelectedDate(index)}>
                  <Text
                    className={`font-interRegular text-xs ${
                      selectedDate === index ? 'text-white' : 
                      date.isToday ? 'text-secondary-400' : 'text-neutral-400'
                    }`}>
                    {date.dayLetter}
                  </Text>
                  <Text
                    className={`font-interMedium text-base ${
                      selectedDate === index ? 'text-white' : 
                      date.isToday ? 'text-secondary-400' : 'text-neutral-900'
                    }`}>
                    {date.dayNumber}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        ) : (
          <View className="flex-row flex-wrap">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <View key={i} className="w-[14.28%] items-center p-2">
                <Text className="font-interMedium text-neutral-400">{day}</Text>
              </View>
            ))}
            {getMonthDates().map((date, index) => (
              <Pressable
                key={index}
                className={`w-[14.28%] items-center p-3 rounded-xl ${
                  selectedDate === index ? 'bg-secondary-400' : 
                  date.isToday ? 'bg-neutral-100' : ''
                }`}
                onPress={() => setSelectedDate(index)}>
                <Text
                  className={`font-interMedium ${
                    selectedDate === index ? 'text-white' : 
                    date.isToday ? 'text-secondary-400' : 'text-neutral-900'
                  }`}>
                  {date.dayNumber}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}