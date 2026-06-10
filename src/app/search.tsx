import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSharedValue } from "react-native-reanimated";

import { colors, fonts, typography } from "@/themes";
import { isStage, Stage } from "@/domain/song";
import useSongDebounce from "@/hooks/useSongDebounce";
import { SearchBar, SearchFlatList, SearchTopBar } from "@/components/search";
import { Icon, TopBar } from "@/components";

type Params = {
  stage?: string;
};

const stageLang: Record<Stage, string> = {
  precatechumenate: "Precatecumenado",
  liturgy: "Liturgia",
  catechumenate: "Catecumenado",
  election: "Elección",
};

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const { stage } = useLocalSearchParams<Params>();
  const navigationLock = useRef(false);
  const { songs, loading } = useSongDebounce(query, stage, 300);
  const headerHidden = useSharedValue(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showList, setShowList] = useState(false);

  useFocusEffect(
    useCallback(() => {
      navigationLock.current = false;
    }, []),
  );

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setShowList(true);
    });

    return () => cancelAnimationFrame(id);
  }, []);

  const handleOnChange = (text: string) => {
    setQuery(text);
  };

  const handleNavigationSong = useCallback((id: string) => {
    if (navigationLock.current) return;
    navigationLock.current = true;
    router.push(`/song/${id}`);
  }, []);

  const handleShowSearchBar = () => {
    setShowSearchBar(true);
  };

  const handleHiddenSearchBar = () => {
    setShowSearchBar(false);
  };

  const titleStage = useCallback(() => {
    if (stage === undefined) return "Todos los cantos";
    if (isStage(stage)) return stageLang[stage];
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {showSearchBar ? (
        <SearchTopBar>
          <SearchBar
            onChange={handleOnChange}
            query={query}
            loading={loading}
            onCancel={handleHiddenSearchBar}
          />
        </SearchTopBar>
      ) : (
        <TopBar
          headerHidden={headerHidden}
          title={titleStage()}
          rightToobar={
            <Pressable onPress={handleShowSearchBar}>
              <Icon name="search" color={colors.primary} />
            </Pressable>
          }
        />
      )}
      <SearchFlatList
        title={titleStage()}
        showList={showList}
        headerHidden={headerHidden}
        songs={songs}
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
    fontSize: typography.lg,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: typography.sm,
    color: colors.textTertiary,
  },
});
