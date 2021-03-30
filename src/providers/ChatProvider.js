import { API, graphqlOperation } from 'aws-amplify';
import { getChatRoom, listChatRooms, messagesByChatId } from '../graphql/queries';
import { createChatRoom, createMessage } from '../graphql/mutations';

class ChatProvider {
  async create(data) {
    const res = await API.graphql(graphqlOperation(createChatRoom, { input: data }));
    return res.data.createChatRoom;
  }

  async getById(id) {
    const res = await API.graphql(graphqlOperation(getChatRoom, { id }));
    return res.data.getChatRoom;
  }

  async getMessagesByChatId(chatId, limit) {
    const res = await API.graphql(graphqlOperation(messagesByChatId, { chatId, sortDirection: 'DESC', limit }));
    const { items, nextToken } = res.data.messagesByChatId;
    return {
      items,
      next: nextToken
    };
  }

  async getList(by, limit) {
    const res = await API.graphql(graphqlOperation(listChatRooms, { by, limit }));
    const { items, nextToken } = res.data.listChatRooms;
    return {
      items,
      next: nextToken
    };
  }

  async createChatMessage(message) {
    const res = await API.graphql(graphqlOperation(createMessage, { input: message }));
    return res.data.createMessage;
  }
}

export default ChatProvider;
