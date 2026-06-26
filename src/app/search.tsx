import { useCallback, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Song } from "@/domain/song";
import { useSongStore } from "@/store/song.store";
import { colors, CONSTANT, fonts, radius, spacing, typography } from "@/themes";
import { SearchList, SuggestionList } from "@/components/search";
import { ButtonText, SearchBar } from "@/components";

type Params = {
  stage?: string;
};

export default function SearchScreen() {
  const { stage } = useLocalSearchParams<Params>();
  const navigationLock = useRef(false);
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);
  const searchRef = useRef<TextInput>(null);
  const { filteredSongs } = useSongStore.getState();
  const [songs, setSongs] = useState<Song[]>([]);

  useFocusEffect(
    useCallback(() => {
      navigationLock.current = false;
      const id = requestAnimationFrame(() => {
        if (!showList) searchRef?.current?.focus();
      });

      return () => cancelAnimationFrame(id);
    }, [showList]),
  );

  const handleNavigationSong = useCallback((id: string) => {
    if (navigationLock.current) return;
    navigationLock.current = true;
    router.push(`/song/${id}`);
  }, []);

  const handleOnPressSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    searchRef?.current?.blur();
    const searchSong = filteredSongs(suggestion, stage);
    setSongs(searchSong);
    setShowList(true);
  };

  const handleOnChange = (query: string) => {
    setQuery(query);
  };

  const handleOnClear = () => {
    setQuery("");
    searchRef?.current?.focus();
  };

  const handleOnSubmit = () => {
    const searchSong = filteredSongs(query, stage);
    setSongs(searchSong);
    setShowList(true);
  };

  const handleOnFocus = () => {
    setShowList(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          onChange={handleOnChange}
          onClear={handleOnClear}
          searchRef={searchRef}
          query={query}
          onSubmit={handleOnSubmit}
          onFocus={handleOnFocus}
        />
        <ButtonText onPress={router.back} text="Cancelar" />
      </View>
      {showList ? (
        <>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: colors.border,
            }}
          >
            <Pressable
              style={({ pressed }) => [
                {
                  flex: 1,
                  height: CONSTANT.BUTTON,
                  justifyContent: "center",
                  alignItems: "center",
                },
                pressed && { backgroundColor: colors.pressed },
              ]}
            >
              <View
                style={{
                  position: "absolute",
                  backgroundColor: colors.primary,
                  height: StyleSheet.hairlineWidth * 4,
                  width: CONSTANT.BUTTON,
                  borderRadius: radius.xs,
                  bottom: 0,
                }}
              />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontFamily: fonts.semibold,
                  fontSize: typography.sm,
                  color: colors.text,
                }}
              >
                Precatecumenado
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                {
                  flex: 1,
                  height: CONSTANT.BUTTON,
                  justifyContent: "center",
                  alignItems: "center",
                },
                pressed && { backgroundColor: colors.pressed },
              ]}
            >
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontFamily: fonts.medium,
                  fontSize: typography.sm,
                  color: colors.text,
                }}
              >
                Todo los cantos
              </Text>
            </Pressable>
          </View>
          <SearchList onPressItem={handleNavigationSong} songs={songs} />
        </>
      ) : (
        <SuggestionList onPressItem={handleOnPressSuggestion} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  header: {
    height: CONSTANT.HEADER,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  content: {
    flex: 1,
    paddingVertical: spacing.sm,
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
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  emptySuggestion: {
    flex: 1,
    paddingTop: 64,
  },
  emptySuggestionText: {
    fontFamily: fonts.medium,
    fontSize: typography.sm,
    color: colors.textTertiary,
    textAlign: "center",
  },
});
