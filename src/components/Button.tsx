import { colors, CONSTANT, fonts, spacing, typography } from "@/themes";
import { Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
  text: string;
  size: "sm" | "md";
  center?: boolean;
  onPress: () => void;
  px?: "sm" | "md";
};

export function ButtonText({
  text,
  size = "md",
  center,
  onPress,
  px,
}: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { paddingHorizontal: px && spacing[px] },
        pressed && styles.buttonTextPressed,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          {
            fontSize: typography[size],
            textAlign: center ? "center" : undefined,
          },
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: CONSTANT.BUTTON,
    justifyContent: "center",
  },
  buttonTextPressed: {
    opacity: 0.2,
  },
  buttonText: {
    fontFamily: fonts.medium,
    color: colors.primary,
  },
});
