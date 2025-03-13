// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';  // Import the userSlice reducer

// Create and configure the Redux store
const store = configureStore({
  reducer: {
    user: userReducer,  // Add the user slice reducer to the store
  },
});

// Export the store for later use
export default store;
