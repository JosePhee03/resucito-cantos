import { StyleSheet, Text, View } from "react-native";

import { colors, fonts, spacing, typography } from "@/themes";
import StageList from "./StageList";
import { Stage } from "@/domain/song";

type SectionIndexProps = {
  onPressItem: (stage?: Stage) => void;
};

export default function SectionIndex({ onPressItem }: SectionIndexProps) {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHearder}>
        <Text style={styles.sectionHearderTitle}>Pasos del Camino</Text>
      </View>
      <StageList onPress={(p) => onPressItem(p)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  sectionHearder: {
    paddingHorizontal: spacing.sm,
  },
  sectionHearderTitle: {
    fontFamily: fonts.medium,
    fontSize: typography.md,
    color: colors.text,
  },
});
