import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBannedChats,
  fetchChatRoom,
  fetchChats,
  fetchMessages
} from './thunks';

const initialState = {
  chatRooms: [],
  bannedChats: [],
  chatRoom: null,
  messages: [],
  isLoading: false,
  isError: false,
  nextMessages: ''
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addRoom: (state, action) => {
      state.chatRooms = [action.payload, ...state.chatRooms];
    },
    updateRoom: (state, action) => {
      const updatedChatRoom = state.chatRooms.find(item => item.id === action.payload.id);
      updatedChatRoom.lastMessageID = action.payload.lastMessageID
    },
    addMessage: (state, action) => {
      state.messages = [action.payload, ...state.messages];
    },
  },
  extraReducers: {
    [fetchChats.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchChats.fulfilled]: (state, action) => {
      state.chatRooms = action.payload;
      state.isLoading = false;
    },
    [fetchChats.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
    },

    [fetchBannedChats.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchBannedChats.fulfilled]: (state, action) => {
      state.bannedChats = action.payload;
      state.isLoading = false;
    },
    [fetchBannedChats.rejected]: (state, action) => {
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
    },

    [fetchMessages.pending]: (state, action) => {
      state.isError = false;
      state.isLoading = true;
      state.messages = [];
    },
    [fetchMessages.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.messages = action.payload.items;
      state.nextMessages = action.payload.nextToken;
    },
    [fetchMessages.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    }
  }
});

export const { addRoom, updateRoom, addMessage } = chatSlice.actions;

export const selectAcceptedChats = state => state.chatRooms;
export const selectBannedChats = state => state.bannedChats;
export const selectChatRoom = state => state.chatRoom;
export const selectMessages = state => state.messages;
export const selectNextMessages = state => state.nextMessages;

export default chatSlice.reducer;
