import { ENDPOINTS, apiClient, clearToken, getToken, isTokenValid, saveToken } from "@/lib";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (_, { rejectWithValue }) => {
    try {
      const data = await apiClient.post(
        ENDPOINTS.AUTH,
        { sub: "ToolboxMobileTest" },
        { requiresAuth: false },
      );
      await saveToken(data.token);
      return data.token;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await clearToken();
});

export const initializeSession = createAsyncThunk(
  "auth/initializeSession",
  async () => {
    const valid = await isTokenValid();
    if (!valid) {
      await clearToken();
      return null;
    }
    return getToken();
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
      })
      .addCase(initializeSession.fulfilled, (state, action) => {
        state.token = action.payload;
      });
  },
});

export default authSlice.reducer;
