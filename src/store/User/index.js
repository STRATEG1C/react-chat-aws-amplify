import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { graphqlOperation, API } from 'aws-amplify';
import { listUsers } from '../../graphql/queries';

const initialState = {
  items: [],
  isLoading: false,
  isError: true
};

export const fetchUsers = createAsyncThunk('FETCH_USERS', async () => {
  const listUserRes = await API.graphql(graphqlOperation(listUsers));
  return listUserRes.data.listUsers;
});

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
