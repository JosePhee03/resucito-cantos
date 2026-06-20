import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";

import useSongDebounce from "@/hooks/useSongDebounce";
import { colors, fonts, typography } from "@/themes";
import { isStage, Stage } from "@/domain/song";
import { ButtonIcon, TopBar } from "@/components";
import { SearchFlatList } from "@/components/search";

type Params = {
  stage?: string;
  q?: string;
};

const stageLang: Record<Stage, string> = {
  precatechumenate: "Precatecumenado",
  liturgy: "Liturgia",
  catechumenate: "Catecumenado",
  election: "Elección",
};

const handleResetQuery = () => {
  router.setParams({ q: "" });
};

export default function SearchScreen() {
  const { stage, q: query } = useLocalSearchParams<Params>();
  const navigationLock = useRef(false);
  const { songs, loading } = useSongDebounce(query ?? "", stage, 300);
  const headerHidden = useSharedValue(false);
  const [showList, setShowList] = useState(false);
  const bottomSheetRef = useRef<BottomSheetModal | null>(null);

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

  const handleNavigationSong = useCallback((id: string) => {
    if (navigationLock.current) return;
    navigationLock.current = true;
    router.push(`/song/${id}`);
  }, []);

  const title = useMemo(() => {
    if (stage === undefined) return "Todos los cantos";
    if (isStage(stage)) return stageLang[stage];
  }, [stage]);

  const handleNavigationSearchModal = useCallback(() => {
    if (navigationLock.current) return;
    navigationLock.current = true;
    router.push({ pathname: "/search-modal", params: { q: query, stage } });
  }, [query]);

  return (
    <SafeAreaView edges={["left", "right", "top"]} style={styles.container}>
      <TopBar
        headerHidden={headerHidden}
        title={title}
        right={<ButtonIcon icon="ellipsis" onPress={() => {}} />}
      />
      <MemoSearchFlatList
        title={title}
        query={query}
        onPress={handleNavigationSearchModal}
        onClear={handleResetQuery}
        loading={loading}
        showList={showList}
        headerHidden={headerHidden}
        songs={songs}
        onPressItem={handleNavigationSong}
      />
    </SafeAreaView>
  );
}

const MemoSearchFlatList = memo(SearchFlatList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    height: "100%",
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
