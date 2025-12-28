import { PostData } from "@/app/(tabs)/bookmarks";
import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/feed.styles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Post from "./Post";

export default function PostsModal({
  selectedPost,
  closeModal,
  title,
  redirect,
}: {
  selectedPost: PostData | null;
  closeModal: () => void;
  title: string;
  redirect: () => void;
}) {
  return (
    <Modal
      visible={!!selectedPost}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={closeModal}>
            <Ionicons name="chevron-down" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{title}</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={{ flex: 1 }}>
          {selectedPost && (
            <Post
              redirect={redirect}
              post={{
                ...selectedPost,
                author: {
                  _id: selectedPost.author._id?.toString() || "",
                  username: selectedPost.author.username || "",
                  image: selectedPost.author.image || "",
                },
              }}
              key={selectedPost._id}
            />
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}
