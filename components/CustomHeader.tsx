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
  transparent?: boolean;
}

export default function CustomHeader({ title, right, left, canGoBack = true, transparent }: CustomHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View
      className="h-16 flex-row items-center justify-between px-4"
      style={{ marginTop: insets.top, backgroundColor: transparent ? 'transparent' : '#fff' }}>
      {/* Left Back */}
      {canGoBack ? (
        <Pressable
          onPress={() => router.back()}
          style={{
            marginLeft: 10,
            padding: 10,
            backgroundColor: transparent ? 'rgba(0,0,0,0.4)' : '#1B1E28',
            borderRadius: 999,
          }}>
          <Ionicons name="chevron-back" size={20} color="white" />
        </Pressable>
      ) : left ? (
        left
      ) : (
        <View className="w-6" />
      )}

      {/* Center Title */}
      <Text className={`text-lg font-bold ${transparent ? 'text-white' : ''}`}>{title}</Text>

      {/* Right Dynamic */}
      {right ? right : <View className="w-6" />}
    </View>
  );
}
