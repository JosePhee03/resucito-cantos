import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors, fonts, spacing, typography } from "@/themes";
import Icon from "../Icon";

type SearchTopBarProps = {
  title: string;
  children?: React.JSX.Element | React.JSX.Element[];
};

export default function SearchTopBar({ title, children }: SearchTopBarProps) {
  return (
    <View style={styles.header}>
      <View style={styles.toolBar}>
        <ColLeft />
        <ColCenter title={title} />
        <ColRight />
      </View>
      <View style={{ paddingHorizontal: spacing.md }}>{children}</View>
    </View>
  );
}

const ColLeft = () => {
  return (
    <View style={styles.columnLeft}>
      <TouchableOpacity onPress={router.back} style={{ flexDirection: "row" }}>
        <Icon size={24} name="chevron-left" color={colors.primary} />
        <Text style={styles.textIcon}>{"Ínicio"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const ColCenter = ({ title }: { title: string }) => {
  return (
    <View style={styles.columnCenter}>
      <Text
        style={{
          color: colors.text,
          fontFamily: fonts.bold,
          fontSize: typography.sm,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

const ColRight = () => {
  return (
    <View style={styles.columnRight}>
      <TouchableOpacity>
        <Text style={styles.textIcon}>Filtros</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    paddingBottom: spacing.sm,
  },
  toolBar: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.sm,
    zIndex: 100,
  },
  textIcon: {
    fontFamily: fonts.medium,
    fontSize: typography.sm,
    color: colors.primary,
    textAlignVertical: "center",
  },
  columnLeft: {
    width: "50%",
    justifyContent: "center",
  },
  columnRight: {
    width: "50%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: spacing.sm,
  },
  columnCenter: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  rowCenter: {
    flexDirection: "row",
  },
});
