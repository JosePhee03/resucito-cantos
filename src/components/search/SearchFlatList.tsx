import { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

import { colors, fonts, radius, spacing, typography } from "@/themes";
import { Song } from "@/domain/song";
import SearchEmplyList from "./SearchEmplyList";
import SongItem from "./SongItem";
import Icon from "../Icon";
import ButtonSearch from "../ButtonSearch";

type SongFlatListProps = {
  songs: Song[];
  title?: string;
  onPressItem: (id: string) => void;
  headerHidden: SharedValue<boolean>;
  showList: boolean;
  navigationSearch: () => void;
};

export default function SongFlatList({
  songs,
  title = "",
  onPressItem,
  headerHidden,
  showList,
  navigationSearch,
}: SongFlatListProps) {
  const onScroll = useAnimatedScrollHandler((event) => {
    const isHidden = event.contentOffset.y > 44;
    headerHidden.value = isHidden;
  });

  if (!showList) {
    return null;
  }

  return (
    <Animated.FlatList
      ListHeaderComponent={
        <View style={{ backgroundColor: colors.background }}>
          <View
            style={{
              paddingHorizontal: spacing.md,
            }}
          >
            <Text
              style={{
                fontFamily: fonts.bold,
                fontSize: typography.lg,
                color: colors.text,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontFamily: fonts.regular,
                fontSize: typography.sm,
                color: colors.textSecondary,
              }}
            >
              {`${songs.length} Cantos`}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: spacing.md,
              paddingVertical: spacing.sm,
            }}
          >
            <ButtonSearch onPress={navigationSearch} />
          </View>
        </View>
      }
      onScroll={onScroll}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      keyboardShouldPersistTaps="handled"
      data={songs}
      ListEmptyComponent={<SearchEmplyList />}
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
    backgroundColor: colors.surface,
  },
  listContent: {
    paddingBottom: "25%",
  },
  spacer: {
    width: "100%",
    height: 36,
  },
});
