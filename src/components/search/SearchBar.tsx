import { useRef } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors, CONSTANT, fonts, radius, spacing, typography } from "@/themes";
import Icon from "../Icon";

type SearchBarProps = {
  onChange: (query: string) => void;
  query: string;
  loading: boolean;
  onCancel: () => void;
};

export default function SearchBar({
  onChange,
  query,
  loading,
  onCancel,
}: SearchBarProps) {
  const searchInputRef = useRef<TextInput>(null);

  const handleOnClear = () => {
    searchInputRef.current?.clear();
    onChange("");
  };

  const handleOnChange = (text: string) => {
    onChange(text);
  };

  return (
    <View style={styles.searchBar}>
      <View style={styles.searchInput}>
        <View
          style={{
            paddingHorizontal: spacing.sm,
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Icon name="search" color={colors.foregroundSecondary} />
        </View>
        <View style={styles.searchTextContainer}>
          <TextInput
            autoFocus
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
        <View
          style={{
            width: 24,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading && <ActivityIndicator />}
        </View>
        {query !== "" && <ButtonClear onClear={handleOnClear} />}
      </View>
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
    width: 32,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.lg,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: CONSTANT.SEARCHBAR,
    flexDirection: "row",
    borderRadius: radius.lg,
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
  buttonCancel: {
    padding: spacing.sm,
  },
  buttonCancelPressed: {
    opacity: 0.2,
  },
  buttonCancelText: {
    fontFamily: fonts.medium,
    fontSize: typography.sm,
    color: colors.primary,
  },
  searchText: {
    width: "100%",
    position: "absolute",
    fontFamily: fonts.regular,
    fontSize: typography.md,
    color: colors.text,
  },
});
