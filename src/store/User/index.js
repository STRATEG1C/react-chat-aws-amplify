import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './thunks';

const initialState = {
  items: [],
  isLoading: false,
  isError: true
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.items = action.payload.items;
      state.isLoading = false;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
    }
  }
});

export const selectAllUsers = state => state.items;

export default userSlice.reducer;
