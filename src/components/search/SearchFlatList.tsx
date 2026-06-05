import { memo, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { colors } from "@/themes";
import { Song } from "@/domain/song";
import SearchFooter from "./SearchFooter";
import SearchEmplyList from "./SearchEmplyList";
import SongItem from "./SongItem";
import useSongDebounce from "@/hooks/useSongDebounce";

type SongFlatListProps = {
  query: string;
  stage?: string;
  onPressItem: (id: string) => void;
};

export default function SongFlatList({
  query,
  stage,
  onPressItem,
}: SongFlatListProps) {
  const { songs, loading } = useSongDebounce(query, stage, 300);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setShowList(true);
    });

    return () => cancelAnimationFrame(id);
  }, []);

  if (!showList) {
    return null;
  }

  return (
    <>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        data={songs}
        ListEmptyComponent={() => !loading && <SearchEmplyList />}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SongItemMemo song={item} onPress={onPressItem} />
        )}
        removeClippedSubviews
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
      <View style={styles.spacer}></View>
      <SearchFooter total={songs.length} loading={loading} />
    </>
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
