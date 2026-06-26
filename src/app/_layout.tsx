import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";

import { useSongStore } from "@/store/song.store";
import FONT_SOURCE from "@/themes/fonts";
import { colors } from "@/themes";

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              statusBarStyle: "dark",
            }}
          >
            <Stack.Screen name="(home)" />
            <Stack.Screen
              name="search"
              options={{ contentStyle: { backgroundColor: colors.background } }}
            />
            <Stack.Screen
              name="song/[id]"
              options={{ contentStyle: { backgroundColor: colors.background } }}
            />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
