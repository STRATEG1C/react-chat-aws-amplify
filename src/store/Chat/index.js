import { createSlice } from '@reduxjs/toolkit';
import { fetchChatRoom, fetchChats, fetchMessages } from './thunks';

const initialState = {
  chatRooms: [],
  chatRoom: null,
  messages: [],
  isLoading: false,
  isError: true,
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
      const targetRoom = state.chatRooms.find(item => item.id === action.payload.id);
      Object.keys(action.payload).forEach(key => targetRoom[key] = action.payload[key]);
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
  extraReducers: {
    [fetchChats.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchChats.fulfilled]: (state, action) => {
      state.chatRooms = action.payload.items;
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
      // state.messages = action.payload.messages.items;
      // state.nextMessages = action.payload.messages.nextToken;
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
    },
    [fetchMessages.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.messages = [...state.messages, ...action.payload.items];
      state.nextMessages = action.payload.nextToken;
    },
    [fetchMessages.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
    }
  }
});

export const { addRoom, updateRoom, setMessages } = chatSlice.actions;

export const selectAllChats = state => state.chatRooms;
export const selectCurrentChatRoom = state => state.chatRoom;
export const selectRoomMessages = state => state.messages;
export const selectNextMessages = state => state.nextMessages;

export default chatSlice.reducer;
