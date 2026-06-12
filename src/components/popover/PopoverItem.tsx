import { colors, fonts, spacing, typography } from "@/themes";
import { Pressable, StyleSheet, Text } from "react-native";

export default function PopoverItem({
  label,
  onPress,
}: {
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  itemPressed: {
    backgroundColor: colors.pressed,
  },
  text: {
    fontFamily: fonts.regular,
    fontSize: typography.sm,
    color: colors.text,
  },
});
