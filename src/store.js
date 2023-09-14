// store.jsx
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './rtk/MyFav/favoritesSlice';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from "./rtk/MyFav/userSlice";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    user: userReducer,
  },
});

export default store;
