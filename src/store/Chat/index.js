import { createSlice } from '@reduxjs/toolkit';
import { fetchChatRoom, fetchChats } from './thunks';

const initialState = {
  items: [],
  chatRoom: null,
  isLoading: false,
  isError: true
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setRoomData: (state, action) => {
      state.chatRoom = action.payload;
    },
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
    },

    [fetchChatRoom.pending]: (state, action) => {
      state.isLoading = true;
      state.chatRoom = null;
    },
    [fetchChatRoom.fulfilled]: (state, action) => {
      state.chatRoom = action.payload;
      state.isLoading = false;
    },
    [fetchChatRoom.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.chatRoom = null;
    }
  }
});

export const { setRoomData } = chatSlice.actions;

export const selectAllChats = state => state.items;
export const selectCurrentChatRoom = state => state.chatRoom

export default chatSlice.reducer;
