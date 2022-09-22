import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSliceReducer from '../slices/authSlice';
import activitiesSliceReducer from '../slices/activitiesSlice';
import coursesSliceReducer from '../slices/coursesSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  auth: authSliceReducer,
  activities: activitiesSliceReducer,
  courses: coursesSliceReducer,
});

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
