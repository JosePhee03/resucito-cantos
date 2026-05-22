import { StyleSheet, Text, View } from "react-native";

import { colors, fonts, spacing, typography } from "@/themes";
import { NavigationButtons, SectionIndex } from "./components";

export default function HomeScreen() {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resucitó</Text>
      </View>
      <NavigationButtons />
      <SectionIndex />
    </View>
  );
}

const styles = StyleSheet.create({
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
