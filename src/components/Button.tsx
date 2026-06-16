import { colors, CONSTANT, fonts, radius, spacing, typography } from "@/themes";
import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import Icon, { IconName } from "./Icon";

type ButtonProps = PressableProps & {
  children: React.ReactNode;
  onPress: () => void;
  height?: "auto";
};

type LabelProps = {
  text: string;
  size?: keyof typeof typography;
  center?: boolean;
  px?: keyof typeof spacing;
};

type ButtonTextProps = LabelProps & {
  onPress: () => void;
};

type ButtonIconProps = {
  onPress: () => void;
  icon: IconName;
  size?: "sm" | "md";
  color?: keyof typeof colors;
  px?: keyof typeof spacing;
};

export function Button({
  children,
  onPress,
  height,
  style,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        { height: height ?? CONSTANT.BUTTON },
        { ...style },
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
}

export function ButtonText({ onPress, ...props }: ButtonTextProps) {
  return (
    <Button onPress={onPress}>
      <Label {...props} />
    </Button>
  );
}

export function ButtonBack({ onPress, ...props }: ButtonTextProps) {
  return (
    <Button onPress={onPress}>
      <Icon size={24} name="chevron-left" color={colors.primary} />
      <Label {...props} />
    </Button>
  );
}

export function ButtonIcon({
  onPress,
  icon,
  size = "md",
  color = "primary",
  px = "sm",
}: ButtonIconProps) {
  const sizes = {
    md: 24,
    sm: 16,
  };
  return (
    <Button
      style={{
        paddingHorizontal: px && spacing[px],
      }}
      hitSlop={32}
      height="auto"
      onPress={onPress}
    >
      <Icon name={icon} size={sizes[size]} color={colors[color]} />
    </Button>
  );
}

function Label({ text, center, px, size = "sm" }: LabelProps) {
  return (
    <Text
      style={[
        styles.text,
        {
          fontSize: typography[size],
          textAlign: center ? "center" : undefined,
          paddingHorizontal: px && spacing[px],
        },
      ]}
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.md,
  },
  pressed: {
    opacity: 0.2,
  },
  text: {
    fontFamily: fonts.medium,
    color: colors.primary,
  },
});
