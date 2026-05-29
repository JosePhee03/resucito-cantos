import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, fonts, radius, spacing, typography } from "@/themes";
import { Link, router } from "expo-router";
import { Song } from "@/types/song";

type SongItemProps = {
  song: Song;
  index: number;
  size: number;
};

export default function SongItem({ song, index, size }: SongItemProps) {
  return (
    <Pressable
      onPress={() => router.push(`/song/${song.id}`)}
      style={({ pressed }) => [pressed && styles.songItemPressed]}
    >
      <View style={styles.songItem}>
        <View style={styles.pageBadge}>
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
    backgroundColor: colors.precatechumenate,
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
    fontFamily: fonts.semibold,
    color: colors.textSecondary,
    fontSize: typography.sm,
  },
  liricText: {
    fontFamily: fonts.medium,
    color: colors.text,
    fontSize: typography.sm,
  },
});
