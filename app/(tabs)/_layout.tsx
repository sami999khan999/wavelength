import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: COLORS.grey,
          tabBarStyle: {
            backgroundColor: "black",
            borderTopWidth: 0,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.surfaceLight,
            position: "absolute",
            elevation: 0,
            height: 40,
            paddingBottom: 8,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons size={size} color={color} name="home" />
            ),
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="bookmarks"
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="bookmark" size={size} color={color} />
            ),
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="create"
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="add-circle" size={size} color={color} />
            ),
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="notifications"
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="notifications" size={size} color={color} />
            ),
          }}
        ></Tabs.Screen>
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="person-circle" size={size} color={color} />
            ),
          }}
        ></Tabs.Screen>
      </Tabs>
    </View>
  );
}
