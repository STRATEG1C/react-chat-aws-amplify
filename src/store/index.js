import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth';
import userReducer from './User';
import chatReducer from './Chat';

const getSavedState = () => {
  return JSON.parse(localStorage.getItem('state')) || {};
}

const store = configureStore({
  preloadedState: getSavedState(),
  reducer: {
    auth: authReducer,
    user: userReducer,
    chat: chatReducer
  }
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('state', JSON.stringify({
    auth: state.auth
  }));
});

export default store;
