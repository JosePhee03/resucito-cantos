import { colors, fonts, radius, spacing, typography } from "@/themes";
import React, { useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Icon from "./Icon";

type SearchViewProps = {
  onPress?: () => void;
  editable?: boolean;
  onSubmit?: (query: string) => void;
};

export default function SearchBar({
  onPress,
  editable,
  onSubmit,
}: SearchViewProps) {
  const [query, setQuery] = useState("");
  const searchInputRef = useRef<TextInput>(null);

  const handleOnSubmit = () => {
    if (onSubmit) onSubmit(query);
  };

  const handleOnSearch = () => {
    const ref = searchInputRef.current;
    if (ref?.isFocused) {
      ref.blur();
    }
    ref?.focus();
  };

  const handleOnClear = () => {
    setQuery("");
  };

  const handleOnChange = (text: string) => {
    setQuery(text);
  };

  return (
    <View style={styles.searchInput}>
      <Pressable
        onPress={handleOnSearch}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Icon name="search" size={24} color={colors.foregroundSecondary} />
      </Pressable>
      <TextInput
        ref={searchInputRef}
        onSubmitEditing={handleOnSubmit}
        onChangeText={handleOnChange}
        editable={editable}
        value={query}
        placeholder="Buscar"
        placeholderTextColor={colors.foregroundSecondary}
        style={styles.searchText}
        returnKeyType="search"
        accessible
        accessibilityLabel="Campo de búsqueda"
        accessibilityHint="Escribí para buscar cantos"
        accessibilityRole="search"
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="never"
      />
      {query !== "" && <ButtonClear onClear={handleOnClear} />}
    </View>
  );
}

function ButtonClear({ onClear }: { onClear: () => void }) {
  return (
    <Pressable
      onPress={onClear}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <Icon name="close" size={24} color={colors.foregroundSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: spacing.sm,
    height: "100%",
    justifyContent: "center",
    borderRadius: radius.lg,
  },
  searchInput: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceSecondary,
    overflow: "hidden",
  },
  buttonPressed: {
    backgroundColor: colors.pressed,
  },
  searchText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: typography.md,
    color: colors.text,
  },
});
