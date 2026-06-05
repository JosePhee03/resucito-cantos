import { StyleSheet, Text, View } from "react-native";

import { colors, fonts, spacing, typography } from "@/themes";
import Icon from "../Icon";

export default function SearchEmplyList() {
  return (
    <View style={styles.emplyList}>
      <View style={styles.content}>
        <Icon name="music" size={64} color={colors.foregroundSecondary} />
        <Text style={styles.contentText}>Canto/s no encontrado/s</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  emplyList: {
    flex: 1,
    alignItems: "center",
    paddingTop: 64,
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
