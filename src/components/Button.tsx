import { colors, CONSTANT, fonts, spacing, typography } from "@/themes";
import { Pressable, StyleSheet, Text } from "react-native";
import Icon from "./Icon";

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
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

export function Button({ children, onPress }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
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
    height: CONSTANT.BUTTON,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.2,
  },
  text: {
    fontFamily: fonts.medium,
    color: colors.primary,
  },
});
