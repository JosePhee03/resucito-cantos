import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, CONSTANT, fonts, spacing, typography } from "@/themes";
import { ButtonText, Icon, SearchBar } from "@/components";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import useSongDebounce from "@/hooks/useSongDebounce";
import { SongItemMemo } from "@/components/songs/SongItem";

type Params = {
  stage?: string;
};

export default function SearchScreen() {
  const { stage } = useLocalSearchParams<Params>();
  const navigationLock = useRef(false);
  const [query, setQuery] = useState("");
  const { songs, loading, debouncedQuery, total } = useSongDebounce(
    query,
    stage,
  );
  const searchRef = useRef<TextInput>(null);

  useFocusEffect(
    useCallback(() => {
      navigationLock.current = false;
    }, []),
  );

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      searchRef?.current?.focus();
    });

    return () => cancelAnimationFrame(id);
  }, []);

  const handleNavigationSong = useCallback((id: string) => {
    if (navigationLock.current) return;
    navigationLock.current = true;
    router.push(`/song/${id}`);
  }, []);

  const handleOnChange = (query: string) => {
    setQuery(query);
  };

  const handleOnClear = () => {
    setQuery("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <SearchBar
          loading={loading}
          searchRef={searchRef}
          query={query}
          onChange={handleOnChange}
          onClear={handleOnClear}
        />
        <ButtonText onPress={router.back} text="Cancelar" />
      </View>
      <FlatList
        style={{ backgroundColor: colors.background }}
        ListHeaderComponent={
          <View
            style={{
              backgroundColor: colors.backgroundSecondary,
              height: CONSTANT.HEADER + spacing.sm,
              paddingHorizontal: spacing.md,
              justifyContent: "center",
              paddingBottom: spacing.sm,
            }}
          >
            <Text style={styles.title}>Resultados</Text>
            <Text
              style={{
                fontFamily: fonts.medium,
                fontSize: typography.sm,
                color: colors.textTertiary,
              }}
            >{`${songs.length} de ${total} cantos`}</Text>
          </View>
        }
        keyboardShouldPersistTaps="handled"
        data={songs}
        renderItem={({ item }) => (
          <SongItemMemo
            song={item}
            key={item.id}
            onPress={handleNavigationSong}
          />
        )}
      />
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
