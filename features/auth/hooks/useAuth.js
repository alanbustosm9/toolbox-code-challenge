import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  login as loginAction,
  logout as logoutAction,
} from "../store/authSlice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const loading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.error);

  return {
    token,
    loading,
    error,
    login: () => dispatch(loginAction()),
    logout: () => dispatch(logoutAction()),
  };
}
