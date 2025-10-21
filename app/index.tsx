import { Link, useRouter } from 'expo-router';
import { View, Text, Button, Image, Pressable } from 'react-native';

export default function Home() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="mb-4 text-2xl font-bold text-gray-800">صفحه اصلی</Text>
      <Pressable
        onPress={() => router.push('/login/tips')}
        className="mb-2 rounded-lg bg-white px-4 py-2 text-red-500 shadow-md">
        <Text>شروغ</Text>
      </Pressable>
    </View>
  );
}
