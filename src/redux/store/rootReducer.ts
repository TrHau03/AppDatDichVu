import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import appReducer from '../features/app/appReducer';

const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
  blacklist: ['update'],
};

export const rootReducer = combineReducers({
  app: persistReducer(appPersistConfig, appReducer),
});
export type RootState = ReturnType<typeof rootReducer>;
