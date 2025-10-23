import { Link, useRouter } from 'expo-router';
import { View, Text, Button, Image, Pressable, ScrollView, FlatList } from 'react-native';
import LocationCard from 'components/LocationCard';

export const mockLocations = [
  {
    id: 1,
    name: 'Sunny Beach Resort',
    image: require('assets/images/desertVillage.jpg'),
    location: 'California, USA',
    rate: 4.8,
  },
  {
    id: 2,
    name: 'Mountain Escape',
    image: require('assets/images/parking.jpg'),
    location: 'Aspen, Colorado',
    rate: 4.5,
  },
  {
    id: 3,
    name: 'City Lights Hotel',
    image: require('assets/images/village.jpg'),
    location: 'New York, USA',
    rate: 4.9,
  },
  {
    id: 4,
    name: 'Forest Retreat',
    image: require('assets/images/desertVillage.jpg'),
    location: 'Oregon, USA',
    rate: 4.7,
  },
  {
    id: 5,
    name: 'Desert Oasis',
    image: require('assets/images/desertVillage.jpg'),
    location: 'Arizona, USA',
    rate: 4.6,
  },
];

export default function Home() {
  return (
    <ScrollView>
      <View className='flex-row items-center justify-between px-8 mt-8'>
        <Text className='text-neutral-700 font-interBold text-2xl'>Best destination</Text>
        <Text className='text-secondary-500 text-lg font-interRegular'>View all</Text>
      </View>
      <FlatList
        data={mockLocations}
        keyExtractor={(item) => 'cd' + item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 16, paddingBottom: 16 }}
        renderItem={({ item, index }) => (
          <LocationCard
            name={item.name}
            location={item.location}
            rate={item.rate}
            image={item.image}
          />
        )}
      />
    </ScrollView>
  );
}
