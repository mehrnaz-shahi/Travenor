import { Link } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>صفحه اصلی</Text>
      <Link href="/about">رفتن به درباره ما</Link>
      <Link href="/profile/10">پروفایل کاربر 10</Link>
    </View>
  );
}
