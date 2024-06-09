import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk for refreshing the token
export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { getState, rejectWithValue }) => {
  const { auth } = getState();
  try {
    const response = await fetch('http://localhost:5500/api/v1/admin/refresh-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.refreshToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    localStorage.setItem('accessToken', JSON.stringify(data.accessToken));
    return data.accessToken;
  } catch (error) {
    return rejectWithValue(error.message);
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
        state.isAuthenticated = true;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
      });
  },
});

export const selectCurrentUser = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
