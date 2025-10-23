import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import '../global.css';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import CustomHeader from 'components/CustomHeader';
import { Ionicons } from '@expo/vector-icons';
import Avatar from '../assets/avatar.svg';
SplashScreen.preventAutoHideAsync();
export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    interFontBold: require('../assets/fonts/Inter_18pt-Bold.ttf'),
    interFontExtraBold: require('../assets/fonts/Inter_18pt-ExtraBold.ttf'),
    interFontLight: require('../assets/fonts/Inter_18pt-Light.ttf'),
    interFontMedium: require('../assets/fonts/Inter_18pt-Medium.ttf'),
    interFontRegular: require('../assets/fonts/Inter_18pt-Regular.ttf'),
    alkia: require('../assets/fonts/Alkia.ttf'),
    geometr: require('../assets/fonts/Geometr.ttf'),
    // gillBold: require('../assets/fonts/Gill Sans Bold.otf'),
    // gillRegular: require('../assets/fonts/Gill Sans.otf'),
    // sfUiRegular: require('../assets/fonts/sf-ui-display-black.otf'),
    // sfUiBold: require('../assets/fonts/sf-ui-display-bold-.otf'),
    // sfUiSemibold: require('../assets/fonts/sf-ui-display-semibold.otf'),
    // sfUiLight: require('../assets/fonts/sf-ui-display-light.otf'),
    // sfUiMedium: require('../assets/fonts/sf-ui-display-medium.otf'),
  });

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const prepare = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center bg-primary-600" style={{ paddingTop: insets.top }}>
        <View className="h-2/3 justify-end pb-14">
          <Image source={require('../assets/traveno.png')} className="h-56 w-56" />
        </View>
        <View className="h-1/3 justify-end" style={{ paddingBottom: insets.bottom + 50 }}>
          <Text className="h1/2 font-alkia text-4xl font-bold text-white">Travenor</Text>
        </View>
      </View>
    );
  }
  return (
    <Stack
      screenOptions={{
        header: ({ route, options }) => {
          const title = options.title ?? route.name;
          const isIndexPage = route.name === 'index';
          let right: React.ReactNode = null;
          let left: React.ReactNode = null;
          if (isIndexPage) {
            left = (
              <View
                className="flex-row items-center gap-2 bg-neutral-100 p-2"
                style={{ borderRadius: 30 }}>
                <Avatar />
                <Text className="font-sfMedium text-neutral-800">Leonardo</Text>
              </View>
            );
            right = (
              <View className="rounded-full bg-neutral-100 p-3">
                <View
                  className="absolute top-4 z-20 rounded-full bg-secondary-500 border border-white"
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
      }}
      initialRouteName='login'
      >
      <Stack.Screen name="index" />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}
