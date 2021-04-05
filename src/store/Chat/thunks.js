import { createAsyncThunk } from '@reduxjs/toolkit';
import ChatService from '../../services/ChatService';
import ChatProvider from '../../providers/ChatProvider';

const chatService = new ChatService(new ChatProvider());

export const fetchChats = createAsyncThunk('FETCH_CHATS', async (userId) => {
  const filter = {
    or: [
      { initiatorId: { eq: userId } },
      { subscriberId: { eq: userId } },
    ]
  }
  const { items } = await chatService.getList(filter);
  return { items };
});

export const fetchChatRoom = createAsyncThunk('FETCH_CHAT_ROOM', async (chatId) => {
  return await chatService.getById(chatId);
});

export const fetchMessages = createAsyncThunk('FETCH_MESSAGES', async ({ chatId, limit, next }) => {
  const { items, nextToken } = await chatService.getMessagesByChatId(chatId, limit, next);
  return { items, nextToken }
})
