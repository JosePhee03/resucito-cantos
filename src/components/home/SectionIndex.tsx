import { StyleSheet, Text, View } from "react-native";

import { colors, CONSTANT, fonts, spacing, typography } from "@/themes";
import { Stage } from "@/domain/song";
import StageList from "./StageList";

type SectionIndexProps = {
  onPressItem: (stage?: Stage) => void;
};

export default function SectionIndex({ onPressItem }: SectionIndexProps) {
  return (
    <View>
      <View style={styles.sectionHearder}>
        <Text style={styles.sectionHearderTitle}>Pasos del camino</Text>
      </View>
      <StageList onPress={(p) => onPressItem(p)} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHearder: {
    height: CONSTANT.SECTION_HEADER,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  sectionHearderTitle: {
    fontFamily: fonts.medium,
    fontSize: typography.md,
    color: colors.textTertiary,
  },
});
