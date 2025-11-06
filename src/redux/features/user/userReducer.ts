import { createSlice } from '@reduxjs/toolkit';
import { UserState } from './userType';

const initialState: UserState = {
  profile: {
    name: 'Hau Le',
    phoneNumber: '123456789',
    address: '123 Main St, Cityville',
    addressDescription: '',
  },
  payment: {
    current: {
      id: '1',
      type: 'cash',
      cardNumber: null,
    },
    cards: [
      {
        id: '1',
        type: 'cash',
        cardNumber: null,
      },
      {
        id: '2',
        type: 'bank',
        cardNumber: '1234567788991155',
      },
    ],
  },
};

const UserReducer = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    setCurrentPayment: (state, action) => {
      state.payment.current = action.payload;
    },
    addCard: (state, action) => {
      state.payment.cards.push(action.payload);
    },
    removeCard: (state, action) => {
      state.payment.cards = state.payment.cards.filter(
        card => card.id !== action.payload.id,
      );
    },
  },
});
export const UserActions = UserReducer.actions;

export default UserReducer.reducer;
