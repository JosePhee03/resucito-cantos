import { spacing } from "@/themes";
import { ButtonIcon } from "@/ui/components";
import { StyleSheet, View } from "react-native";

export default function NavigationButtons() {
  return (
    <View style={styles.navigationButtons}>
      <ButtonIcon icon="search" text="Buscar" />
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
