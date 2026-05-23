import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fonts, radius, spacing, typography } from "@/themes";
import { ChevronRightIcon, CircleIcon } from "@/components";
import { Stage } from "@/types/song";

const stages: Stage[] = [
  "precatechumenate",
  "liturgy",
  "catechumenate",
  "election",
];

const stageLang: Record<Stage, string> = {
  precatechumenate: "Precatecumenado",
  liturgy: "Liturgia",
  catechumenate: "Catecumenado",
  election: "Elección",
};

export default function StageList() {
  return (
    <View style={styles.stageList}>
      {stages.map((stage) => (
        <Pressable
          style={({ pressed }) => [
            styles.stageItem,
            pressed && styles.stageItemPressed,
          ]}
          key={stage}
        >
          <View style={styles.stageItemLeft}>
            <CircleIcon size={16} color={colors[stage]} />
            <Text style={styles.stageItemTitle}>{stageLang[stage]}</Text>
          </View>
          <View style={styles.stageItemRight}>
            <Text style={styles.stageItemTotalNumber}>0</Text>
            <ChevronRightIcon color={colors.foreground} />
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stageList: {
    gap: spacing.sm,
  },
  stageItem: {
    height: 48,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radius.sm,
  },
  stageItemPressed: {
    backgroundColor: colors.pressed,
  },
  stageItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  stageItemTitle: {
    fontFamily: fonts.inter.medium,
    fontSize: typography.md,
  },
  stageItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  stageItemTotalNumber: {
    fontFamily: fonts.inter.regular,
    fontSize: typography.sm,
  },
});
