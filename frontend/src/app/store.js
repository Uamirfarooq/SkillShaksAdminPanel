import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Feature/auth/authSlice.js';

// Create the Redux store with the auth reducer
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Customize middleware behavior if necessary
      serializableCheck: false,
    }),
});

export default store;
