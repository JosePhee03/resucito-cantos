import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fonts, radius, spacing, typography } from "@/themes";
import { SongsByStage, Stage } from "@/types/song";
import Icon from "../Icon";

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

export default function StageList({
  totalStage,
}: {
  totalStage: Record<Stage, number>;
}) {
  return (
    <View style={styles.container}>
      {stages.map((stage, index) => (
        <Pressable
          style={({ pressed }) => [
            styles.stageItem,
            pressed && styles.stageItemPressed,
          ]}
          key={stage}
        >
          <Icon
            name="circle"
            size={16}
            color={colors[stage]}
            fill={colors[stage]}
          />

          <View
            style={[
              styles.stageItemContent,
              index !== stages.length - 1 && styles.stageItemContentBorder,
            ]}
          >
            <Text style={styles.stageItemTitle}>{stageLang[stage]}</Text>
            <View style={styles.stageItemRight}>
              <Text style={styles.stageItemTotalNumber}>
                {totalStage[stage]}
              </Text>
              <Icon name="chevron-right" color={colors.textTertiary} />
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    overflow: "hidden",
  },
  stageItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  stageItemPressed: {
    backgroundColor: colors.pressed,
  },
  stageItemContent: {
    flex: 1,
    height: 44,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  stageItemContentBorder: {
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  stageItemTitle: {
    fontFamily: fonts.regular,
    fontSize: typography.md,
  },
  stageItemRight: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  stageItemTotalNumber: {
    fontFamily: fonts.regular,
    fontSize: typography.sm,
    color: colors.textTertiary,
  },
});
