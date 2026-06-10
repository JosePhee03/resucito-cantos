import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { colors, CONSTANT, fonts, spacing, typography } from "@/themes";
import Icon from "../Icon";

type SearchTopBarProps = {
  children: React.JSX.Element;
};

export default function SearchTopBar({ children }: SearchTopBarProps) {
  return (
    <View style={styles.topBar}>
      <Pressable
        onPress={router.back}
        style={({ pressed }) => [
          styles.buttonBack,
          pressed && styles.buttonBackPressed,
        ]}
      >
        <Icon size={24} name="chevron-left" color={colors.primary} />
        <Text style={styles.textIcon}>Atrás</Text>
      </Pressable>
      <View style={styles.colRight}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: CONSTANT.HEADER,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    gap: spacing.sm,
  },
  textIcon: {
    fontFamily: fonts.medium,
    fontSize: typography.sm,
    color: colors.primary,
  },
  colRight: {
    flex: 1,
  },
  buttonBack: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonBackPressed: {
    opacity: 0.2,
  },
});
