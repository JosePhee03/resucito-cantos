import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import { colors, CONSTANT, fonts, radius, spacing, typography } from "@/themes";
import { Song } from "@/domain/song";
import { SongItemMemo } from "../songs/SongItem";
import Icon from "../Icon";
import { ButtonIcon } from "../Button";

type SearchListProps = {
  songs: Song[];
  onPressItem: (id: string) => void;
};

export default function SearchList({ songs, onPressItem }: SearchListProps) {
  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      ListHeaderComponent={
        <>
          <View
            style={{
              paddingHorizontal: spacing.md,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderColor: colors.border,
            }}
          >
            <View
              style={{
                height: CONSTANT.HEADER,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontFamily: fonts.medium,
                  fontSize: typography.sm,
                  color: colors.textTertiary,
                }}
              >{`${songs.length} Resultados`}</Text>
              <ButtonIcon icon="ellipsis" onPress={() => {}} />
            </View>
          </View>
        </>
      }
      ItemSeparatorComponent={<View style={styles.separator} />}
      keyboardShouldPersistTaps="handled"
      data={songs}
      renderItem={({ item }) => (
        <SongItemMemo song={item} key={item.id} onPress={onPressItem} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginRight: spacing.md,
    marginLeft: spacing.lg + CONSTANT.PAGE_BADGE,
  },
});
