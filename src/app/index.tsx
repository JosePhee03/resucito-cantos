import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, fonts, spacing, typography } from "@/themes";
import { NavigationButtons, SectionIndex } from "@/components/home";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resucitó</Text>
      </View>
      <NavigationButtons />
      <SectionIndex />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 72,
    paddingHorizontal: spacing.md,
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: fonts.franklin.bold,
    fontSize: typography.xl,
    color: colors.primary,
  },
});
