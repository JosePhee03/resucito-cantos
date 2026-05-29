import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";
import { create } from "zustand/react";

import { Song, SongsByStage, Stage } from "@/domain/song/song";
import { toSongs } from "@/domain/song/song.mapper";
import SONGS_STORAGE from "@/data/es_2019_v2.json";

interface SongStoreState {
  songs: Song[];
  songsByStage: SongsByStage;
  initialized: boolean;
  totalSongsByStage: Record<Stage, number>;
}
interface SongStoreFunction {
  initialize: () => void;
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
    (set) => ({
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
    }),
    {
      name: "songs-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
