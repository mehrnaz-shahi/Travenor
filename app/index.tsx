import { Link, useRouter } from 'expo-router';
import { View, Text, Image, Pressable, ScrollView, FlatList } from 'react-native';
import LocationCard from 'components/LocationCard';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { mockLocations } from './data/mockLocations';
import Button from 'components/Button';
import ChatIcon from 'assets/icons/tools/Caht.svg';
import MiniLocationCard from 'components/location/MiniLocationCard';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];

const Tab = createBottomTabNavigator();
// --- Custom TabBarIcon Component ---
const TabBarIcon = ({
  focused,
  name,
  label,
}: {
  focused: boolean;
  name: string;
  label: string;
}) => {
  // Determine icon name based on tab label
  let iconName: IoniconsName;
  const iconSize = 24;

  switch (label) {
    case 'Home':
      iconName = 'home-outline';
      break;
    case 'Search':
      iconName = 'search-outline';
      break;
    case 'Analytics':
      // The Analytics icon is customized to match the image
      return (
        <View className="items-center justify-center">
          {/* Active indicator bar */}
          {focused && <View className="absolute top-0 h-[2px] w-8 bg-indigo-600" />}
          {/* Icon */}
          <Ionicons name="pie-chart" size={iconSize} color={focused ? '#4f46e5' : '#737373'} />
          {/* Label */}
          <Text
            className={`mt-1 text-xs ${
              focused ? 'font-medium text-indigo-600' : 'text-neutral-600'
            }`}>
            {label}
          </Text>
        </View>
      );
    case 'History':
      iconName = 'time-outline';
      break;
    case 'Profile':
      iconName = 'person-outline';
      break;
    default:
      iconName = 'information-circle-outline';
      break;
  }

  // Common styles for all other tabs
  return (
    <View className="items-center justify-center">
      {/* Active indicator bar - hidden when not focused */}
      {focused ? <View className=" h-[4px] w-8 bg-indigo-600" /> : null}
      {/* Icon */}
      <Ionicons
        name={iconName}
        size={iconSize}
        color={focused ? '#4f46e5' : '#737373'} // indigo-600 or neutral-600
      />
      {/* Label */}
      {focused ? <Text className={`mt-1 text-xs font-medium text-indigo-600`}>{label}</Text> : null}
    </View>
  );
};

export default function Home() {
  const router = useRouter();
  return (
    // <Tab.Navigator
    //   initialRouteName="Analytics" // Set Analytics as the initial active tab
    //   screenOptions={{
    //     // Hide the default header (top bar)
    //     headerShown: false,
    //     // Custom style for the entire tab bar container
    //     tabBarStyle: {
    //       // Apply NativeWind classes to the tab bar using a custom class (for styling flexibility)
    //       // bg-white, pt-2, border-t-0, rounded-t-3xl (for a subtle top curve)
    //       backgroundColor: '#fff',
    //       height: 90, // Increased height to accommodate the icon/label and padding
    //       borderTopWidth: 0,
    //       paddingTop: 0,
    //       paddingBottom: 0, // Adjust this as needed for your device's safe area
    //       position: 'relative',
    //       display: 'flex',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //     },
    //     // Hide the default tab label, we render it inside the TabBarIcon
    //     tabBarShowLabel: false,
    //   }}>
    //   <Tab.Screen
    //     name="Home"
    //     component={Detail}
    //     options={{
    //       tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} label="Home" name="Home" />,
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Search"
    //     component={Detail}
    //     options={{
    //       tabBarIcon: ({ focused }) => (
    //         <TabBarIcon focused={focused} label="Search" name="Search" />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Analytics"
    //     component={Detail}
    //     options={{
    //       tabBarIcon: ({ focused }) => (
    //         <TabBarIcon focused={focused} label="Analytics" name="Analytics" />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="History"
    //     component={Detail}
    //     options={{
    //       tabBarIcon: ({ focused }) => (
    //         <TabBarIcon focused={focused} label="History" name="History" />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Profile"
    //     component={Detail}
    //     options={{
    //       tabBarIcon: ({ focused }) => (
    //         <TabBarIcon focused={focused} label="Profile" name="Profile" />
    //       ),
    //     }}
    //   />
    // </Tab.Navigator>
    <View className="flex-1">
      <ScrollView className="flex-1">
        <View className="p-4">
          <Text className="px-4 text-3xl">Explore the</Text>
          <Text className="mt-3 px-4 text-4xl">
            <Text className="font-interBold">Beautiful </Text>
            <Text className="font-interBold text-secondary-400">World!</Text>
          </Text>
          <Svg
            width="90"
            height="11"
            viewBox="0 0 90 11"
            fill="none"
            style={{
              position: 'absolute',
              top: 95,
              left: 180,
            }}>
            <Path
              d="M0.842178 10.2928C10.4052 2.39336 53.4585 -7.54222 89.5617 9.79897C69.5956 4.34441 28.7914 0.401048 0.842178 10.2928Z"
              fill="#FF7029"
            />
          </Svg>
        </View>
        <View className="mt-8 flex-row items-center justify-between px-8">
          <Text className="font-interBold text-2xl text-neutral-700 mb-4">Best destination</Text>
          <Text className="font-interRegular text-lg text-secondary-500">View all</Text>
        </View>
        <FlatList
          data={mockLocations}
          keyExtractor={(item) => 'cd' + item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 16, paddingBottom: 16, paddingHorizontal: 16 }}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() =>
                router.push({ pathname: '/location/detail', params: { id: item.id } })
              }>
              <LocationCard
                name={item.name}
                location={item.location}
                rate={item.rate}
                image={item.image}
              />
            </Pressable>
          )}
        />
        <View className="gap-4 p-5">
          <Text className='font-interBold text-2xl text-neutral-700'>Favorite Places</Text>
          {mockLocations.map((item, index) => {
            if (index % 2 === 1) return null;
            const nextItem = index < mockLocations.length ? mockLocations[index + 1] : null;
            return (
              <View key={index} className="w-full flex-row items-center gap-4">
                <MiniLocationCard image={item.image} name={item.name} location={item.location} />
                {nextItem && (
                  <MiniLocationCard
                    image={nextItem.image}
                    name={nextItem.name}
                    location={nextItem.location}
                  />
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Pressable
        onPress={() => router.navigate('/messages')}
        className="absolute bottom-2 end-4 ms-4 h-10 w-10 items-center justify-center rounded-full bg-primary-500 p-8">
        <ChatIcon stroke={'white'} />
      </Pressable>
    </View>
  );
}
