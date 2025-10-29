import { combineReducers, configureStore } from '@reduxjs/toolkit';
import particlesReducer from './slices/particlesSlice';

export default configureStore({
  reducer: combineReducers({
    particles: particlesReducer,
  }),
  devTools: import.meta.env.DEV,
});
