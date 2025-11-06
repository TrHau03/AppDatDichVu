import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './appType';

const initialState: AppState = {
  isLoading: false,
};

const AppReducer = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    showLoading: state => {
      state.isLoading = true;
    },
    hideLoading: state => {
      state.isLoading = false;
    },
  },
});
export const AppActions = AppReducer.actions;

export default AppReducer.reducer;
