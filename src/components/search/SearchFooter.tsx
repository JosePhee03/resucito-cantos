import { useEffect } from "react";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { colors, fonts, spacing, typography } from "@/themes";

type SearchFooterProps = {
  loading: boolean;
  total: number;
};

export default function SearchFooter({ loading, total }: SearchFooterProps) {
  const insets = useSafeAreaInsets();
  const keyboardHeight = useSharedValue(0);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", (e) => {
      keyboardHeight.value = e.endCoordinates.height;
    });

    const hide = Keyboard.addListener("keyboardDidHide", () => {
      keyboardHeight.value = 0;
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboardHeight.value }],
      bottom: insets.bottom,
    };
  });

  return (
    <Animated.View style={[styles.footer, animatedStyle]}>
      <TotalView loading={loading} total={total} />
      <Text style={[styles.footerText, styles.text]}>Cantos</Text>
    </Animated.View>
  );
}

function TotalView({ loading, total }: SearchFooterProps) {
  return (
    <View style={styles.total}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.text}>{total.toString().padStart(3, " ")}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.background,
    position: "absolute",
    left: 0,
    right: 0,
    height: 36,
    flexDirection: "row",
    gap: spacing.xs,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4,
  },

  total: {
    flex: 1,
    width: 32,
    alignItems: "flex-end",
  },
  footerText: {
    flex: 1,
  },

  text: {
    fontFamily: fonts.medium,
    fontSize: typography.sm,
    color: colors.foregroundSecondary,
  },
});
