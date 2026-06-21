import { SearchBar } from "@/components";
import { colors, fonts, spacing, typography } from "@/themes";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContaier}>
        <SearchBar />
      </View>
      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.title}>Búsquedas recientes</Text>
        </View>
        <View style={styles.emptySuggestion}>
          <Text style={styles.emptySuggestionText}>
            Sin búsquedas recientes
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContaier: {
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: typography.sm,
    color: colors.textSecondary,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  emptySuggestion: {
    flex: 1,
    justifyContent: "center",
  },
  emptySuggestionText: {
    fontFamily: fonts.medium,
    fontSize: typography.sm,
    color: colors.textTertiary,
    textAlign: "center",
  },
});
