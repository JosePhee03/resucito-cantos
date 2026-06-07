import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors, fonts, spacing, typography } from "@/themes";
import { Song } from "@/domain/song";
import LyricView from "./LyricView";

type SongDetailsProps = {
  song: Song;
};

export default function SongDetails({ song }: SongDetailsProps) {
  const { page, title, subtitle, capo, lyric } = song;
  return (
    <ScrollView style={styles.content}>
      <View style={styles.spacingSm}>
        <Text style={styles.page}>{page}</Text>
        <View>
          <Text style={styles.title}>{title.toUpperCase()}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <Text style={styles.capo}>{`Cejilla ${capo}° traste`}</Text>
      </View>
      <View style={{ paddingVertical: spacing.md }}>
        <LyricView lyric={lyric} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.md,
  },
  spacingLg: { gap: spacing.lg },
  spacingSm: {
    gap: spacing.sm,
  },
  spacingXs: {
    gap: spacing.sm,
  },
  page: {
    fontFamily: fonts.semibold,
    fontSize: typography.lg,
    color: colors.textSecondary,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: typography.lg,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.medium,
    fontSize: typography.md,
    color: colors.textTertiary,
  },
  capo: {
    fontFamily: fonts.regular,
    fontSize: typography.xs,
    color: colors.text,
  },
});
