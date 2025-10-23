import { Image, ImageSourcePropType, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar1 from 'assets/images/avatar1.svg';
import Avatar2 from 'assets/images/avatar2.svg';
import Avatar3 from 'assets/images/avatar3.svg';

type LocationCardProps = {
  name: string;
  image: ImageSourcePropType | undefined;
  location: string;
  rate?: number;
};
export default function LocationCard({ name, image, location, rate }: LocationCardProps) {
  return (
    <View
      className="rounded-3xl p-4 pb-6"
      style={{ boxShadow: '0 6px 16px 0 rgba(180, 188, 201, 0.12)' }}>
      <Image source={image} style={{ width: 300, height: 300, borderRadius: 20 }} />
      <View className="mt-2 flex-row items-center justify-between">
        <Text className="mt-2 font-interBold text-lg text-neutral-800">{name}</Text>
        <View className="flex-row items-center gap-1">
          <Ionicons name="star" size={16} color="#FFD336" />
          <Text className="font-interRegular text-sm text-neutral-800">{rate}</Text>
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1">
          <Ionicons name="location-outline" size={16} color="#6B7280" />
          <Text className="mt-2 font-interRegular text-lg text-neutral-500">{location}</Text>
        </View>
        <View className="relative mb-5">
          <View className="absolute right-12 top-0">
            <Avatar1 />
          </View>
          <View className="absolute right-8 top-0">
            <Avatar2 />
          </View>
          <View className="absolute right-4 top-0">
            <Avatar3 />
          </View>
          <Text className="absolute right-0 top-0 rounded-full bg-primary-50 p-1 text-center font-interLight text-xs text-neutral-800 w-7 h-7">
            +50
          </Text>
        </View>
      </View>
    </View>
  );
}
