import { clearToken, getToken, isTokenValid } from "./tokenManager";

async function request(url, options = {}) {
  const { requiresAuth = true, ...fetchOptions } = options;

  fetchOptions.headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    ...fetchOptions.headers,
  };

  if (requiresAuth) {
    const valid = await isTokenValid();

    if (!valid) {
      await clearToken();
      throw new Error("TOKEN_EXPIRED");
    }

    const token = await getToken();

    fetchOptions.headers = {
      ...fetchOptions.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  return response.json();
}

export const apiClient = {
  get: (url, options) => request(url, { ...options, method: "GET" }),
  post: (url, body, options) =>
    request(url, { ...options, method: "POST", body: JSON.stringify(body) }),
};
