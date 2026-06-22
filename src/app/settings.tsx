import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, fonts, spacing, typography } from "@/themes";
import { Icon } from "@/components";

export default function SettingScreem() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Icon name="guitar" size={64} color={colors.foregroundSecondary} />
        <Text style={styles.contentText}>Próximamente</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
