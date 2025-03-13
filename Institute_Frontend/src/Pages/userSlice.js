// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    registerNumber: localStorage.getItem('registerNumber') || '', // Get registerNumber from localStorage
  },
  reducers: {
    setRegisterNumber: (state, action) => {
      state.registerNumber = action.payload;
      localStorage.setItem('registerNumber', action.payload); // Store the registerNumber in localStorage
    },
    logout: (state) => {
      state.registerNumber = ''; // Reset the register number in state
      localStorage.removeItem('registerNumber'); // Remove registerNumber from localStorage
    },
  },
});

export const { setRegisterNumber, logout } = userSlice.actions;
export default userSlice.reducer;
