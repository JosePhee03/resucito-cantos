import { Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { colors, fonts, radius, spacing, typography } from "@/themes";
import { Song } from "@/domain/song";

type SongItemProps = {
  song: Song;
};

export default function SongItem({ song }: SongItemProps) {
  return (
    <Pressable
      onPress={() => router.push(`/song/${song.id}`)}
      style={({ pressed }) => [pressed && styles.songItemPressed]}
    >
      <View style={styles.songItem}>
        <View
          style={{ ...styles.pageBadge, backgroundColor: colors[song.stage] }}
        >
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
          <Text style={styles.liricText} numberOfLines={1} ellipsizeMode="tail">
            {song.lyric.split("\n")[1]}
          </Text>
        </View>
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
  },
  songItemPressed: {
    backgroundColor: colors.pressed,
  },
  pageBadge: {
    justifyContent: "center",
    alignItems: "center",
    width: 44,
    height: 44,
    borderRadius: radius.sm,
  },
  songDeteails: {
    flex: 1,
    paddingVertical: spacing.md,
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
