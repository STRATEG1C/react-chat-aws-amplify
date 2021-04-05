/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onMessageByChatId = /* GraphQL */ `
  subscription OnMessageByChatId($chatId: ID!) {
    onMessageByChatId(chatId: $chatId) {
      id
      chatId
      authorId
      body
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChatRoomBySubscriberId = /* GraphQL */ `
  subscription OnCreateChatRoomBySubscriberId($subscriberId: String!) {
    onCreateChatRoomBySubscriberId(subscriberId: $subscriberId) {
      id
      initiatorId
      initiatorUsername
      subscriberId
      subscriberUsername
      lastMessage
      messages {
        items {
          id
          chatId
          authorId
          body
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateChatRoomById = /* GraphQL */ `
  subscription OnUpdateChatRoomById($id: ID!) {
    onUpdateChatRoomById(id: $id) {
      id
      initiatorId
      initiatorUsername
      subscriberId
      subscriberUsername
      lastMessage
      messages {
        items {
          id
          chatId
          authorId
          body
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
      id
      initiatorId
      initiatorUsername
      subscriberId
      subscriberUsername
      lastMessage
      messages {
        items {
          id
          chatId
          authorId
          body
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom {
    onUpdateChatRoom {
      id
      initiatorId
      initiatorUsername
      subscriberId
      subscriberUsername
      lastMessage
      messages {
        items {
          id
          chatId
          authorId
          body
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom {
    onDeleteChatRoom {
      id
      initiatorId
      initiatorUsername
      subscriberId
      subscriberUsername
      lastMessage
      messages {
        items {
          id
          chatId
          authorId
          body
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
      id
      chatId
      authorId
      body
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      chatId
      authorId
      body
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      chatId
      authorId
      body
      createdAt
      updatedAt
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      email
      username
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      email
      username
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      email
      username
      createdAt
      updatedAt
    }
  }
`;
