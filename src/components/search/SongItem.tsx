import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, CONSTANT, fonts, radius, spacing, typography } from "@/themes";
import { Song } from "@/domain/song";

type SongItemProps = {
  song: Song;
  onPress: (id: string) => void;
};

export default function SongItem({ song, onPress }: SongItemProps) {
  return (
    <Pressable
      onPress={() => onPress(song.id)}
      style={({ pressed }) => [
        styles.songItem,
        pressed && styles.songItemPressed,
      ]}
    >
      <View style={[styles.pageBadge, { backgroundColor: colors[song.stage] }]}>
        <Text style={styles.pageText}>{song.page}</Text>
      </View>
      <View style={styles.songDeteails}>
        <Text style={styles.titleText} numberOfLines={1} ellipsizeMode="tail">
          {song.title.toUpperCase()}
        </Text>
        <Text
          style={styles.subtitleText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {song.subtitle}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    backgroundColor: colors.surface,
  },
  songItemPressed: {
    backgroundColor: colors.pressed,
  },
  pageBadge: {
    justifyContent: "center",
    alignItems: "center",
    width: CONSTANT.PAGE_BADGE,
    height: CONSTANT.PAGE_BADGE,
    borderRadius: radius.sm,
  },
  songDeteails: {
    flex: 1,
    height: CONSTANT.LIST_ROW,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  pageText: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: typography.md,
  },
  titleText: {
    fontFamily: fonts.bold,
    color: colors.text,
    fontSize: typography.sm,
  },
  subtitleText: {
    fontFamily: fonts.medium,
    color: colors.textSecondary,
    fontSize: typography.sm,
  },
  liricText: {
    fontFamily: fonts.regular,
    color: colors.text,
    fontSize: typography.sm,
  },
});
