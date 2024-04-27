import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInAPI, signUpAPI } from "../util";

export const signIn = createAsyncThunk("auth/signIn", async (credentials) => {
  try {
    const response = await signInAPI(credentials);
    localStorage.setItem("token", response.token);
    return response.user;
  } catch (error) {
    throw error;
  }
});

export const signUp = createAsyncThunk("auth/signUp", async (userData) => {
  try {
    const response = await signUpAPI(userData);
    localStorage.setItem("token", response.token);
    return response.user;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  signInLoading: "idle",
  signUpLoading: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.signInLoading = "pending";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
        state.signInLoading = "idle";
      })
      .addCase(signUp.pending, (state) => {
        state.signUpLoading = "pending";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
        state.signUpLoading = "idle";
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.error.message;
          state.signInLoading = "idle";
          state.signUpLoading = "idle";
        }
      );
  },
});

export const { signOut } = authSlice.actions;

export default authSlice.reducer;
