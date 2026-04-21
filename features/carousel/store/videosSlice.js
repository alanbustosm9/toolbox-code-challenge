import { ENDPOINTS, apiClient } from "@/lib";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  carousels: [],
  loading: false,
  error: null,
};

export const fetchVideos = createAsyncThunk(
  "videos/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await apiClient.get(ENDPOINTS.DATA);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.carousels = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default videosSlice.reducer;
