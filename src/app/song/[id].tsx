import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";

import { TopBar } from "@/components";
import { colors, fonts, spacing, typography } from "@/themes";
import { Song, toSong } from "@/domain/song";
import songs from "@/data/es_2019_v2.json";

export default function SongScreen() {
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const song = songs.find((s) => s.id === id);

  return (
    <View
      style={{
        ...styles.container,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View style={{ ...styles.header, paddingTop: insets.top }}>
        <TopBar title={song?.title ?? ""} />
      </View>
      {song !== undefined ? (
        <Content song={toSong(song)} />
      ) : (
        <Text>NO ENCONTRADO</Text>
      )}
    </View>
  );
}

type ContentProps = {
  song: Song;
};

function Content({ song }: ContentProps) {
  const { page, title, subtitle, capo, lyric } = song;
  return (
    <ScrollView style={styles.content}>
      <View style={styles.spacingSm}>
        <Text style={styles.page}>{page}</Text>
        <View>
          <Text style={styles.title}>{title.toUpperCase()}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <Text style={styles.capo}>{`Cejilla ${capo}° traste`}</Text>
      </View>
      <View style={{ paddingVertical: spacing.md }}>
        <LyricSource source={lyric} />
      </View>
    </ScrollView>
  );
}

function LyricSource({ source }: { source: string }) {
  const lyricNode = lyricParser(source);

  return (
    <View style={{ paddingBottom: 64 }}>
      {lyricNode.map((section, i) => (
        <View key={i}>
          {section.children.map((line, j) => (
            <View key={j}>
              <LyricLineView lyricLine={line.children} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function LyricLineView({ lyricLine }: { lyricLine: LyricSegment[] }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {lyricLine.map((lyric, index) => {
        switch (lyric.type) {
          case "chord":
            return (
              <Text
                key={index}
                style={{ color: colors.primary, fontFamily: fonts.medium }}
              >
                {lyric.value}
              </Text>
            );
          default:
            return (
              <Text
                key={index}
                style={{
                  fontFamily:
                    lyric.type === "chorus" ? fonts.semibold : fonts.medium,
                  fontSize: typography.md,
                  color:
                    lyric.type === "label" ? colors.textTertiary : colors.text,
                }}
              >
                {lyric.value}
              </Text>
            );
        }
      })}
    </View>
  );
}

export type LyricNode = { type: "section"; children: LyricLine[] };

export type LyricLine = { type: "line"; children: LyricSegment[] };

export type LyricSegment =
  | { type: "label"; value: string }
  | { type: "chord"; value: string }
  | { type: "chorus"; value: string }
  | { type: "text"; value: string };

export function lyricParser(lyric: string) {
  const sections = lyric.split("\n\n");
  const songSection: LyricNode[] = [];

  for (const section of sections) {
    const lines = section.split("\n");
    const lineParser: LyricLine[] = lines.map((l) => ({
      type: "line",
      children: parseLyricLine(l),
    }));
    songSection.push({ type: "section", children: lineParser });
  }

  return songSection;
}

const parseLyricLine = (input: string) => {
  const chordRegex =
    /([A-Z]\.)|(^(?:\s*(?:[A-G](?:#|b)?(?:m|maj|min|dim|aug|sus\d*)?\d*\/?[A-G]?(?:#|b)?\d*)\s*)+$)|([^[\]]+)/g;
  const regex = /([A-Z]\.)|\[([^\]]+)\]|([^[\]]+)/g;
  const regexUppercase = /^[A-Z\s\.\,\!\¡\Á\É\Í\Ó\Ú\Ñ\#0-9]*$/g;
  const segments: LyricSegment[] = [];

  for (const match of input.matchAll(chordRegex)) {
    const [, label, chord, text] = match;

    if (label) {
      segments.push({ type: "label", value: label });
    } else if (chord) {
      segments.push({ type: "chord", value: chord });
    } else if (text) {
      if (regexUppercase.test(text)) {
        segments.push({ type: "chorus", value: text });
      } else {
        segments.push({ type: "text", value: text });
      }
    }
  }

  return segments;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    borderColor: colors.border,
    borderBottomWidth: 1,
    backgroundColor: colors.background,
  },
  content: {
    backgroundColor: colors.surface,
    padding: spacing.md,
  },
  spacingLg: { gap: spacing.lg },
  spacingSm: {
    gap: spacing.sm,
  },
  spacingXs: {
    gap: spacing.sm,
  },
  page: {
    fontFamily: fonts.semibold,
    fontSize: typography.lg,
    color: colors.textSecondary,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: typography.lg,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.medium,
    fontSize: typography.md,
    color: colors.textTertiary,
  },
  capo: {
    fontFamily: fonts.regular,
    fontSize: typography.xs,
    color: colors.text,
  },
});
