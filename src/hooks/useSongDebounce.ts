import { useEffect, useState } from "react";

import { Song } from "@/domain/song";
import { useSongStore } from "@/store/song.store";

export default function useSongDebounce(
  query: string,
  stage?: string,
  delay = 300,
) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const { filteredSongs } = useSongStore.getState();

  useEffect(() => {
    if (!query) {
      return setSongs(filteredSongs(query, stage));
    }
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
      setSongs(filteredSongs(query, stage));
    }, delay);

    return () => clearTimeout(timeout);
  }, [query, stage, delay]);

  return {
    songs,
    loading,
  };
}
