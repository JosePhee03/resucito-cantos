import { StyleSheet, View } from "react-native";

import { colors, spacing } from "@/themes";
import TopBar from "../TopBar";

type SearchTopBarProps = {
  title: string;
  children?: React.JSX.Element | React.JSX.Element[];
};

export default function SearchTopBar({ title, children }: SearchTopBarProps) {
  return (
    <View style={styles.header}>
      <TopBar title={title} />
      <View style={styles.searchContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    paddingBottom: spacing.sm,
  },
  searchContainer: {
    paddingHorizontal: spacing.md,
  },
});
