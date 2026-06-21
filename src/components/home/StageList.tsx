import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, CONSTANT, fonts, spacing, typography } from "@/themes";
import { Stage } from "@/domain/song";
import { useSongStore } from "@/store/song.store";
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

type StageListProps = {
  onPress: (stage?: Stage) => void;
};

export default function StageList({ onPress }: StageListProps) {
  const totalSongsByStage = useSongStore.getState().totalSongsByStage;

  return (
    <View>
      {stages.map((stage, index) => (
        <Pressable
          onPress={() => onPress(stage)}
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
                {totalSongsByStage[stage]}
              </Text>
              <Icon
                name="chevron-right"
                strokeWidth={1}
                color={colors.foregroundSecondary}
              />
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stageItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  stageItemPressed: {
    backgroundColor: colors.pressed,
  },
  stageItemContent: {
    flex: 1,
    height: CONSTANT.SECTION_ROW,
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
    color: colors.text,
  },
  stageItemRight: {
    alignItems: "center",
    height: "100%",
    flexDirection: "row",
  },
  stageItemTotalNumber: {
    fontFamily: fonts.regular,
    fontSize: typography.sm,
    color: colors.foregroundSecondary,
  },
});
