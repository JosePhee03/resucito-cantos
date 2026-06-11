import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import { useSongStore } from "@/store/song.store";
import FONT_SOURCE from "@/themes/fonts";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts(FONT_SOURCE);
  const initialize = useSongStore.getState().initialize;
  const initialized = useSongStore((state) => state.initialized);

  useEffect(() => {
    if (!initialized) {
      initialize();
    }

    if (loaded && initialized) {
      SplashScreen.hide();
    }
  }, [loaded, initialized]);

  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarStyle: "dark",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="search-modal"
          options={{ presentation: "modal", animation: "fade_from_bottom" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
