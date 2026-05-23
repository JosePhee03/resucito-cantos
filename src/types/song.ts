export interface Song {
  id: string;
  page: number;
  title: string;
  subtitle: string;
  capo: number;
  stage: Stage;
  categories: Category[];
  lyric: string;
  chords: Chord[];
  tone: Chord;
}

export type Stage =
  | "precatechumenate"
  | "liturgy"
  | "catechumenate"
  | "election";

export type Category =
  | "communion"
  | "easter"
  | "entrance"
  | "pentecost"
  | "lent"
  | "lutes_and_vespers"
  | "exit"
  | "christmas"
  | "childrens_song"
  | "peace_and_offerings"
  | "fraction_of_bread"
  | "signing_to_the_virgin"
  | "advent";

export type Chord =
  | "Am"
  | "A7"
  | "Dm9"
  | "Fmaj7"
  | "E"
  | "F"
  | "Dm"
  | "Gm"
  | "Bb7"
  | "E7"
  | "G"
  | "Bb"
  | "A"
  | "Bm"
  | "Em"
  | "F#"
  | "F#m"
  | "C#"
  | "C7"
  | "D"
  | "C"
  | "B"
  | "G7"
  | "Em6"
  | "B7"
  | "D7"
  | "G#"
  | "C#m"
  | "C#7"
  | "A#"
  | "F7"
  | "Am6"
  | "Cm"
  | "Dm5";
