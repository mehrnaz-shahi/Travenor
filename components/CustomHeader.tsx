import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface CustomHeaderProps {
  title?: string;
  right?: React.ReactNode;
  left?: React.ReactNode;
  canGoBack?: boolean;
}

export default function CustomHeader({ title, right, left, canGoBack = true }: CustomHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View
      className="h-16 flex-row items-center justify-between bg-white px-4"
      style={{ marginTop: insets.top }}>
      {/* Left Back */}
      {canGoBack ? (
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </Pressable>
      ) : left ? (
        left
      ) : (
        <View className="w-6" />
      )}

      {/* Center Title */}
      <Text className="text-lg font-bold">{title}</Text>

      {/* Right Dynamic */}
      {right ? right : <View className="w-6" />}
    </View>
  );
}
