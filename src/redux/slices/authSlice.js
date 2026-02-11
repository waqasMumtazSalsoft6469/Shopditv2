import {createSlice} from '@reduxjs/toolkit';

// Initial state
const initialState = {
  user: null,
  token: null,
  currentLocation: null,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Merge old user with new user data
    setAuth(state, action) {
      state.user = {
        ...(state.user || {}),
        ...(action.payload.user || {}),
      };
      if (action.payload.token) {
        state.token = action.payload.token;
      }
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
    },

    addFavoriteCouponId: (state, action) => {
      console.log('statestatestate', state);

      const id = action.payload;
      if (!state.user.favoriteCoupons.includes(id)) {
        state.user.favoriteCoupons.push(id);
      }
    },
    removeFavoriteCouponId: (state, action) => {
      const id = action.payload;
      state.user.favoriteCoupons = state.user.favoriteCoupons.filter(
        item => item !== id,
      );
    },
    setCurrentLocation(state, action) {
      state.currentLocation = action.payload;
    },
    clearCurrentLocation(state) {
      state.currentLocation = null;
    },

    // updateFavoriteId: (state, action) => {
    //   console.log('statestatestate', state);

    //   // const id = action.payload;
    //   // if (!state.user.favoriteCoupons.includes(id)) {
    //   //   state.user.favoriteCoupons.push(id);
    //   // }
    //   state.user.favoriteCoupons = action?.payload
    // },
  },
});

export const {
  setAuth,
  clearAuth,
  addFavoriteCouponId,
  removeFavoriteCouponId,
  setFavorites,
  setCurrentLocation,
  clearCurrentLocation,
} = authSlice.actions;

export default authSlice.reducer;
