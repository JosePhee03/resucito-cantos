import { Ref, useCallback } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { colors, CONSTANT, fonts, radius, typography } from "@/themes";
import Icon from "./Icon";

type SearchBarProps = {
  onChange?: (query: string) => void;
  query?: string;
  onSubmit?: () => void;
  onPress?: () => void;
  searchRef?: Ref<TextInput>;
  editable?: boolean;
  onClear?: () => void;
  loading?: boolean;
};

export default function SearchBar({
  onChange,
  query = "",
  onSubmit,
  onPress,
  searchRef,
  editable,
  onClear,
  loading,
}: SearchBarProps) {
  const handleOnPress = useCallback(() => !loading && onPress?.(), [loading]);

  return (
    <View style={styles.searchBar}>
      <View style={styles.button}>
        <Icon name="search" color={colors.foregroundSecondary} />
      </View>
      <View style={styles.searchTextContainer}>
        <TextInput
          disableFullscreenUI={true}
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

function ButtonClear({ onClear }: { onClear?: () => void }) {
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
  loading: {
    height: CONSTANT.SEARCHBAR,
    width: CONSTANT.SEARCHBAR,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: CONSTANT.SEARCHBAR,
    width: CONSTANT.SEARCHBAR,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.lg,
  },
  searchBar: {
    flex: 1,
    height: CONSTANT.SEARCHBAR,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
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
