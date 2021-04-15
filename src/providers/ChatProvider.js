import { API, graphqlOperation } from 'aws-amplify';
import { getChatRoom, listChatRooms, messagesByChatRoom } from '../graphql/queries';
import { createChatRoom, createChatRoomUser, createMessage, updateChatRoom } from '../graphql/mutations';
import {
  onCreateChatRoomBySubscriberId,
  onUpdateChatRoomById,
} from '../graphql/subscriptions';

class ChatProvider {
  async create(data) {
    const res = await API.graphql(graphqlOperation(createChatRoom, { input: data }));
    return res.data.createChatRoom;
  }

  async addUserToRoom(userId, chatRoomId) {
    const res = await API.graphql(graphqlOperation(createChatRoomUser, {
      input: {
        userId,
        chatRoomId
      }
    }));
    return res.data.createChatRoomUser;
  }

  async getById(id) {
    const res = await API.graphql(graphqlOperation(getChatRoom, { id }));
    return res.data.getChatRoom;
  }

  async getMessagesByChatId(chatId, limit, next) {
    const res = await API.graphql(graphqlOperation(messagesByChatRoom, {
      chatRoomId: chatId,
      sortDirection: 'DESC',
      limit,
      nextToken: next
    }));

    console.log(res);

    return res.data.messagesByChatRoom;
  }

  async getList(filter, limit) {
    const res = await API.graphql(graphqlOperation(listChatRooms, { filter, limit }));
    return res.data.listChatRooms
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
    // const subscription = API.graphql(
    //   {
    //     query: onMessageByChatId,
    //     variables: {
    //       chatId: id
    //     }
    //   }
    // ).subscribe({
    //   next({ value }) {
    //     const newMessage = value.data.onMessageByChatId;
    //     callback(newMessage)
    //   }
    // });
    //
    // return subscription;
    return {};
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
