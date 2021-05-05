import { API, graphqlOperation } from 'aws-amplify';
import { getChatRoom, listChatRooms, messagesByChatRoom } from '../graphql/queries';
import {
  createChatRoom,
  createMessage,
  createUserConversation,
  updateChatRoom,
  updateUserConversation
} from '../graphql/mutations';
import { listUserConversations } from '../customQueries/queries';
import {
  onCreateUserConversationByUserId,
  onNewMessageInChat,
  onUpdateChatRoomByInitiatorId,
  onUpdateChatRoomBySubscriberId,
  onUpdateUserConversationByUserId
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

  async createUserConversation(userID, chatRoomID, isAccepted) {
    const res = await API.graphql(graphqlOperation(createUserConversation, {
      input: {
        userID,
        chatRoomID,
        isWaitForAccept: !isAccepted,
        isAccepted: isAccepted,
      }
    }));
    return res.data.createUserConversation;
  }

  async updateConversation(id, data) {
    const res = await API.graphql(graphqlOperation(updateUserConversation, {
      input: {
        id,
        ...data
      }
    }));
    return res.data.updateUserConversation;
  }

  async acceptConversation(conversationId) {
    return this.updateConversation(conversationId, {
      isWaitForAccept: false,
      isAccepted: true
    });
  }

  async banConversation(conversationId) {
    return this.updateConversation(conversationId, {
      isWaitForAccept: false,
      isAccepted: false
    });
  }

  async getChatRoom(id) {
    const res = await API.graphql(graphqlOperation(getChatRoom, { id }));
    return res.data.getChatRoom;
  }

  async getUserConversations(userID) {
    const res = await API.graphql(graphqlOperation(listUserConversations, {
      filter: {
        and: [
          {
            userID: {
              eq: userID
            }
          },
          {
            or: [
              {
                isAccepted: {
                  eq: true
                },
              },
              {
                isWaitForAccept: {
                  eq: true
                }
              }
            ]
          },
        ]
      }
    }));
    return res.data.listUserConversations.items;
  }

  async getBannedChats(userID) {
    const res = await API.graphql(graphqlOperation(listUserConversations, {
      filter: {
        and: [
          {
            userID: {
              eq: userID
            }
          },
          {
            isAccepted: {
              eq: false
            },
          },
          {
            isWaitForAccept: {
              eq: false
            }
          }
        ]
      }
    }));
    return res.data.listUserConversations.items;
  }

  async getBlockedUserConversations(userID) {
    const res = await API.graphql(graphqlOperation(listUserConversations, {
      filter: {
        and: [
          { userID: { eq: userID } },
          { isAccepted: { eq: false } }
        ]
      }
    }));
    return res.data.listUserConversations;
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

  subscribeToCreateNewConversation(userID, callback) {
    const subscription = API.graphql(
      {
        query: onCreateUserConversationByUserId,
        variables: {
          userID
        }
      }
    ).subscribe({
      next({ value }) {
        const newRoom = value.data.onCreateUserConversationByUserId;
        callback(newRoom);
      }
    });

    return subscription;
  }

  subscribeToUpdateRoomBySubscriberId(subscriberID, callback) {
    return API.graphql(
      {
        query: onUpdateChatRoomBySubscriberId,
        variables: {
          subscriberID
        }
      }
    ).subscribe({
      next({ value }) {
        const updatedRoom = value.data.onUpdateChatRoomBySubscriberId;
        callback(updatedRoom);
      }
    });
  }

  subscribeToUpdateRoomByInitiatorId(initiatorID, callback) {
    return API.graphql(
      {
        query: onUpdateChatRoomByInitiatorId,
        variables: {
          initiatorID
        }
      }
    ).subscribe({
      next({ value }) {
        const updatedRoom = value.data.onUpdateChatRoomByInitiatorId;
        callback(updatedRoom);
      }
    });
  }

  subscribeToUpdateOwnConversation(userID, callback) {
    return API.graphql(
      {
        query: onUpdateUserConversationByUserId,
        variables: {
          userID
        }
      }
    ).subscribe({
      next({ value }) {
        const updatedRoom = value.data.onUpdateUserConversationByUserId;
        callback(updatedRoom);
      }
    });
  }
}

export default ChatProvider;
