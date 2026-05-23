import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

import { colors, fonts, radius, spacing, typography } from "@/themes";
import { AlbumIcon, PlusIcon, SearchIcon, SettingsIcon } from "./Icon";

type IconName = "search" | "album" | "plus" | "settings";

type Props = PressableProps & {
  icon: IconName;
  text?: string;
};

export function ButtonIcon({ icon, text, ...props }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      {...props}
    >
      <Icon icon={icon} />
      {text && <Text style={styles.buttonText}>{text}</Text>}
    </Pressable>
  );
}

function Icon({ icon }: { icon: IconName }) {
  switch (icon) {
    case "search":
      return <SearchIcon color={colors.foreground} />;
    case "album":
      return <AlbumIcon color={colors.foreground} />;
    case "plus":
      return <PlusIcon color={colors.foreground} />;
    case "settings":
      return <SettingsIcon color={colors.foreground} />;
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 64,
    height: 64,
    borderRadius: radius.md,
    gap: spacing.xxs,
    backgroundColor: colors.surface,
  },
  buttonText: {
    fontSize: typography.xs,
    fontFamily: fonts.inter.medium,
    color: colors.textSecondary,
  },
  buttonPressed: {
    backgroundColor: colors.pressed,
  },
});
