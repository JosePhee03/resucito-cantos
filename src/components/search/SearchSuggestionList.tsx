import { colors, CONSTANT, fonts, spacing, typography } from "@/themes";
import { FlatList, Pressable, Text, View } from "react-native";
import Icon from "../Icon";

type SearchSuggestionListProps = {
  onPressItem: (suggestion: string) => void;
};

const suggestions: string[] = ["maría", "pascua", "señor", "pecado"];

export default function SearchSuggestionList({
  onPressItem,
}: SearchSuggestionListProps) {
  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      keyboardShouldPersistTaps="handled"
      data={suggestions}
      ListHeaderComponent={
        <View
          style={{
            height: CONSTANT.SECTION_HEADER,
            justifyContent: "center",
            paddingHorizontal: spacing.md,
          }}
        >
          <Text
            style={{
              fontFamily: fonts.medium,
              fontSize: typography.sm,
              color: colors.textSecondary,
            }}
          >
            Búsquedas recientes
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() => onPressItem(item)}
          style={({ pressed }) => [
            {
              flexDirection: "row",
              height: CONSTANT.SECTION_ROW,
              alignItems: "center",
              gap: spacing.sm,
              paddingHorizontal: spacing.md,
            },
            pressed && { backgroundColor: colors.pressed },
          ]}
        >
          <Icon name="history" size={16} color={colors.foreground} />
          <Text
            style={{
              fontFamily: fonts.regular,
              fontSize: typography.md,
              color: colors.text,
            }}
          >
            {item}
          </Text>
        </Pressable>
      )}
    />
  );
}
