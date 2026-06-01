import { useEffect, useRef } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { colors, fonts, radius, spacing, typography } from "@/themes";
import Icon from "../Icon";

type SearchBarProps = {
  onChange: (query: string) => void;
  query: string;
  onClear: () => void;
  focus: boolean;
};

export default function SearchBar({
  onChange,
  query,
  onClear,
  focus,
}: SearchBarProps) {
  const searchInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (focus) {
      searchInputRef.current?.focus();
    }
  }, [focus]);

  const handleOnSearch = () => {
    const ref = searchInputRef.current;
    if (ref?.isFocused) {
      ref.blur();
    }
    ref?.focus();
  };

  const handleOnClear = () => {
    onClear();
  };

  const handleOnChange = (text: string) => {
    onChange(text);
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
      <View style={styles.searchTextContainer}>
        <TextInput
          ref={searchInputRef}
          onChangeText={handleOnChange}
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
      </View>
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
    height: 36,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceSecondary,
    overflow: "hidden",
  },
  buttonPressed: {
    backgroundColor: colors.pressed,
  },
  searchTextContainer: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
  },
  searchText: {
    width: "100%",
    position: "absolute",
    fontFamily: fonts.regular,
    fontSize: typography.md,
    color: colors.text,
  },
});
