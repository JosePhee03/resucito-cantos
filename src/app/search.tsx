import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

import { colors, fonts, spacing, typography } from "@/themes";
import { useSongStore } from "@/store/song.store";
import { isStage, Song } from "@/domain/song";
import { SearchBar, SearchTopBar, SongItem } from "@/components/search";
import { Icon } from "@/components";

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
  const [focus, setFocus] = useState(false);
  const { debounced: debouncedQuery, loading } = useDebounce(query, 300);
  const navigationLock = useRef(false);

  useFocusEffect(
    useCallback(() => {
      navigationLock.current = false;
    }, [stage]),
  );

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (stage == undefined) setFocus(true);
      if (focus) setFocus(false);
    });
    return () => {
      cancelAnimationFrame(id);
    };
  }, [stage]);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setSearchSong(filteredSongs);
    });
    return () => {
      cancelAnimationFrame(id);
    };
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

  const handleNavigationSong = useCallback((id: string) => {
    if (navigationLock.current) return;
    navigationLock.current = true;
    router.push(`/song/${id}`);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchTopBar title={"Cantos"}>
        <SearchBar
          onChange={handleOnChange}
          query={query}
          onClear={handleOnClear}
          focus={focus}
        />
      </SearchTopBar>

      <FlatList
        style={{ flex: 1, backgroundColor: colors.surface }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        keyboardShouldPersistTaps="handled"
        data={searchSongs}
        ListEmptyComponent={() => !loading && <EmplyList />}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SongItemMemo song={item} onPress={handleNavigationSong} />
        )}
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

const SongItemMemo = memo(
  ({ song, onPress }: { song: Song; onPress: (id: string) => void }) => {
    return <SongItem song={song} onPress={onPress} />;
  },
);

const EmplyList = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: 64,
      }}
    >
      <View style={{ alignItems: "center", gap: spacing.sm }}>
        <Icon name="music" size={64} color={colors.foregroundSecondary} />
        <Text
          style={{
            fontFamily: fonts.medium,
            color: colors.foregroundSecondary,
            fontSize: typography.md,
          }}
        >
          Canto/s no encontrado/s
        </Text>
      </View>
    </View>
  );
};

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
