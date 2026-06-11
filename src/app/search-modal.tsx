import { SearchBar } from "@/components/search";
import { colors, CONSTANT, fonts, spacing, typography } from "@/themes";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchModalScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable
          onPress={router.back}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>Buscar</Text>
        </Pressable>
      </View>
      <View
        style={{ paddingHorizontal: spacing.md, paddingVertical: spacing.sm }}
      >
        <SearchBar
          loading={false}
          onCancel={() => {}}
          onChange={() => {}}
          query=""
        />
      </View>
      <View style={{ paddingHorizontal: spacing.md }}>
        <Text
          style={{
            fontFamily: fonts.semibold,
            fontSize: typography.md,
            color: colors.text,
          }}
        >
          Busquedas recientes
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    height: CONSTANT.HEADER,
  },
  button: {
    paddingHorizontal: spacing.sm,
    height: CONSTANT.BUTTON,
    justifyContent: "center",
  },
  buttonPressed: {
    opacity: 0.2,
  },
  buttonText: {
    fontFamily: fonts.medium,
    fontSize: typography.sm,
    color: colors.primary,
  },
});
