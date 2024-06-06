import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk for refreshing the token
export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { getState }) => {
  const { auth } = getState();
  const response = await fetch('/api/refresh-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth.refreshToken}`
    }
  });

  if (response) {
    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    return data.accessToken;
  } else {
    throw new Error('Failed to refresh token');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    isAuthenticated: !!localStorage.getItem('accessToken'),
    status: 'idle',
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
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isAuthenticated = false;
      });
  },
});

export const selectCurrentUser = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
