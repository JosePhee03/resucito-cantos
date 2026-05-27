import { colors, fonts, radius, spacing, typography } from "@/themes";
import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Icon from "./Icon";

type SearchViewProps = {
  onPress?: (event: GestureResponderEvent) => void;
  editable?: boolean;
};

export default function SearchBar({ onPress, editable }: SearchViewProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.searchInput,
        pressed && styles.searchInputPressed,
      ]}
    >
      <Icon name="search" size={24} color={colors.foregroundSecondary} />
      <TextInput
        editable={editable}
        placeholder="Buscar..."
        placeholderTextColor={colors.foregroundSecondary}
        style={styles.searchText}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    gap: spacing.sm,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.sm,
  },
  searchInputPressed: {
    backgroundColor: colors.pressed,
  },
  searchText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: typography.md,
    color: colors.text,
  },
});
