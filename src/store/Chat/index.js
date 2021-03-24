import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { graphqlOperation, API } from 'aws-amplify';
import { listChatRooms } from '../../graphql/queries';

const initialState = {
  items: [],
  isLoading: false,
  isError: true
};

export const fetchChats = createAsyncThunk('FETCH_CHATS', async (userId) => {
  const filter = {
    or: [
      { initiatorId: { eq: userId } },
      { subscriberId: { eq: userId } },
    ]
  }
  const getChatRes = await API.graphql(graphqlOperation(listChatRooms, { filter }));
  return getChatRes.data.listChatRooms;
});

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchChats.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchChats.fulfilled]: (state, action) => {
      state.items = action.payload.items;
      state.isLoading = false;
    },
    [fetchChats.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
    }
  }
});

export const selectAllChats = state => state.items;

export default chatSlice.reducer;
