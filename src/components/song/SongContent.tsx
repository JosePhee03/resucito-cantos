import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { colors, fonts, spacing, typography } from "@/themes";
import { Song } from "@/domain/song";
import Icon from "../Icon";
import SongDetails from "./SongDetails";

type SongContentProps = {
  loading: boolean;
  song?: Song;
};

export default function SongContent({ loading, song }: SongContentProps) {
  if (loading) {
    return (
      <View style={styles.content}>
        <ActivityIndicator size="large" />
        <Text style={styles.text}>Buscando canto</Text>
      </View>
    );
  }
  if (song === undefined) {
    return (
      <View style={styles.content}>
        <Icon name="music" size={64} color={colors.foregroundSecondary} />
        <Text style={styles.text}>Canto no encontrado</Text>
      </View>
    );
  }
  return <SongDetails song={song} />;
}

const styles = StyleSheet.create({
  content: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  text: {
    fontFamily: fonts.medium,
    color: colors.foregroundSecondary,
    fontSize: typography.md,
  },
});
