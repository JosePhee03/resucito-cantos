import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSharedValue } from "react-native-reanimated";

import { colors, fonts, typography } from "@/themes";
import { isStage, Stage } from "@/domain/song";
import useSongDebounce from "@/hooks/useSongDebounce";
import { SearchFlatList } from "@/components/search";
import { TopBar } from "@/components";

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
  const [showList, setShowList] = useState(false);
  const [isPresented, setIsPresented] = useState(false);

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

  const handleOnChange = useCallback((text: string) => {
    setQuery(text);
  }, []);

  const handleNavigationSong = useCallback((id: string) => {
    if (navigationLock.current) return;
    navigationLock.current = true;
    router.push(`/song/${id}`);
  }, []);

  const title = useMemo(() => {
    if (stage === undefined) return "Todos los cantos";
    if (isStage(stage)) return stageLang[stage];

    return "Todos los cantos";
  }, [stage]);

  const handleNavigationSearch = (stage?: Stage) => {
    if (navigationLock.current) return;
    navigationLock.current = true;
    router.push({ pathname: "/search-modal" });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TopBar headerHidden={headerHidden} title={title} />
      <MemoSearchFlatList
        title={title}
        showList={showList}
        headerHidden={headerHidden}
        songs={songs}
        onPressItem={handleNavigationSong}
        navigationSearch={handleNavigationSearch}
      />
    </SafeAreaView>
  );
}

const MemoSearchFlatList = memo(SearchFlatList);

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
