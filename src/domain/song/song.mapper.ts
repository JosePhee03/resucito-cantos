import { songSchema, songsSchema } from "./song.schema";
import { Song } from "./song";

export function toSong(data: any): Song {
  try {
    const song = songSchema.parse(data);
    return song;
  } catch (error) {
    throw Error("ERROR DE TIPEO");
  }
}

export function toSongs(data: any[]): Song[] {
  try {
    const songs = songsSchema.parse(data);
    return songs;
  } catch (error) {
    throw Error("ERROR DE TIPEO");
  }
}
