import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

import { colors, fonts, spacing, typography } from "@/themes";
import Icon from "./Icon";

export default function TopBar({ title }: { title: string }) {
  return (
    <View style={styles.topBar}>
      <ColLeft />
      <ColCenter title={title} />
      <ColRight />
    </View>
  );
}

function ColLeft() {
  return (
    <View style={styles.columnLeft}>
      <TouchableOpacity onPress={router.back} style={{ flexDirection: "row" }}>
        <Icon size={24} name="chevron-left" color={colors.primary} />
        <Text style={styles.textIcon}>Átras</Text>
      </TouchableOpacity>
    </View>
  );
}

function ColCenter({ title }: { title: string }) {
  return (
    <View style={styles.columnCenter}>
      <Text
        lineBreakMode="tail"
        numberOfLines={1}
        style={{
          color: colors.text,
          fontFamily: fonts.semibold,
          fontSize: typography.sm,
          width: 180,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
    </View>
  );
}

function ColRight() {
  return (
    <View style={styles.columnRight}>
      <TouchableOpacity>
        <Text style={styles.textIcon}>Filtros</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    paddingBottom: spacing.sm,
  },
  topBar: {
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
