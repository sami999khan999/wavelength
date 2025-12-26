import { useAuth } from "@clerk/clerk-expo";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function index() {
  const { signOut } = useAuth();
  return (
    <View>
      <TouchableOpacity onPress={() => signOut()}>
        <Text style={{ color: "black" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
