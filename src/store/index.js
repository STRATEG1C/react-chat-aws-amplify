import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth';
import postReducer from './Post';
import userReducer from './User';

const getSavedState = () => {
  return JSON.parse(localStorage.getItem('state')) || {};
}

const store = configureStore({
  preloadedState: getSavedState(),
  reducer: {
    auth: authReducer,
    post: postReducer,
    user: userReducer
  }
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('state', JSON.stringify({
    auth: state.auth
  }));
});

export default store;
