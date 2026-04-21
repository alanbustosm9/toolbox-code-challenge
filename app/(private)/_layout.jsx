import { initializeSession, logout as logoutAction } from "@/features/auth/store/authSlice";
import { isTokenValid } from "@/lib/tokenManager";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import { useEffect } from "react";

export default function PrivateLayout() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(initializeSession());
  }, [dispatch]);

  useEffect(() => {
    async function checkToken() {
      const valid = await isTokenValid();
      if (!valid) {
        dispatch(logoutAction());
        router.replace("/(auth)/login");
      }
    }

    checkToken();

    const interval = setInterval(checkToken, 30000); // chequea cada 30 segundos para redirigir si el token expira mientras el usuario está activo

    return () => clearInterval(interval);
  }, [token, dispatch]);

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="carousel"
        options={{
          title: "Carousel",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="play-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
