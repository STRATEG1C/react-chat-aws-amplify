import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  register,
  signOut
} from './thunks';

const initialState = {
  user: null,
  isLoading: false,
  isError: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [login.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [login.fulfilled]: (state, action) => {
      state.user = { ...action.payload };
      state.isLoading = false;
    },
    [login.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
    },

    [register.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isRegistered = false;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isRegistered = true;
    },
    [register.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isRegistered = false;
    },

    [signOut.pending]: (state, action) => {
    },
    [signOut.fulfilled]: (state, action) => {
      state.user = null;
    },
    [signOut.rejected]: (state, action) => {
      state.user = null;
    }
  }
});

export const selectCurrentUser = state => state.user;
export const selectAuthError = state => state.isError;

export default authSlice.reducer;
