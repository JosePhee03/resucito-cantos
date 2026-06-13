import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { router } from "expo-router";

import { colors, CONSTANT, fonts, spacing, typography } from "@/themes";
import { ButtonText, TopBar } from "@/components";
import { SearchBar } from "@/components/search";

export default function SearchModalScreen() {
  const [query, setQuery] = useState("");

  const handleOnChangeQuery = (query: string) => {
    setQuery(query);
  };

  const handleOnSubmit = () => {
    router.replace(`/search?query=${query}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
        <TopBar
          left={<ButtonText text="Cancelar" px="sm" onPress={handleOnSubmit} />}
          right={<ButtonText text="Buscar" px="sm" onPress={handleOnSubmit} />}
        />
        <View style={styles.searchContainer}>
          <SearchBar
            query={query}
            onSubmit={handleOnSubmit}
            onChange={handleOnChangeQuery}
          />
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
