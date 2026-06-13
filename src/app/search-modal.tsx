import { SearchBar } from "@/components/search";
import { colors, CONSTANT, fonts, spacing, typography } from "@/themes";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { ButtonText, TopBar } from "@/components";

export default function SearchModalScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
        <TopBar
          right={
            <ButtonText text="Buscar" px="sm" size="sm" onPress={() => {}} />
          }
        />
        <View style={styles.searchContainer}>
          <SearchBar onSubmit={() => {}} onChange={() => {}} query="" />
        </View>
        <View style={styles.content}>
          <View style={styles.sectionHeader}>
            <Text style={styles.title}>Búsquedas recientes</Text>
            <ButtonText text="Limpiar" size="sm" onPress={() => {}} />
          </View>
          <View style={styles.emptySuggestion}>
            <Text style={styles.emptySuggestionText}>
              Sin búsquedas recientes
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  button: {
    paddingHorizontal: spacing.sm,
    height: CONSTANT.BUTTON,
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.2,
  },
  buttonText: {
    fontFamily: fonts.medium,
    fontSize: typography.sm,
    color: colors.primary,
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
  clearText: {
    fontFamily: fonts.regular,
    fontSize: typography.sm,
    color: colors.primary,
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
