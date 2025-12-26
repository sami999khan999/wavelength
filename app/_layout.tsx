import InitialLayout from "@/components/InitialLayout";
import { COLORS } from "@/constants/theme";
import ClerkConvexProvider from "@/providers/clerkConvexProvider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <ClerkConvexProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
          <InitialLayout />
        </SafeAreaView>
      </SafeAreaProvider>
    </ClerkConvexProvider>
  );
}
