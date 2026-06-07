import { Text, View } from "react-native";

import { colors, fonts, typography } from "@/themes";
import { LyricToken, parseLyricSections } from "@/domain/lyric";

export default function LyricView({ lyric }: { lyric: string }) {
  const lyricSections = parseLyricSections(lyric);

  return (
    <View style={{ paddingBottom: 64 }}>
      {lyricSections.map((section, i) => (
        <View key={i}>
          {section.children.map((line, j) => (
            <View key={j}>
              <LyricLineView tokens={line.children} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function LyricLineView({ tokens }: { tokens: LyricToken[] }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {tokens.map((token, index) =>
        token.type === "chord" ? (
          <Text
            key={index}
            style={{
              color: colors.primary,
              fontFamily: fonts.medium,
            }}
          >
            {token.value}
          </Text>
        ) : (
          <Text
            key={index}
            style={{
              fontFamily:
                token.type === "chorus" ? fonts.semibold : fonts.medium,
              fontSize: typography.md,
              color: token.type === "label" ? colors.textTertiary : colors.text,
            }}
          >
            {token.value}
          </Text>
        ),
      )}
    </View>
  );
}
