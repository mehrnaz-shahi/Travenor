import { Image, ScrollView, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { mockLocations } from '../data/mockLocations';

import LocationIcon from 'assets/icons/tools/Location.svg';
import StarIcon from 'assets/icons/tools/Star.svg';
import Button from 'components/Button';

const HEADER_HEIGHT = 64;

export default function Detail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const item = mockLocations.find((l) => l.id === Number(id));
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const heroHeight = insets.top + HEADER_HEIGHT + 380;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24 + 72 + insets.bottom }}
        showsVerticalScrollIndicator={false}>
        <View style={{ height: heroHeight, width, position: 'relative' }}>
          <Image
            source={item?.image ?? require('../../assets/images/desertVillage.jpg')}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: heroHeight,
              width,
            }}
            resizeMode="cover"
          />
          <View
            className={`absolute z-20 h-10 w-full rounded-t-[30px] bg-white`}
            style={{ bottom: 0 }}>
            <View className="mx-auto mt-3 h-2 w-16 rounded-md bg-neutral-200" />
          </View>
        </View>

        <View className="gap-4 p-5">
          <Text className="font-interMedium text-2xl">
            {item ? item.name : 'Location Detail Page'}
          </Text>
          <Text className="font-interRegular text-lg">
            {item ? item.name : 'Location Detail Page'}
          </Text>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-1">
              <LocationIcon />
              <Text className="text-neutral-500">Iran</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <StarIcon />
              <Text>4.7</Text>
              <Text className="text-neutral-500">(2065)</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <Text className="text-blue-500">$59/</Text>
              <Text className="text-neutral-500">Person</Text>
            </View>
          </View>

          <View className="flex-row items-center gap-4">
            {mockLocations.slice(0, 4).map((loc, key) => (
              <View key={loc.id} className="relative">
                {mockLocations.length > 4 && key === 3 && (
                  <View className="absolute left-0 top-0 z-10 h-full w-full items-center justify-center rounded-xl bg-neutral-600/50">
                    <Text className="font-interBold text-white">+{mockLocations.length - 4}</Text>
                  </View>
                )}
                <Image source={loc.image} style={{ width: 54, height: 54, borderRadius: 12 }} />
              </View>
            ))}
          </View>

          <View>
            <Text className="font-interBold text-lg">About Destination</Text>
            <Text className="text-neutral-600">
              You will get a complete travel package on the beaches. Packages in the form of airline
              tickets, recommended Hotel rooms, Transportation, Have you ever been on holiday to the
              Greek ETC... <Text className="text-secondary-500">Read More</Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className="mt-auto px-4">
        <Button onPress={() => router.navigate('/location/schedule')}>Book now</Button>
      </View>
    </View>
  );
}
