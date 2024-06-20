// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
    isRefreshing: false,
    status: "idle",
    error: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isRefreshing = null;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    setRefreshing: (state, action) => {
      state.isRefreshing = true;
    },
    setRefreshingfalse: (state, action) => {
      state.isRefreshing = false;
    },
  },
});

const selectAuthState = (state) => state.auth;

export const selectCurrentUser = createSelector([selectAuthState], (auth) => ({
  user: auth.user,
  isAuthenticated: auth.isAuthenticated,
}));

export const { loginSuccess, logout, setRefreshing, setRefreshingfalse } = authSlice.actions;
export default authSlice.reducer;
