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
      state.email = null;
      state.displayName = null;
      state.idToken = null;
      state.localId = null;
      state.profileImage = null;
      state.location = { latitude: '', longitude: '', address: '' };
      state.favorites = [];
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    setUserLocation: (state, action) => {
      state.location = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    favoriteProduct: (state, action) => {
      state.favorites = [...state.favorites, action.payload];
    },
    unfavoriteProduct: (state, action) => {
      state.favorites = state.favorites.filter(
        (favorite) => favorite !== action.payload
      );
    },
  },
});

export const {
  setUser,
  logout,
  setProfileImage,
  setUserLocation,
  setFavorites,
  favoriteProduct,
  unfavoriteProduct,
} = userSlice.actions;

export default userSlice.reducer;
