import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useFocusEffect } from "expo-router";

import { colors, fonts, radius, spacing, typography, CONSTANT } from "@/themes";
import { Stage } from "@/domain/song";
import { SectionIndex } from "@/components/home";
import { Icon } from "@/components";
import { useRef } from "react";

export default function HomeScreen() {
  const navigationLock = useRef(false);

  useFocusEffect(() => {
    navigationLock.current = false;
  });

  const handleNavigationSearch = (stage?: Stage) => {
    if (navigationLock.current) return;
    navigationLock.current = true;
    router.push({ pathname: "/search", params: { stage } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView stickyHeaderIndices={[1]}>
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
          <ButtonSearch onPress={handleNavigationSearch} />
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

function ButtonSearch({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      onPress={() => onPress()}
      style={({ pressed }) => [
        styles.buttonSearch,
        pressed && styles.buttonPressed,
      ]}
    >
      <Icon name="search" size={24} color={colors.foregroundSecondary} />
      <Text style={styles.buttonSearchText}>Buscar cantos</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonSearch: {
    height: CONSTANT.SEARCHBAR,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceSecondary,
  },
  buttonSearchText: {
    fontFamily: fonts.regular,
    fontSize: typography.md,
    color: colors.foregroundSecondary,
  },
  buttonPressed: {
    backgroundColor: colors.pressed,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
