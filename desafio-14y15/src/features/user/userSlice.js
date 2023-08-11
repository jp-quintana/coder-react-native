import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: null,
    idToken: null,
    localId: null,
    profileImage: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.idToken = action.payload.idToken;
      state.localId = action.payload.localId;
    },
    logout: (state) => {
      state = {
        email: null,
        idToken: null,
        localId: null,
        profileImage: null,
      };
    },
    saveImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },
});

export const { setUser, logout, saveImage } = userSlice.actions;

export default userSlice.reducer;
