import { ButtonIcon, Icon } from "@/components";
import { colors, fonts, radius, spacing, typography } from "@/themes";
import { router, Tabs } from "expo-router";
import { NativeTabs } from "expo-router/build/native-tabs";
import { BottomTabBarButtonProps } from "expo-router/build/react-navigation/bottom-tabs";
import { Pressable, useWindowDimensions, View } from "react-native";

export default function TabsLayout() {
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarPosition: isLandscape ? "left" : "bottom",
        tabBarShowLabel: !isLandscape,
        tabBarStyle: {
          minWidth: 64,
          backgroundColor: colors.backgroundSecondary,
          borderColor: colors.border,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.medium,
          fontSize: typography.xxs,
        },
        tabBarButton: TabBarButton,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.foregroundSecondary,
        tabBarActiveBackgroundColor: colors.backgroundSecondary,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Índice",
          tabBarIcon: ({ color }) => <Icon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Buscar",
          sceneStyle: { backgroundColor: colors.background },
          tabBarIcon: ({ color }) => <Icon name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Preferencias",
          sceneStyle: { backgroundColor: colors.background },
          tabBarIcon: ({ color }) => <Icon name="settings" color={color} />,
        }}
      />
    </Tabs>
  );
}

const TabBarButton = ({
  children,
  onPress,
  style,
}: BottomTabBarButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        style,
        pressed && { backgroundColor: colors.pressed },
      ]}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
};
