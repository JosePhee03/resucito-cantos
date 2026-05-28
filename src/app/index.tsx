import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import { colors, fonts, radius, spacing, typography } from "@/themes";
import { SectionIndex } from "@/components/home";
import Icon from "@/components/Icon";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />
        <View style={styles.content}>
          <View style={{ gap: spacing.sm }}>
            <Text style={styles.contentTitle}>Índice</Text>
            <ButtonSearch />
          </View>
          <SectionIndex />
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

function ButtonSearch() {
  return (
    <Pressable
      onPress={() => router.push("/search")}
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
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceSecondary,
    position: "relative",
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
    padding: spacing.md,
  },
  header: {
    height: 64,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  contentTitle: {
    fontFamily: fonts.bold,
    fontSize: typography.xl,
    color: colors.text,
  },
  headerTitle: {
    fontFamily: fonts.bold,
    fontSize: typography.xxl,
    color: colors.primary,
  },
});
