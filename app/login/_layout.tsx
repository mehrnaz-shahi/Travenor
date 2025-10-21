import { Stack } from 'expo-router';

export default function LoginLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: '',
      }}
    >
      <Stack.Screen 
        name="tips" 
        options={{
          headerShown: false,
          title: '',
          statusBarHidden: true,
          statusBarStyle: 'light',
        }}
      />
    </Stack>
  );
}
