import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import '../global.css';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import CustomHeader from 'components/CustomHeader';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../assets/avatar.svg';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Inner component that uses useSafeAreaInsets
function RootLayoutNav() {
  const insets = useSafeAreaInsets();
  
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        initialRouteName="index"
        screenOptions={{
          header: ({ route, options }) => {
            const title = options.title ?? route.name;
            const isIndexPage = route.name === 'index' || route.name === 'location/index';
            let right: React.ReactNode = null;
            let left: React.ReactNode = null;
            
            if (isIndexPage) {
              left = (
                <View
                  className="flex-row items-center gap-2 bg-neutral-100 py-2 ps-2 pe-4"
                  style={{ borderRadius: 30 }}>
                  <Avatar />
                  <Text className="font-sfMedium text-neutral-800">Leonardo</Text>
                </View>
              );
              right = (
                <View className="rounded-full bg-neutral-100 p-3">
                  <View
                    className="absolute top-4 z-20 rounded-full border border-white bg-secondary-500"
                    style={{ width: 8, height: 8, left: 23 }}
                  />
                  <Ionicons name="notifications-outline" size={24} color="black" />
                </View>
              );
            }

            return (
              <CustomHeader
                title={isIndexPage ? '' : title}
                right={right}
                left={left}
                canGoBack={!isIndexPage}
              />
            );
          },
          headerShadowVisible: false,
          animation: 'fade',
          contentStyle: {
            flex: 1,
            backgroundColor: '#fff',
            paddingBottom: insets.bottom,
          },
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="messages" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="location" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    interFontBold: require('../assets/fonts/Inter_18pt-Bold.ttf'),
    interFontExtraBold: require('../assets/fonts/Inter_18pt-ExtraBold.ttf'),
    interFontLight: require('../assets/fonts/Inter_18pt-Light.ttf'),
    interFontMedium: require('../assets/fonts/Inter_18pt-Medium.ttf'),
    interFontRegular: require('../assets/fonts/Inter_18pt-Regular.ttf'),
    alkia: require('../assets/fonts/Alkia.ttf'),
    geometr: require('../assets/fonts/Geometr.ttf'),
  });

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Wait for fonts to load
        if (fontsLoaded || fontError) {
          // Add a small delay to ensure everything is mounted
          await new Promise(resolve => setTimeout(resolve, 500));
          setAppIsReady(true);
        }
      } catch (e) {
        console.warn('Error preparing app:', e);
      }
    }

    prepare();
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (appIsReady) {
      // Hide splash screen when app is ready
      SplashScreen.hideAsync().catch(error => {
        console.log('SplashScreen hide error (non-critical):', error.message);
      });
    }
  }, [appIsReady]);

  // Show custom splash screen while loading
  if (!appIsReady) {
    return (
      <View className="flex-1 items-center bg-primary-600">
        <View className="h-2/3 justify-end pb-14">
          <Image source={require('../assets/traveno.png')} className="h-56 w-56" />
        </View>
        <View className="h-1/3 justify-end pb-[50px]">
          <Text className="font-alkia text-4xl font-bold text-white">Travenor</Text>
        </View>
      </View>
    );
  }

  // Wrap everything in SafeAreaProvider
  return (
    <SafeAreaProvider>
      <RootLayoutNav />
    </SafeAreaProvider>
  );
}