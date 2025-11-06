import { createSlice } from '@reduxjs/toolkit';
import { ServicesState } from './servicesType';

const initialState: ServicesState = {
  favorites: [],
};

const ServiceReducer = createSlice({
  name: 'services',
  initialState: initialState,
  reducers: {
    addFavorite: (state, action) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
    },
  },
});
export const ServiceActions = ServiceReducer.actions;

export default ServiceReducer.reducer;
