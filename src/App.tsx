import { useCallback } from "react";
import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import SearchScreen from "./screens/SearchScreen";
import DetailsScreen from "./screens/DetailsScreen";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const ScreenTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.screenTemplate}>
      <LinearGradient
        colors={["rgba(96, 31, 235, 0.10)", "rgba(241, 241, 241, 0.00)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{ height: "100%" }}
      >
        <SafeAreaView>{children}</SafeAreaView>
      </LinearGradient>
    </View>
  );
};
const TemplatedSearchScreen = ({ route, navigation }) => {
  return (
    <ScreenTemplate>
      <SearchScreen route={route} navigation={navigation} />
    </ScreenTemplate>
  );
};
const TemplatedDetailsScreen = ({ route, navigation }) => {
  return (
    <ScreenTemplate>
      <DetailsScreen route={route} navigation={navigation} />
    </ScreenTemplate>
  );
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "SF-Pro": require("./../assets/fonts/SF-Pro.ttf"),
    "SF-Pro Bold": require("./../assets/fonts/SF-Pro-Display-Bold.otf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Search" component={TemplatedSearchScreen} />
        <Stack.Screen name="Details" component={TemplatedDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenTemplate: {
    height: "100%",
  },
});

registerRootComponent(App);
