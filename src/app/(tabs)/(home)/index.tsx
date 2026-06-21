import { useMemo, useRef } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Edges, SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";

import { Stage } from "@/domain/song";
import { colors, fonts, spacing, typography, CONSTANT } from "@/themes";
import { useOrientation } from "@/hooks/useOrientation";
import { SectionIndex } from "@/components/home";

export default function HomeScreen() {
  const isLandscape = useOrientation();
  const navigationLock = useRef(false);

  useFocusEffect(() => {
    navigationLock.current = false;
  });

  const handleNavigationSearch = (stage?: Stage) => {
    if (navigationLock.current) return;
    navigationLock.current = true;
    router.push(`/songs/${stage}`);
  };

  const edges = useMemo<Edges>(() => {
    return isLandscape ? ["bottom", "right", "top"] : ["left", "right", "top"];
  }, [isLandscape]);

  return (
    <SafeAreaView edges={edges} style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.headerContent}>
          <Text style={styles.contentTitle}>Índice</Text>
        </View>
        <SectionIndex onPressItem={handleNavigationSearch} />
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
  container: {},
  section: {},
  header: {
    height: CONSTANT.HEADER,
    paddingHorizontal: spacing.md,
    justifyContent: "center",
  },
  headerContent: {
    paddingHorizontal: spacing.md,
    height: CONSTANT.HEADER + spacing.sm,
    paddingBottom: spacing.sm,
    justifyContent: "flex-end",
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
