import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

import FONT_SOURCE from "@/themes/fonts";
import { useSongStore } from "@/store/SongStore";

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
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
