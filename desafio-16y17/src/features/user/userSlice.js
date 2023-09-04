import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: null,
    displayName: null,
    idToken: null,
    localId: null,
    profileImage: null,
    location: {
      latitude: '',
      longitude: '',
      address: '',
    },
    favorites: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.idToken = action.payload.idToken;
      state.localId = action.payload.localId;
      state.displayName = action.payload.displayName;
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
    setUserLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { setUser, logout, saveImage, setUserLocation } =
  userSlice.actions;

export default userSlice.reducer;
