import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { colors, CONSTANT, fonts, spacing, typography } from "@/themes";
import Icon from "./Icon";
import React from "react";

type TopBarProps = {
  title?: string;
  right?: React.JSX.Element | React.JSX.Element[];
  headerHidden?: SharedValue<boolean>;
};

export default function TopBar({
  title = "",
  right,
  headerHidden,
}: TopBarProps) {
  return (
    <View style={styles.topBar}>
      <ColLeft />
      <ColCenter title={title} headerHidden={headerHidden} />
      <ColRight>{right}</ColRight>
    </View>
  );
}

function ColLeft() {
  return (
    <View style={styles.columnLeft}>
      <Pressable
        onPress={() =>
          router.canGoBack() ? router.back() : router.navigate("/")
        }
        style={({ pressed }) => [
          styles.buttonBack,
          pressed && styles.buttonBackPressed,
        ]}
      >
        <Icon size={24} name="chevron-left" color={colors.primary} />
        <Text style={styles.textIcon}>Atrás</Text>
      </Pressable>
    </View>
  );
}

function ColCenter({
  title,
  headerHidden,
}: {
  title: string;
  subtitle?: string;
  headerHidden?: SharedValue<boolean>;
}) {
  const titleStyle = useAnimatedStyle(() => {
    if (headerHidden === undefined) return {};
    return {
      opacity: withTiming(headerHidden.value ? 1 : 0),
      transform: [
        {
          translateY: withTiming(headerHidden.value ? 0 : 4),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.columnCenter, titleStyle]}>
      <Text lineBreakMode="tail" numberOfLines={1} style={styles.title}>
        {title}
      </Text>
    </Animated.View>
  );
}

function ColRight({
  children,
}: {
  children?: React.JSX.Element | React.JSX.Element[];
}) {
  return <View style={styles.columnRight}>{children}</View>;
}

const styles = StyleSheet.create({
  topBar: {
    height: CONSTANT.HEADER,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.sm,
  },
  textIcon: {
    fontFamily: fonts.medium,
    fontSize: typography.sm,
    color: colors.primary,
    textAlignVertical: "center",
  },
  columnLeft: {
    justifyContent: "center",
    zIndex: 110,
  },
  buttonBack: {
    flexDirection: "row",
    alignItems: "center",
    height: 32,
    paddingRight: spacing.sm,
  },
  buttonBackPressed: {
    opacity: 0.2,
  },
  columnRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 110,
  },
  columnCenter: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  title: {
    color: colors.text,
    fontFamily: fonts.semibold,
    fontSize: typography.sm,
    width: 180,
    textAlign: "center",
  },
});
