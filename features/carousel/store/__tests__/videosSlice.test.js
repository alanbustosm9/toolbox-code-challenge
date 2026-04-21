import { configureStore } from "@reduxjs/toolkit";
import carouselReducer, { fetchVideos } from "../videosSlice";

jest.mock("@/lib", () => ({
  apiClient: {
    get: jest.fn(),
  },
  ENDPOINTS: {
    DATA: "https://echo-serv.tbxnet.com/v1/mobile/data",
  },
}));

const makeStore = () =>
  configureStore({ reducer: { carousel: carouselReducer } });

describe("videosSlice", () => {
  let store;

  beforeEach(() => {
    store = makeStore();
    jest.clearAllMocks();
  });

  it("estado inicial tiene carousels vacío, loading false, error null", () => {
    const state = store.getState().carousel;

    expect(state.carousels).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("pone loading=true mientras se carga", () => {
    const { apiClient } = require("@/lib");
    apiClient.get.mockReturnValue(new Promise(() => {}));

    store.dispatch(fetchVideos());

    expect(store.getState().carousel.loading).toBe(true);
  });

  it("guarda carousels y loading=false al completar con éxito", async () => {
    const mockData = [
      { title: "Trending", type: "thumbnail", items: [] },
      { title: "Featured", type: "poster", items: [] },
    ];
    const { apiClient } = require("@/lib");
    apiClient.get.mockResolvedValue(mockData);

    await store.dispatch(fetchVideos());

    const state = store.getState().carousel;
    expect(state.carousels).toEqual(mockData);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("guarda error y loading=false cuando falla la petición", async () => {
    const { apiClient } = require("@/lib");
    apiClient.get.mockRejectedValue(new Error("Network error"));

    await store.dispatch(fetchVideos());

    const state = store.getState().carousel;
    expect(state.error).toBe("Network error");
    expect(state.loading).toBe(false);
    expect(state.carousels).toEqual([]);
  });

  it("llama al endpoint correcto", async () => {
    const { apiClient, ENDPOINTS } = require("@/lib");
    apiClient.get.mockResolvedValue([]);

    await store.dispatch(fetchVideos());

    expect(apiClient.get).toHaveBeenCalledWith(ENDPOINTS.DATA);
  });
});
