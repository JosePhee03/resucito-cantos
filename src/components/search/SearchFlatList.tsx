import { memo, ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

import { Song } from "@/domain/song";
import { colors, CONSTANT, fonts, spacing, typography } from "@/themes";
import SearchEmptyList from "./SearchEmptyList";
import SongItem from "./SongItem";

type SongFlatListProps = {
  songs: Song[];
  title?: string;
  onPressItem: (id: string) => void;
  headerHidden: SharedValue<boolean>;
  showList: boolean;
  searchComponent: ReactNode;
};

export default function SongFlatList({
  songs,
  title = "",
  onPressItem,
  headerHidden,
  showList,
  searchComponent,
}: SongFlatListProps) {
  const onScroll = useAnimatedScrollHandler((event) => {
    const isHidden = event.contentOffset.y > CONSTANT.HEADER;
    headerHidden.value = isHidden;
  });

  if (!showList) {
    return null;
  }

  return (
    <Animated.FlatList
      ListHeaderComponent={
        <>
          <View style={styles.headerList}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{`${songs.length} Cantos`}</Text>
          </View>
          <View style={styles.searchContainer}>{searchComponent}</View>
        </>
      }
      onScroll={onScroll}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      data={songs}
      ListEmptyComponent={<SearchEmptyList />}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <SongItemMemo song={item} onPress={onPressItem} />
      )}
      removeClippedSubviews
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
    />
  );
}

const SongItemMemo = memo(
  ({ song, onPress }: { song: Song; onPress: (id: string) => void }) => {
    return <SongItem song={song} onPress={onPress} />;
  },
);

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  headerList: {
    paddingHorizontal: spacing.md,
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
  searchContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
});
