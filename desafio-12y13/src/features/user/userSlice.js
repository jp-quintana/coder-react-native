import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: null,
    idToken: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.idToken = action.payload.idToken;
    },
    logout: (state) => {
      state = {
        email: null,
        idToken: null,
      };
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
