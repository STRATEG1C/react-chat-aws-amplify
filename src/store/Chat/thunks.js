import { createAsyncThunk } from '@reduxjs/toolkit';
import ChatService from '../../services/ChatService';
import ChatProvider from '../../providers/ChatProvider';

const chatService = new ChatService(new ChatProvider());

export const fetchChats = createAsyncThunk('FETCH_CHATS', async (userId) => {
  return await chatService.getUserConversations(userId);
});

export const fetchChatRoom = createAsyncThunk('FETCH_CHAT_ROOM', async (chatId) => {
  return await chatService.getChatRoom(chatId);
});

export const fetchMessages = createAsyncThunk('FETCH_MESSAGES', async ({ chatId, limit, next }) => {
  return await chatService.getMessagesByChatId(chatId, limit, next);
})
