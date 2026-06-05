import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand/react";

import { isStage, toSongs, Song, SongsByStage, Stage } from "@/domain/song";
import SONGS_STORAGE from "@/data/es_2019_v2.json";

interface SongStoreState {
  songs: Song[];
  songsByStage: SongsByStage;
  initialized: boolean;
  totalSongsByStage: Record<Stage, number>;
}
interface SongStoreFunction {
  initialize: () => void;
  filteredSongs: (query: string, stage?: string) => Song[];
}

interface SongStore extends SongStoreState, SongStoreFunction {}

const INIT_SONG_STORE: SongStoreState = {
  songs: [],
  songsByStage: {
    catechumenate: [],
    election: [],
    liturgy: [],
    precatechumenate: [],
  },
  initialized: false,
  totalSongsByStage: {
    catechumenate: 0,
    election: 0,
    liturgy: 0,
    precatechumenate: 0,
  },
};

function groupSongsByStage(songs: Song[]): SongsByStage {
  return songs.reduce<SongsByStage>((acc, song) => {
    acc[song.stage].push(song);
    return acc;
  }, INIT_SONG_STORE.songsByStage);
}

function groupTotalSongsByStage(stages: SongsByStage): Record<Stage, number> {
  return Object.entries(stages).reduce((acc, [key, value]) => {
    acc[key as Stage] = value.length;
    return acc;
  }, INIT_SONG_STORE.totalSongsByStage);
}

export const useSongStore = create<SongStore>()(
  persist(
    (set, get) => ({
      ...INIT_SONG_STORE,
      initialize: () => {
        const songsStorage = toSongs(SONGS_STORAGE);
        const songsByStage = groupSongsByStage(songsStorage);
        const totalSongsByStage = groupTotalSongsByStage(songsByStage);
        set((prev) => ({
          ...prev,
          initialized: true,
          songs: songsStorage,
          totalSongsByStage,
          songsByStage,
        }));
      },
      filteredSongs: (query, stage) => {
        const { songsByStage, songs } = get();

        if (!query) {
          if (stage && isStage(stage)) {
            return songsByStage[stage];
          }
          return songs;
        }

        const lowerQuery = query.toLowerCase();

        return songs.filter((song) => song.title.toLowerCase().includes(query));
      },
    }),
    {
      name: "songs-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
