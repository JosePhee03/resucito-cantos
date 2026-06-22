import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";

import { colors, fonts, spacing, typography } from "@/themes";
import { isStage, Stage } from "@/domain/song";
import { useSongStore } from "@/store/song.store";
import { ButtonIcon, TopBar } from "@/components";
import { SongSectionList } from "@/components/songs";

type Params = {
  slug?: string;
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
    if (slug && isStage(slug)) return songsByStage[slug];
    return TotalSongs;
  }, []);

  const title = useMemo(() => {
    if (slug && isStage(slug)) return stageLang[slug];
    return "Todos los cantos";
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

  const handleNavigationSearch = useCallback(() => {
    if (navigationLock.current) return;
    navigationLock.current = true;
    let stage: Stage | undefined;
    if (slug && isStage(slug)) stage = slug;
    router.push({
      pathname: "/search",
      params: { stage },
    });
  }, []);

  const handleNavigationSettings = useCallback(() => {
    if (navigationLock.current) return;
    navigationLock.current = true;
    router.push("/settings");
  }, []);

  return (
    <SafeAreaView edges={["left", "right", "top"]} style={styles.container}>
      <TopBar
        headerHidden={headerHidden}
        title={title}
        right={
          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            <ButtonIcon icon="search" onPress={handleNavigationSearch} />
            <ButtonIcon icon="ellipsis" onPress={handleNavigationSettings} />
          </View>
        }
      />
      <SongSectionList
        title={title}
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
