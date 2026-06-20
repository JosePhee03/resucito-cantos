import { useMemo, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Edges, SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";

import { colors, fonts, spacing, typography, CONSTANT } from "@/themes";
import { Stage } from "@/domain/song";
import { SectionIndex } from "@/components/home";
import { SearchBar } from "@/components";
import { useOrientation } from "@/hooks/useOrientation";

export default function HomeScreen() {
  const isLandscape = useOrientation();
  const navigationLock = useRef(false);

  useFocusEffect(() => {
    navigationLock.current = false;
  });

  const handleNavigationSearch = (stage?: Stage) => {
    if (navigationLock.current) return;
    navigationLock.current = true;
    router.push({ pathname: "/search", params: { stage } });
  };

  const handleNavigationSearchModal = () => {
    if (navigationLock.current) return;
    navigationLock.current = true;
    router.push("/search-modal");
  };

  const edges = useMemo<Edges>(() => {
    return isLandscape ? ["bottom", "right", "top"] : ["left", "right", "top"];
  }, [isLandscape]);

  return (
    <SafeAreaView edges={edges} style={styles.container}>
      <Header />
      <ScrollView>
        <View
          style={{
            paddingHorizontal: spacing.md,
            paddingTop: spacing.sm,
          }}
        >
          <Text style={styles.contentTitle}>Índice</Text>
        </View>
        <View
          style={{
            paddingVertical: spacing.sm,
            paddingHorizontal: spacing.md,
          }}
        >
          <SearchBar editable={false} onPress={handleNavigationSearchModal} />
        </View>
        <View style={styles.content}>
          <SectionIndex onPressItem={handleNavigationSearch} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Resucitó</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    gap: spacing.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  header: {
    height: CONSTANT.HEADER,
    paddingHorizontal: spacing.md,
    justifyContent: "center",
  },
  contentTitle: {
    fontFamily: fonts.bold,
    fontSize: typography.xl,
    color: colors.text,
  },
  headerTitle: {
    fontFamily: fonts.bold,
    fontSize: typography.xl,
    color: colors.primary,
  },
});
