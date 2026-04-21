import { Redirect } from "expo-router";
import { useAppSelector } from "../store/hooks";

export default function Index() {
  const token = useAppSelector((state) => state.auth.token);

  if (token) {
    return <Redirect href="/(private)/carousel" />;
  }

  return <Redirect href="/(auth)/login" />;
}
