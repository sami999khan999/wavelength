import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/notifications.styles";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { formatDistanceToNow } from "date-fns";
import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type NotificationWithSender = Doc<"notifications"> & {
  sender: {
    _id: Id<"users">;
    username: string;
    image: string;
  };
  post: {
    _id: Id<"posts">;
    imageUrl: string;
    caption?: string;
    userId: Id<"users">;
    likes: number;
    comments: number;
    _creationTime: number;
  } | null;
  comment?: string;
};

interface NotificationItemProps {
  notification: NotificationWithSender;
}

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  const { user } = useUser();

  const currentUser = useQuery(api.users.getUserByClerkId, {
    clerkId: user?.id as string,
  });

  return (
    <View style={styles.notificationItem}>
      <View style={styles.notificationContent}>
        <Link
          href={{
            pathname:
              currentUser?._id === notification.receiverId
                ? "/(tabs)/profile"
                : "/user/[id]",
            params: { id: notification.sender._id },
          }}
          asChild
        >
          <TouchableOpacity style={styles.avatarContainer}>
            <Image
              source={notification.sender.image}
              style={styles.avatar}
              contentFit="cover"
              transition={200}
            />
            <View style={styles.iconBadge}>
              {notification.type === "like" ? (
                <Ionicons name="heart" size={14} color={COLORS.primary} />
              ) : notification.type === "follow" ? (
                <Ionicons name="person-add" size={14} color="#8B5CF6" />
              ) : (
                <Ionicons name="chatbubble" size={14} color="#3B82F6" />
              )}
            </View>
          </TouchableOpacity>
        </Link>
        <View style={styles.notificationInfo}>
          <Link
            href={{
              pathname:
                currentUser?._id === notification.receiverId
                  ? "/(tabs)/profile"
                  : "/user/[id]",
              params: { id: notification.sender._id },
            }}
            asChild
          >
            <TouchableOpacity>
              <Text style={styles.username}>
                {notification.sender.username}
              </Text>
            </TouchableOpacity>
          </Link>

          <Text style={styles.action}>
            {notification.type === "follow"
              ? "started following you"
              : notification.type === "like"
                ? "liked your post"
                : `commented: "${notification.comment}"`}
          </Text>
          <Text style={styles.timeAgo}>
            {formatDistanceToNow(notification._creationTime, {
              addSuffix: true,
            })}
          </Text>
        </View>
      </View>

      {notification.post && (
        <Image
          source={notification.post.imageUrl}
          style={styles.postImage}
          contentFit="cover"
          transition={200}
        />
      )}
    </View>
  );
}
