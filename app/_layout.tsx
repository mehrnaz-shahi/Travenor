import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import '../global.css';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

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
    gillBold: require('../assets/fonts/Gill Sans Bold.otf'),
    gillRegular: require('../assets/fonts/Gill Sans.otf'),
    sfUiRegular: require('../assets/fonts/sf-ui-display-black.otf'),
    sfUiBold: require('../assets/fonts/sf-ui-display-bold-.otf'),
    sfUiSemibold: require('../assets/fonts/sf-ui-display-semibold.otf'),
    sfUiLight: require('../assets/fonts/sf-ui-display-light.otf'),
    sfUiMedium: require('../assets/fonts/sf-ui-display-medium.otf'),
  });

  useEffect(() => {
    const prepare = async () => {
      if (fontsLoaded) {
        // // ⏳ Delay for 1 minute (60000 ms) for testing
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={styles.splash}>
        <Image source={require('../assets/traveno.png')} style={styles.image} />
        <Text style={styles.text}>Loading…</Text>
      </View>
    );
  }
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" options={{}} />
      <Stack.Screen name="login" options={{
        headerShown: false,
        statusBarHidden: true,
        statusBarStyle: 'light',
      }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});
