import { Stack, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import CustomHeader from 'components/CustomHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LocationLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Stack
      screenOptions={{
        header: ({ route, options }) => {
          const title = options.title ?? route.name;
          const isDetail = route.name === 'detail';
          let right: React.ReactNode = null;
          right = (
            <View className="rounded-full bg-neutral-100 p-3">
              <View
                className="absolute top-4 z-20 rounded-full border border-white bg-secondary-500"
                style={{ width: 8, height: 8, left: 23 }}
              />
              <Ionicons name="notifications-outline" size={24} color="black" />
            </View>
          );

          return (
            <CustomHeader title={title} right={right} canGoBack={true} transparent={isDetail} />
          );
        },
        headerShadowVisible: false,
        animation: 'fade',
        contentStyle: {
          flex: 1,
          backgroundColor: '#fff',
        },
      }}>
      <Stack.Screen
        name="detail"
        options={{
          headerTransparent: true,
          headerBlurEffect: undefined,
        }}
      />
      <Stack.Screen name="schedule" />
    </Stack>
  );
}
