import { StyleSheet, FlatList, Text, Keyboard } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { colors, fonts, typography } from "@/themes";
import { toSongs } from "@/mappers/song.mapper";
import { SearchTopBar, SongItem } from "@/components/search";
import { SearchBar } from "@/components";

import songs from "@/data/es_2019_v2.json";
import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const keyboardHeight = useSharedValue(0);

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", (e) => {
      keyboardHeight.value = e.endCoordinates.height;
    });

    const hide = Keyboard.addListener("keyboardDidHide", () => {
      keyboardHeight.value = 0;
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: -keyboardHeight.value,
        },
      ],
      bottom: insets.bottom,
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <SearchTopBar title="Todos los cantos">
        <SearchBar />
      </SearchTopBar>

      <FlatList
        style={{ backgroundColor: colors.surface }}
        scrollEventThrottle={16}
        data={toSongs(songs)}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <SongItem song={item} index={index} size={songs.length} />
        )}
      />
      <Animated.View
        style={[
          {
            position: "absolute",
            left: 0,
            right: 0,
            height: 36,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.background,
            borderTopWidth: 1,
            borderColor: colors.border,
            zIndex: 4,
          },
          animatedStyle,
        ]}
      >
        <Text
          style={{
            fontFamily: fonts.medium,
            fontSize: typography.sm,
            color: colors.foregroundSecondary,
          }}
        >
          {`${songs.length}`} Cantos
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: colors.background,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: typography.xl,
    color: colors.text,
  },
});
