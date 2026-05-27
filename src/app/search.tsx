import { StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, fonts, typography } from "@/themes";
import { toSongs } from "@/mappers/song.mapper";
import { SearchTopBar, SongItem } from "@/components/search";
import { SearchBar } from "@/components";

import songs from "@/data/es_2019_v2.json";

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <SearchTopBar title="Cantos">
        <SearchBar />
      </SearchTopBar>

      <FlatList
        style={{ backgroundColor: colors.surface }}
        scrollEventThrottle={16}
        data={toSongs(songs)}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <SongItem song={item} index={index} size={songs.length} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: typography.xl,
    color: colors.text,
  },
});
