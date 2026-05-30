import { memo, useEffect, useMemo, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  StyleSheet,
  FlatList,
  Text,
  Keyboard,
  ActivityIndicator,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import { colors, fonts, spacing, typography } from "@/themes";
import { SearchBar, SearchTopBar, SongItem } from "@/components/search";
import { useSongStore } from "@/store/song.store";
import { isStage, Song } from "@/domain/song";

type Params = {
  stage?: string;
};

function useDebounce<T>(value: string, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setDebounced(value);
      setLoading(false);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return {
    debounced,
    loading,
  };
}

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const { stage } = useLocalSearchParams<Params>();
  const { songs, songsByStage } = useSongStore.getState();
  const [searchSongs, setSearchSong] = useState<Song[]>([]);
  const { debounced: debouncedQuery, loading } = useDebounce(query, 300);

  useEffect(() => {
    setSearchSong(filteredSongs);
  }, [debouncedQuery]);

  const filteredSongs = useMemo(() => {
    if (!debouncedQuery) {
      if (stage && isStage(stage)) {
        return songsByStage[stage];
      }
      return songs;
    }

    const query = debouncedQuery.toLowerCase();

    return searchSongs.filter((song) =>
      song.title.toLowerCase().includes(query),
    );
  }, [debouncedQuery, searchSongs]);

  const handleOnClear = () => {
    setQuery("");
  };

  const handleOnChange = (text: string) => {
    setQuery(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchTopBar title={stage ?? "Todos los cantos"}>
        <SearchBar
          onChange={handleOnChange}
          query={query}
          onClear={handleOnClear}
        />
      </SearchTopBar>

      <FlatList
        contentContainerStyle={{
          backgroundColor: colors.surface,
          paddingBottom: "25%",
        }}
        keyboardShouldPersistTaps="handled"
        data={searchSongs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SongItemMemo song={item} />}
        removeClippedSubviews
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
      <View
        style={{
          zIndex: 100,
          width: "100%",
          height: 36,
        }}
      ></View>
      <Footer total={searchSongs.length} loading={loading} />
    </SafeAreaView>
  );
}

const SongItemMemo = memo(({ song }: { song: Song }) => {
  return <SongItem song={song} />;
});

function Footer({ total, loading }: { total: number; loading: boolean }) {
  const insets = useSafeAreaInsets();
  const keyboardHeight = useSharedValue(0);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", (e) => {
      keyboardHeight.value = e.endCoordinates.height;
    });

    const hide = Keyboard.addListener("keyboardDidHide", () => {
      keyboardHeight.value = 0;
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -keyboardHeight.value }],
      bottom: insets.bottom,
    };
  });

  return (
    <Animated.View style={[styles.footer, animatedStyle]}>
      {loading ? (
        <>
          <ActivityIndicator />
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: typography.sm,
              color: colors.foregroundSecondary,
            }}
          >
            Cantos
          </Text>
        </>
      ) : (
        <Text
          style={{
            fontFamily: fonts.medium,
            fontSize: typography.sm,
            color: colors.foregroundSecondary,
          }}
        >
          {`${total.toString().padStart(3, " ")} Cantos`}
        </Text>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 36,
    flexDirection: "row",
    gap: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderColor: colors.border,
    zIndex: 4,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: typography.xl,
    color: colors.text,
  },
});
