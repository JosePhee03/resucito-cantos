import { memo, useRef } from "react";
import { Pressable, SectionList, StyleSheet, Text, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

import { Song } from "@/domain/song";
import { colors, CONSTANT, fonts, spacing, typography } from "@/themes";
import SearchEmptyList from "./SongEmptyList";
import { SongItemMemo } from "./SongItem";

type SongFlatListProps = {
  songs: Song[];
  title?: string;
  onPressItem: (id: string) => void;
  headerHidden: SharedValue<boolean>;
  showList: boolean;
};

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList<Song>);

export default function SongSectionList({
  songs,
  title = "",
  onPressItem,
  headerHidden,
  showList,
}: SongFlatListProps) {
  const sectionListRef = useRef<SectionList<Song>>(null);

  const onScroll = useAnimatedScrollHandler((event) => {
    const isHidden = event.contentOffset.y > CONSTANT.HEADER;
    headerHidden.value = isHidden;
  });

  if (!showList) {
    return null;
  }

  return (
    <AnimatedSectionList
      ref={sectionListRef}
      ListHeaderComponent={
        <View style={styles.headerList}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{`${songs.length} Cantos`}</Text>
        </View>
      }
      onScroll={onScroll}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      stickySectionHeadersEnabled
      ListEmptyComponent={<SearchEmptyList />}
      contentContainerStyle={styles.listContent}
      sections={sections(songs)}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <SongItemMemo song={item} onPress={onPressItem} />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <View
          style={{
            height: 22,
            justifyContent: "center",
            paddingHorizontal: spacing.md,
            backgroundColor: colors.surfaceSecondary,
          }}
        >
          <Text
            style={{
              fontFamily: fonts.semibold,
              fontSize: typography.sm,
              color: colors.text,
            }}
          >
            {title}
          </Text>
        </View>
      )}
    />
  );
}

const sections = (songs: Song[]) =>
  Object.values(
    songs.reduce(
      (acc, song) => {
        const letter = song.title[0].toUpperCase();

        if (!acc[letter]) {
          acc[letter] = {
            title: letter,
            data: [],
          };
        }

        acc[letter].data.push(song);

        return acc;
      },
      {} as Record<string, { title: string; data: typeof songs }>,
    ),
  ).sort((a, b) => a.title.localeCompare(b.title));

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  headerList: {
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: typography.lg,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: typography.sm,
    color: colors.textTertiary,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginRight: spacing.md,
    marginLeft: spacing.lg + CONSTANT.PAGE_BADGE,
  },
});
