import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const BackButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.back()}
      style={{ marginLeft: 10, padding: 14, backgroundColor: '#F7F7F9', borderRadius: 999 }}
    >
      <Ionicons name="chevron-back" size={24} color="#000" />
    </TouchableOpacity>
  );
};

export default function LoginLayout() {
  const commonHeaderOptions = {
    headerShown: true,
    headerShadowVisible: false,
    title: '',
    headerLeft: () => <BackButton />,
  };

  return (
    <Stack initialRouteName='tips'>
      <Stack.Screen
        name="tips"
        options={{
          headerShown: false,
          statusBarHidden: true,
          statusBarStyle: 'light',
        }}
      />
      <Stack.Screen name="signin" options={commonHeaderOptions} />
      <Stack.Screen name="signUp" options={commonHeaderOptions} />
      <Stack.Screen name="forgetPassword" options={commonHeaderOptions} />
      <Stack.Screen name="OTPVerification" options={commonHeaderOptions} />
    </Stack>
  );
}
