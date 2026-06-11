import { Pressable, StyleSheet, Text } from "react-native";
import Icon from "./Icon";
import { colors, CONSTANT, fonts, radius, spacing, typography } from "@/themes";

export default function ButtonSearch({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.buttonSearch,
        pressed && styles.buttonPressed,
      ]}
    >
      <Icon name="search" size={24} color={colors.foregroundSecondary} />
      <Text style={styles.buttonSearchText}>Buscar cantos</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonSearch: {
    height: CONSTANT.BUTTON,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceSecondary,
  },
  buttonSearchText: {
    fontFamily: fonts.regular,
    fontSize: typography.md,
    color: colors.foregroundSecondary,
  },
  buttonPressed: {
    backgroundColor: colors.pressed,
  },
});
