import { memo } from "react";
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
};

export default function SongFlatList({
  songs,
  title = "",
  onPressItem,
  headerHidden,
  showList,
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
        <View style={styles.headerList}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{`${songs.length} Cantos`}</Text>
        </View>
      }
      onScroll={onScroll}
      contentContainerStyle={styles.listContent}
      data={songs}
      ListEmptyComponent={<SearchEmptyList />}
      keyExtractor={(item) => item.id}
      renderItem={({ item, separators }) => (
        <SongItemMemo song={item} onPress={onPressItem} />
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 1,
            backgroundColor: colors.border,
            marginRight: spacing.md,
            marginLeft: spacing.lg + CONSTANT.PAGE_BADGE,
          }}
        />
      )}
      removeClippedSubviews
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
    />
  );
}
const SongItemMemo = memo(SongItem);

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  headerList: {
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
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
});
