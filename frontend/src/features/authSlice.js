import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const email = localStorage.getItem('email');

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: token || null,
    email: email || null
  },
  reducers: {
    setCredentials(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
    },
    logout(state) {
      state.token = null;
      state.email = null;
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
