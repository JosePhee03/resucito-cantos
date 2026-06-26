import { Ref } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { colors, CONSTANT, fonts, radius, spacing, typography } from "@/themes";
import Icon from "./Icon";

type SearchBarProps = {
  onChange?: (query: string) => void;
  query?: string;
  onSubmit?: () => void;
  searchRef?: Ref<TextInput>;
  editable?: boolean;
  onClear?: () => void;
  loading?: boolean;
  onFocus?: () => void;
};

type SearchBarButtonProps = {
  query?: string;
  onPress?: () => void;
  searchRef?: Ref<TextInput>;
  onClear?: () => void;
  loading?: boolean;
};

export default function SearchBar({
  onChange,
  query = "",
  onSubmit,
  searchRef,
  editable,
  onClear,
  onFocus,
  loading,
}: SearchBarProps) {
  return (
    <View style={styles.searchBar}>
      <View style={styles.button}>
        <Icon name="search" size={20} color={colors.foregroundSecondary} />
      </View>
      <View style={styles.searchTextContainer}>
        <TextInput
          cursorColor={colors.primary}
          selectionColor={colors.primary}
          disableFullscreenUI={true}
          onFocus={onFocus}
          editable={editable}
          ref={searchRef}
          onChangeText={onChange}
          onSubmitEditing={onSubmit}
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
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      ) : (
        query !== "" && <ButtonClear onClear={onClear} />
      )}
    </View>
  );
}

export function SearchBarButton({ onPress }: SearchBarButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.searchBar,
        pressed && { backgroundColor: colors.pressed },
      ]}
    >
      <View style={styles.button}>
        <Icon name="search" size={20} color={colors.foregroundSecondary} />
      </View>
      <View style={styles.searchTextContainer}>
        <Text style={styles.searchButtonText}>Buscar cantos</Text>
      </View>
    </Pressable>
  );
}

function ButtonClear({ onClear }: { onClear?: () => void }) {
  return (
    <Pressable
      onPress={onClear}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <Icon name="close" size={20} color={colors.foregroundSecondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  loading: {
    height: CONSTANT.SEARCHBAR,
    width: CONSTANT.SEARCHBAR,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: CONSTANT.BUTTON,
    width: CONSTANT.BUTTON,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.lg,
  },
  searchIcon: {
    height: CONSTANT.BUTTON,
    justifyContent: "center",
    paddingHorizontal: spacing.xs,
  },
  searchBar: {
    flex: 1,
    height: CONSTANT.SEARCHBAR,
    flexDirection: "row",
    alignItems: "center",
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
  searchButtonText: {
    fontFamily: fonts.regular,
    fontSize: typography.md,
    color: colors.foregroundSecondary,
  },
});
