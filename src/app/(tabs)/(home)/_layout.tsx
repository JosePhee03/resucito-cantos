import { colors, radius } from "@/themes";
import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
