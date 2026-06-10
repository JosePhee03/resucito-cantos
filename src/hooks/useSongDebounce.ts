import { useEffect, useMemo, useState } from "react";

import { useSongStore } from "@/store/song.store";

export default function useSongDebounce(
  query: string,
  stage?: string,
  delay = 300,
) {
  const { filteredSongs } = useSongStore.getState();
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

  return {
    songs,
    loading: query !== debouncedQuery,
  };
}
