import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

export default function RootLayout() {
  const { colorScheme } = useContext(ThemeContext);

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : 'white',
          borderTopWidth: 0,
          height: 64, /* px */
        },
        tabBarIconStyle: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="th-list"
              size={24}
              color={color}
              focused={focused}
            />
          )
        }}
      />
      <Tabs.Screen name="settings"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="gear"
              size={24}
              color={color}
              focused={focused}
            />
          )
        }}
      />
    </Tabs>
  );
}
