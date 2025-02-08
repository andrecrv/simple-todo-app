import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

import { ThemeProvider } from "@/context/ThemeContext"

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#1e1e1e',
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
    </ThemeProvider >
  );
}
