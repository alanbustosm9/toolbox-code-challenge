import "react-native-gesture-handler/jestSetup";

jest.mock("expo-secure-store", () => ({
  setItemAsync: jest.fn(() => Promise.resolve()),
  getItemAsync: jest.fn(() => Promise.resolve(null)),
  deleteItemAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock("expo-router", () => ({
  router: { replace: jest.fn() },
  Stack: ({ children }) => children,
  Redirect: () => null,
}));
