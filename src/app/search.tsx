import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

import { colors, fonts, typography } from "@/themes";
import { SearchBar, SearchFlatList, SearchTopBar } from "@/components/search";

type Params = {
  stage?: string;
};

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const { stage } = useLocalSearchParams<Params>();
  const [focus, setFocus] = useState(false);
  const navigationLock = useRef(false);

  useFocusEffect(
    useCallback(() => {
      navigationLock.current = false;
    }, []),
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

      <SearchFlatList
        query={query}
        stage={stage}
        onPressItem={handleNavigationSong}
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
