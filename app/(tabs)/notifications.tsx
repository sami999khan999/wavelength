import { Loader } from "@/components/Loader";
import NotificationItem from "@/components/NotificationItem";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/notifications.styles";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function Notifications() {
  const notifications = useQuery(api.notification.getNotifications);

  if (notifications === undefined) return <Loader />;
  if (notifications.length === 0) return <NoNotificationsFound />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

function NoNotificationsFound() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: COLORS.background,
      }}
    >
      <Ionicons
        name="notifications-off-outline"
        size={64}
        color={COLORS.grey}
        style={{ marginBottom: 16 }}
      />
      <Text
        style={{
          fontSize: 18,
          color: COLORS.white,
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        No notifications yet
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: COLORS.grey,
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        When people interact with your posts, you'll see them here
      </Text>
      <TouchableOpacity
        onPress={() => router.push("/(tabs)")}
        style={{
          backgroundColor: COLORS.primary,
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 24,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons
          name="home"
          size={18}
          color={COLORS.surface}
          style={{ marginRight: 8 }}
        />
        <Text
          style={{
            color: COLORS.surface,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Go to Feed
        </Text>
      </TouchableOpacity>
    </View>
  );
}
