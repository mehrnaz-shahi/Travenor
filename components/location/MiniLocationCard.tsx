import { Image, ImageSourcePropType, Pressable, Text, View } from 'react-native';
import LocationIcon from 'assets/icons/tools/Location.svg';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

type LocationCardProps = {
  name: string;
  image: ImageSourcePropType | undefined;
  location: string;
};
export default function MiniLocationCard({ name, image, location }: LocationCardProps) {
  const [liked, setLiked] = useState(false);
  return (
    <View
      className="flex-1 rounded-3xl border border-neutral-100 p-4 pb-6"
      style={{ boxShadow: '0 6px 16px 0 rgba(180, 188, 201, 0.12)' }}>
      <Pressable
        className="absolute end-4 top-4 z-10 rounded-full bg-neutral-500/50 p-2"
        onPress={() => setLiked((prev) => !prev)}>
        {liked ? (
          <Ionicons name="heart" size={22} color={'white'} />
        ) : (
          <Ionicons name="heart-outline" size={22} color={'white'} />
        )}
      </Pressable>
      <Image source={image} style={{ width: '100%', height: 140, borderRadius: 20 }} />
      <View className="mt-2 flex-row items-center justify-between">
        <Text className="mt-2 font-interBold text-lg text-neutral-800">{name}</Text>
      </View>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-1">
          <LocationIcon />
          <Text className="mt-2 font-interRegular text-lg text-neutral-500">{location}</Text>
        </View>
      </View>
    </View>
  );
}
