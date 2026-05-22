import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeScreen from "@/ui/screen/home/HomeScreen";
import FONT_SOURCE from "@/themes/fonts";
import { colors } from "@/themes";

export default function App() {
  const [loaded] = useFonts(FONT_SOURCE);

  if (!loaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
