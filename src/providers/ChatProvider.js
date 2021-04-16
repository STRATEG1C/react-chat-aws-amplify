import { API, graphqlOperation } from 'aws-amplify';
import { getChatRoom, listChatRooms, messagesByChatRoom } from '../graphql/queries';
import { createChatRoom, createMessage, createUserConversation, updateChatRoom } from '../graphql/mutations';
import { listUserConversations } from '../components/common/ChatList/queries';
import {
  onCreateChatRoomBySubscriberId,
  onNewMessageInChat,
  onUpdateChatRoom
} from '../graphql/subscriptions';

class ChatProvider {
  async createChatRoom(initiatorId, partnerId) {
    const res = await API.graphql(graphqlOperation(createChatRoom, {
      input: {
        initiatorID: initiatorId,
        subscriberID: partnerId
      }
    }));
    return res.data.createChatRoom;
  }

  async createUserConversation(userID, chatRoomID) {
    const res = await API.graphql(graphqlOperation(createUserConversation, {
      input: {
        userID,
        chatRoomID
      }
    }));
    return res.data.createUserConversation;
  }

  async getChatRoom(id) {
    const res = await API.graphql(graphqlOperation(getChatRoom, { id }));
    return res.data.getChatRoom;
  }

  async getUserConversations(userID) {
    const res = await API.graphql(graphqlOperation(listUserConversations, {
      filter: {
        userID: {
          eq: userID
        }
      }
    }));
    return res.data.listUserConversations.items;
  }

  async getUserConversation(userID, chatID) {
    const res = await API.graphql(graphqlOperation(listUserConversations, {
      filter: {
        and: [
          { userID: { eq: userID } },
          { chatRoomID: { eq: chatID } }
        ]
      }
    }));
    return res.data.listUserConversations.items.length
      ? res.data.listUserConversations.items[0]
      : null;
  }

  async getMessagesByChatId(chatId, limit, next) {
    const res = await API.graphql(graphqlOperation(messagesByChatRoom, {
      chatRoomID: chatId,
      sortDirection: 'DESC',
      limit,
      nextToken: next
    }));

    return res.data.messagesByChatRoom;
  }

  async getChatRoomList(filter, limit) {
    const res = await API.graphql(graphqlOperation(listChatRooms, { filter, limit }));
    return res.data.listChatRooms.items;
  }

  async updateChatRoom(chatId, data) {
    const res = await API.graphql(graphqlOperation(updateChatRoom, {
      input: {
        id: chatId,
        ...data
      }
    }));
    return res.data.updateChatRoom;
  }

  async createChatMessage(chatRoomID, userID, content) {
    const res = await API.graphql(graphqlOperation(createMessage, {
      input: {
        content,
        userID,
        chatRoomID,
      }
    }));
    return res.data.createMessage;
  }

  subscribeToChatRoom(id, callback) {
    return API.graphql(
      {
        query: onNewMessageInChat,
        variables: {
          chatRoomID: id
        }
      }
    ).subscribe({
      next({ value }) {
        const newMessage = value.data.onNewMessageInChat;
        callback(newMessage);
      }
    });
  }

  subscribeToCreateNewRoom(userId, callback) {
    const subscription = API.graphql(
      {
        query: onCreateChatRoomBySubscriberId,
        variables: {
          subscriberID: userId
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
        query: onUpdateChatRoom,
        variables: {
          id
        }
      }
    ).subscribe({
      next({ value }) {
        const updatedRoom = value.data.onUpdateChatRoom;
        callback(updatedRoom);
      }
    });

    return subscription;
  }
}

export default ChatProvider;
