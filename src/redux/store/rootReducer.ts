import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import appReducer from '../features/app/appReducer';
import servicesReducer from '../features/services/servicesReducer';
import userReducer from '../features/user/userReducer';

const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
  blacklist: [],
};

export const rootReducer = combineReducers({
  app: persistReducer(appPersistConfig, appReducer),
  services: servicesReducer,
  user: userReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
