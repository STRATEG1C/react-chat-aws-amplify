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

  console.log(items.map((item => [ item.initiatorId, item.subscriberId ])));
  console.log(userId);

  return { items };
});

export const fetchChatRoom = createAsyncThunk('FETCH_CHAT_ROOM', async (chatId) => {
  const chatRoom = await chatService.getById(chatId);
  const { items: messages } = await chatService.getMessagesByChatId(chatId);
  return { ...chatRoom, messages };
});
