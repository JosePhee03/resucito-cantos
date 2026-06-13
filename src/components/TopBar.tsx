import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { colors, CONSTANT, fonts, spacing, typography } from "@/themes";
import { ButtonBack } from "./Button";

type TopBarProps = {
  title?: string;
  right?: React.ReactNode;
  left?: React.ReactNode;
  headerHidden?: SharedValue<boolean>;
};

export default function TopBar({
  title = "",
  right,
  left,
  headerHidden,
}: TopBarProps) {
  return (
    <View style={styles.topBar}>
      <ColLeft>{left}</ColLeft>
      <ColCenter title={title} headerHidden={headerHidden} />
      <ColRight>{right}</ColRight>
    </View>
  );
}

function ColLeft({ children }: { children?: React.ReactNode }) {
  const handleBackNavigate = () => {
    router.canGoBack() ? router.back() : router.navigate("/");
  };
  return (
    <View style={styles.columnLeft}>
      {children || <ButtonBack onPress={handleBackNavigate} text="Atrás" />}
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

function ColRight({ children }: { children?: React.ReactNode }) {
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
  columnLeft: {
    justifyContent: "center",
    zIndex: 110,
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
