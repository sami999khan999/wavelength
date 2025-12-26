import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/auth.styles";
import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Login() {
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy: "oauth_google",
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (err: any) {
      console.error("SSO Error:", err);

      if (err.errors?.[0]?.message) {
        console.error("Clerk error:", err.errors[0].message);
      }

      if (err.code === "user_cancelled") {
        console.log("User cancelled SSO");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          <Ionicons name="leaf-outline" size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.appName}>wavelength</Text>
        <Text style={styles.tagline}>The best way to manage your time</Text>
      </View>

      <View style={styles.illustrationContainer}>
        <Image
          source={require("../../assets/images/auth-bg-2.png")}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>

      <View style={styles.loginSection}>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
          activeOpacity={0.9}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={20} color={COLORS.surface} />
          </View>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>
          By continuing, you agree to our Terms and Privacy Policy
        </Text>
      </View>
    </View>
  );
}
