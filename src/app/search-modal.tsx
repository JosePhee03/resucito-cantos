import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, CONSTANT, fonts, radius, spacing, typography } from "@/themes";
import { ButtonText, SearchBar } from "@/components";

type Params = {
  stage?: string;
  q?: string;
};

export default function searchModalScreen() {
  const { q, stage } = useLocalSearchParams<Params>();
  const [query, setQuery] = useState(q);
  const searchRef = useRef<TextInput>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        focusSearch();
      });
    });

    return () => {
      cancelAnimationFrame(id);
    };
  }, []);

  const handleOnSubmit = () => {
    router.replace({
      pathname: "/search",
      params: { q: query, stage },
    });
  };

  const handleOnChangeQuery = (query: string) => {
    setQuery(query);
  };

  const focusSearch = () => {
    searchRef.current?.focus();
  };

  const handleOnClear = () => {
    setQuery("");
  };

  const handleOnCancel = () => {
    router.canGoBack() ? router.back() : router.navigate("/");
  };

  return (
    <SafeAreaView edges={["bottom", "right", "left"]} style={styles.container}>
      <Handle />
      <View style={styles.modalContent}>
        <View style={styles.searchContainer}>
          <SearchBar
            searchRef={searchRef}
            query={query}
            onSubmit={handleOnSubmit}
            onChange={handleOnChangeQuery}
            onClear={handleOnClear}
          />
          <ButtonText text="Cancelar" size="sm" onPress={handleOnCancel} />
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
      </View>
    </SafeAreaView>
  );
}

const Handle = () => {
  return (
    <View style={styles.handle}>
      <View style={styles.handleIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    alignItems: "center",
  },
  modalContent: {
    flex: 1,
    width: "100%",
    maxWidth: 540,
  },
  searchContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  handle: {
    padding: spacing.xs,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  handleIndicator: {
    height: spacing.xs,
    width: CONSTANT.BUTTON,
    backgroundColor: colors.foregroundSecondary,
    borderRadius: radius.sm,
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
    paddingTop: 64,
    justifyContent: "center",
  },
  emptySuggestionText: {
    fontFamily: fonts.medium,
    fontSize: typography.sm,
    color: colors.textTertiary,
    textAlign: "center",
  },
});
