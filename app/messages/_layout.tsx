import { Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomHeader from 'components/CustomHeader';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MessagesLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Stack
      screenOptions={{
        header: ({ route, options }) => {
          const title = options.title ?? route.name;
          const right = (
            <View className="rounded-full bg-neutral-100 p-3">
              <Ionicons name="create-outline" size={22} color="#000" />
            </View>
          );
          return (
            <CustomHeader
              title={title}
              right={right}
              // canGoBack={route.name !== 'index'}
            />
          );
        },
        headerShadowVisible: false,
        animation: 'fade',
        contentStyle: {
          flex: 1,
          backgroundColor: '#fff',
        },
      }}>
      <Stack.Screen name="index" options={{ title: 'Messages' }} />
      <Stack.Screen name="chat" options={{ title: 'Chat' }} />
    </Stack>
  );
}
