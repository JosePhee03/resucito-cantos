import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/themes";
import { Song } from "@/domain/song";
import { useSongStore } from "@/store/song.store";
import { TopBar } from "@/components";
import SongContent from "@/components/song/SongContent";

export default function SongScreen() {
  const { id } = useLocalSearchParams();
  const songs = useSongStore.getState().songs;
  const [song, setSong] = useState<Song | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setSong(getSong());
      setLoading(false);
    });
    return () => {
      cancelAnimationFrame(id);
    };
  }, []);

  const getSong = useCallback(() => songs.find((s) => s.id === id), []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TopBar />
      </View>
      <SongContent song={song} loading={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    backgroundColor: colors.surface,
  },
});
