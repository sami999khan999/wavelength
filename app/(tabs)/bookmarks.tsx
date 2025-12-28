import { Loader } from "@/components/Loader";
import PostsModal from "@/components/PostsModal";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/feed.styles";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export type PostData = {
  _id: Id<"posts">;
  imageUrl: string;
  caption?: string;
  likes: number;
  comments: number;
  _creationTime: number;
  isLiked: boolean;
  isBookmarked: boolean;
  author: {
    _id: string;
    username: string;
    image: string;
  };
};

export default function Bookmarks() {
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
  const bookmarkedPosts = useQuery(api.posts.getBookmarkedPosts);

  if (bookmarkedPosts === undefined) return <Loader />;
  if (bookmarkedPosts.length === 0) return <NoBookmarksFound />;

  const handlePostPress = (post: PostData) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bookmarks</Text>
      </View>

      {/* POSTS */}
      <ScrollView
        contentContainerStyle={{
          padding: 8,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {bookmarkedPosts.map((post) => {
          if (!post) return null;
          return (
            <TouchableOpacity
              key={post._id}
              style={{ width: "33.33%", padding: 1 }}
              onPress={() => handlePostPress(post)}
            >
              <Image
                source={post.imageUrl}
                style={{ width: "100%", aspectRatio: 1 }}
                contentFit="cover"
                transition={200}
                cachePolicy="memory-disk"
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <PostsModal
        selectedPost={selectedPost}
        closeModal={closeModal}
        title="Bookmark Post"
        redirect={() => {
          setSelectedPost(null);
        }}
      />
    </View>
  );
}

function NoBookmarksFound() {
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
        name="bookmark-outline"
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
        No bookmarks yet
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: COLORS.grey,
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        Start bookmarking posts to see them here
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
