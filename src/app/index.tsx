import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, fonts, spacing, typography } from "@/themes";
import { SectionIndex } from "@/components/home";
import { Link } from "expo-router";
import { SearchBar } from "@/components";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />
        <View style={styles.content}>
          <View style={{ gap: spacing.sm }}>
            <Text style={styles.contentTitle}>Índice</Text>
            <Link href={"/search"} asChild>
              <SearchBar editable={false} />
            </Link>
          </View>
          <SectionIndex />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Resucitó</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
