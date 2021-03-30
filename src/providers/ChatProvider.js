import { API, graphqlOperation } from 'aws-amplify';
import { listChatRooms, messagesByChatId } from '../graphql/queries';

class ChatProvider {
  constructor(provider) {
    this._provider = provider;
  }

  async create(initiator, recipient) {
    return this._provider.create(initiator, recipient);
  }

  async getById(id) {
    return this._provider.getById(id);
  }

  async getMessagesByChatId(chatId) {
    const res = API.graphql(graphqlOperation(messagesByChatId, { chatId, sortDirection: 'DESC' }));
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
}

export default ChatProvider;
