import { useEffect, useRef, useState } from "react";
import { BackHandler, StyleSheet, Text, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { TextInput } from "react-native-gesture-handler";

import { colors, CONSTANT, fonts, spacing, typography } from "@/themes";
import { ButtonText } from "./Button";
import SearchBar from "./SearchBar";

export default function SearchBottomSheet({
  onDismiss,
  onSubmit,
  q = "",
}: {
  onDismiss: () => void;
  onSubmit: (query: string) => void;
  q?: string;
}) {
  const [query, setQuery] = useState(q);
  const searchRef = useRef<TextInput>(null);

  const handleOnChangeQuery = (query: string) => {
    setQuery(query);
  };

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        focusSearch();
      });
    });
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        handleOnCancel();
        return true;
      },
    );

    return () => {
      cancelAnimationFrame(id);
      subscription.remove();
    };
  }, []);

  const focusSearch = () => {
    searchRef.current?.focus();
  };

  const blurSearch = () => {
    searchRef.current?.blur();
  };

  const handleOnSubmit = () => {
    blurSearch();
    onSubmit(query);
  };

  const handleOnClear = () => {
    setQuery("");
  };

  const handleOnCancel = () => {
    blurSearch();
    onDismiss();
  };

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 540,
    alignSelf: "center",
  },
  searchContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
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
