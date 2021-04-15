import { createAsyncThunk } from '@reduxjs/toolkit';
import ChatService from '../../services/ChatService';
import ChatProvider from '../../providers/ChatProvider';
import UserService from '../../services/UserService';
import UserProvider from '../../providers/UserProvider';

const chatService = new ChatService(new ChatProvider());
const userService = new UserService(new UserProvider());

export const fetchChats = createAsyncThunk('FETCH_CHATS', async (userId) => {
  const userData = await userService.getById(userId);
  return { items: userData.chatRoomUser.items };
});

export const fetchChatRoom = createAsyncThunk('FETCH_CHAT_ROOM', async (chatId) => {
  return await chatService.getById(chatId);
});

export const fetchMessages = createAsyncThunk('FETCH_MESSAGES', async ({ chatId, limit, next }) => {
  return await chatService.getMessagesByChatId(chatId, limit, next);
})
