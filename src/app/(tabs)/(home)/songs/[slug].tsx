import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

import { colors, fonts, typography } from "@/themes";
import { isStage, Stage } from "@/domain/song";
import { useSongStore } from "@/store/song.store";
import { ButtonIcon, TopBar } from "@/components";
import { SearchFlatList } from "@/components/search";

type Params = {
  slug: string;
};

const stageLang: Record<Stage, string> = {
  precatechumenate: "Precatecumenado",
  liturgy: "Liturgia",
  catechumenate: "Catecumenado",
  election: "Elección",
};

export default function SongListScreen() {
  const { slug } = useLocalSearchParams<Params>();
  const navigationLock = useRef(false);
  const headerHidden = useSharedValue(false);
  const [showList, setShowList] = useState(false);
  const { songsByStage, songs: TotalSongs } = useSongStore.getState();

  const songs = useMemo(() => {
    if (isStage(slug)) return songsByStage[slug];
    return TotalSongs;
  }, []);

  const title = useMemo(() => {
    if (slug === undefined) return "Todos los cantos";
    if (isStage(slug)) return stageLang[slug];
  }, []);

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

  return (
    <SafeAreaView edges={["left", "right", "top"]} style={styles.container}>
      <TopBar
        headerHidden={headerHidden}
        title={title}
        right={<ButtonIcon icon="ellipsis" onPress={() => {}} />}
      />
      <MemoSearchFlatList
        title={title}
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
    backgroundColor: colors.backgroundSecondary,
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
