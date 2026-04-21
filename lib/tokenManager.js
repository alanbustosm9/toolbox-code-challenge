import { secureStorage } from "./secureStore";

const TOKEN_KEY = "auth_token";

function decodePayload(token) {
  const payload = token.split(".")[1];
  return JSON.parse(atob(payload));
}

export async function saveToken(token) {
  await secureStorage.set(TOKEN_KEY, token);
}

export async function getToken() {
  return secureStorage.get(TOKEN_KEY);
}

export async function clearToken() {
  await secureStorage.delete(TOKEN_KEY);
}

export async function isTokenValid() {
  const token = await getToken();
  if (!token) return false;

  try {
    const { expireDate } = decodePayload(token);
    return Date.now() < new Date(expireDate).getTime();
  } catch {
    return false;
  }
}
