import * as SecureStore from "expo-secure-store";

export const secureStorage = {
  set: (key, value) => SecureStore.setItemAsync(key, value),
  get: (key) => SecureStore.getItemAsync(key),
  delete: (key) => SecureStore.deleteItemAsync(key),
};
