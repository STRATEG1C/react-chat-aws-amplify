import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { graphqlOperation, API } from 'aws-amplify';
import { getChatRoom, listChatRooms, messagesByChatId } from '../../graphql/queries';

const initialState = {
  items: [],
  chatRoom: null,
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

export const fetchChatRoom = createAsyncThunk('FETCH_CHAT_ROOM', async (chatId) => {
  const chatRoomRes = await API.graphql(graphqlOperation(getChatRoom, { id: chatId }));
  const chatRoom = chatRoomRes.data.getChatRoom;

  const chatMessagesRes = await API.graphql(graphqlOperation(messagesByChatId, { chatId, sortDirection: 'DESC' }));
  const messages = chatMessagesRes.data.messagesByChatId.items;

  return { ...chatRoom, messages };
});

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setRoomData: (state, action) => {
      console.log(action);
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
