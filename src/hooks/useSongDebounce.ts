import { useEffect, useMemo, useState } from "react";

import { useSongStore } from "@/store/song.store";
import { isStage } from "@/domain/song";

export default function useSongDebounce(
  query: string,
  stage?: string,
  delay = 300,
) {
  const {
    filteredSongs,
    songs: allSongs,
    songsByStage,
  } = useSongStore.getState();
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(timeout);
  }, [query, delay]);

  const songs = useMemo(() => {
    return filteredSongs(debouncedQuery, stage);
  }, [debouncedQuery, stage]);

  const total = useMemo(() => {
    if (!stage) return allSongs.length;
    if (isStage(stage)) return songsByStage[stage].length;
    return 0;
  }, []);

  return {
    total,
    songs,
    loading: query !== debouncedQuery,
    debouncedQuery,
  };
}
