import { isTokenValid } from "@/lib/tokenManager";
import { useAppSelector } from "@/store/hooks";
import { Stack, router } from "expo-router";
import { useEffect } from "react";

export default function PrivateLayout() {
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    async function checkToken() {
      const valid = await isTokenValid();
      if (!valid) router.replace("/(auth)/login");
    }

    checkToken();

    const interval = setInterval(checkToken, 30000); // chequea cada 30 segundos para redirigir si el token expira mientras el usuario está activo

    return () => clearInterval(interval);
  }, [token]);

  return <Stack screenOptions={{ headerShown: false }} />;
}
