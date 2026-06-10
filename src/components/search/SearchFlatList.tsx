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
    const isHidden = event.contentOffset.y > 52;
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
              paddingVertical: spacing.sm,
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
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: spacing.sm,
            }}
          >
            <Pressable
              style={({ pressed }) => [
                {
                  flexDirection: "row",
                  paddingHorizontal: spacing.sm,
                  gap: spacing.xs,
                  alignItems: "center",
                  height: 32,
                  borderRadius: radius.lg,
                },
                pressed && { backgroundColor: colors.pressed },
              ]}
            >
              <Text
                style={{
                  fontFamily: fonts.regular,
                  fontSize: typography.sm,
                  color: colors.foreground,
                }}
              >
                Filtros
              </Text>
              <Icon
                name="chevrons-up-down"
                size={16}
                color={colors.foreground}
              />
            </Pressable>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Pressable
                style={({ pressed }) => [
                  {
                    flexDirection: "row",
                    paddingHorizontal: spacing.sm,
                    gap: spacing.xs,
                    alignItems: "center",
                    height: 32,
                    borderStartStartRadius: radius.lg,
                    borderBottomStartRadius: radius.lg,
                  },
                  pressed && { backgroundColor: colors.pressed },
                ]}
              >
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: typography.sm,
                    color: colors.foreground,
                  }}
                >
                  Vista
                </Text>
                <Icon name="layout-list" size={16} color={colors.foreground} />
              </Pressable>
              <View
                style={{
                  height: 20,
                  width: 1,
                  backgroundColor: colors.foreground,
                }}
              />
              <Pressable
                style={({ pressed }) => [
                  {
                    flexDirection: "row",
                    paddingHorizontal: spacing.sm,
                    gap: spacing.xs,
                    alignItems: "center",
                    height: 32,
                    borderEndEndRadius: radius.lg,
                    borderTopEndRadius: radius.lg,
                  },
                  pressed && { backgroundColor: colors.pressed },
                ]}
              >
                <Text
                  style={{
                    fontFamily: fonts.regular,
                    fontSize: typography.sm,
                    color: colors.foreground,
                  }}
                >
                  Ordenar
                </Text>
                <Icon
                  name="arrow-down-up"
                  size={16}
                  color={colors.foreground}
                />
              </Pressable>
            </View>
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
