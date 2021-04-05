import { API, graphqlOperation } from 'aws-amplify';
import { getChatRoom, listChatRooms, messagesByChatId } from '../graphql/queries';
import { createChatRoom, createMessage, updateChatRoom } from '../graphql/mutations';
import {
  onCreateChatRoomBySubscriberId,
  onMessageByChatId,
  onUpdateChatRoomById,
} from '../graphql/subscriptions';

class ChatProvider {
  async create(data) {
    const res = await API.graphql(graphqlOperation(createChatRoom, { input: data }));
    return res.data.createChatRoom;
  }

  async getById(id) {
    const res = await API.graphql(graphqlOperation(getChatRoom, { id }));
    return res.data.getChatRoom;
  }

  async getMessagesByChatId(chatId, limit, next) {
    const res = await API.graphql(graphqlOperation(messagesByChatId, {
      chatId,
      sortDirection: 'DESC',
      limit,
      nextToken: next
    }));

    const { items, nextToken } = res.data.messagesByChatId;
    return {
      items,
      next: nextToken
    };
  }

  async getList(filter, limit) {
    const res = await API.graphql(graphqlOperation(listChatRooms, { filter, limit }));
    const { items, nextToken } = res.data.listChatRooms;
    return {
      items,
      next: nextToken
    };
  }

  async update(chatId, data) {
    const res = await API.graphql(graphqlOperation(updateChatRoom, {
      input: data
    }));
    return res.data.updateChatRoom;
  }

  async createChatMessage(message) {
    const res = await API.graphql(graphqlOperation(createMessage, { input: message }));
    return res.data.createMessage;
  }

  subscribeToRoom(id, callback) {
    const subscription = API.graphql(
      {
        query: onMessageByChatId,
        variables: {
          chatId: id
        }
      }
    ).subscribe({
      next({ value }) {
        const newMessage = value.data.onMessageByChatId;
        callback(newMessage)
      }
    });

    return subscription;
  }

  subscribeToCreationNewRoom(userId, callback) {
    const subscription = API.graphql(
      {
        query: onCreateChatRoomBySubscriberId,
        variables: {
          subscriberId: userId
        }
      }
    ).subscribe({
      next({ value }) {
        const newRoom = value.data.onCreateChatRoomBySubscriberId;
        callback(newRoom);
      }
    });

    return subscription;
  }

  subscribeToUpdateRoom(id, callback) {
    const subscription = API.graphql(
      {
        query: onUpdateChatRoomById,
        variables: {
          id
        }
      }
    ).subscribe({
      next({ value }) {
        const newRoom = value.data.onUpdateChatRoomById;
        callback(newRoom);
      }
    });

    return subscription;
  }
}

export default ChatProvider;
