import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, CONSTANT, fonts, spacing, typography } from "@/themes";
import Icon from "../Icon";

export default function SearchEmptyList() {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={[styles.emptyList, { paddingBottom: CONSTANT.HEADER * 3 + top }]}
    >
      <View style={styles.content}>
        <Icon name="music" size={64} color={colors.foregroundSecondary} />
        <Text style={styles.contentText}>Canto/s no encontrado/s</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    gap: spacing.sm,
  },
  contentText: {
    fontFamily: fonts.medium,
    color: colors.foregroundSecondary,
    fontSize: typography.md,
  },
});
