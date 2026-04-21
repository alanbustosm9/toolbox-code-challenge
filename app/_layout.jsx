import { ReduxProvider } from "@/providers";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ReduxProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ReduxProvider>
  );
}
