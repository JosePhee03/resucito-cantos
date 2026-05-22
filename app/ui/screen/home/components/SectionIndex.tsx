import { colors, fonts, spacing, typography } from "@/themes";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StageList from "./StageList";

export default function SectionIndex() {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHearder}>
        <Text style={styles.sectionHearderTitle}>Índice</Text>
      </View>
      <StageList />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: spacing.md,
  },
  sectionHearder: {
    paddingVertical: spacing.md,
  },
  sectionHearderTitle: {
    fontFamily: fonts.inter.medium,
    fontSize: typography.lg,
    color: colors.title,
  },
});
