import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { spacing } from "@/themes";
import { ButtonIcon } from "@/components";

export default function NavigationButtons() {
  const router = useRouter();

  return (
    <View style={styles.navigationButtons}>
      <ButtonIcon
        onPress={() => router.push("/search")}
        icon="search"
        text="Buscar"
      />
      <ButtonIcon icon="album" text="Álbum" />
      <ButtonIcon icon="plus" text="Crear" />
      <ButtonIcon icon="settings" text="Opciones" />
    </View>
  );
}

const styles = StyleSheet.create({
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing.md,
  },
});
