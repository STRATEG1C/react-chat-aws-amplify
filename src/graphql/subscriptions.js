/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onNewMessageInChat = /* GraphQL */ `
  subscription OnNewMessageInChat($chatRoomID: ID!) {
    onNewMessageInChat(chatRoomID: $chatRoomID) {
      id
      createdAt
      content
      userID
      chatRoomID
      user {
        id
        email
        username
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        initiatorID
        subscriberID
        initiator {
          id
          email
          username
          status
          createdAt
          updatedAt
        }
        subscriber {
          id
          email
          username
          status
          createdAt
          updatedAt
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onUpdateChatRoomById = /* GraphQL */ `
  subscription OnUpdateChatRoomById($id: ID!) {
    onUpdateChatRoomById(id: $id) {
      id
      initiatorID
      subscriberID
      initiator {
        id
        email
        username
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      subscriber {
        id
        email
        username
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      lastMessageID
      lastMessage {
        id
        createdAt
        content
        userID
        chatRoomID
        user {
          id
          email
          username
          status
          createdAt
          updatedAt
        }
        chatRoom {
          id
          initiatorID
          subscriberID
          lastMessageID
          createdAt
          updatedAt
        }
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChatRoomBySubscriberId = /* GraphQL */ `
  subscription OnCreateChatRoomBySubscriberId($subscriberID: ID!) {
    onCreateChatRoomBySubscriberId(subscriberID: $subscriberID) {
      id
      initiatorID
      subscriberID
      initiator {
        id
        email
        username
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      subscriber {
        id
        email
        username
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      lastMessageID
      lastMessage {
        id
        createdAt
        content
        userID
        chatRoomID
        user {
          id
          email
          username
          status
          createdAt
          updatedAt
        }
        chatRoom {
          id
          initiatorID
          subscriberID
          lastMessageID
          createdAt
          updatedAt
        }
        updatedAt
      }
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
      status
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
          isWaitForAccept
          isAccepted
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      email
      username
      status
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
          isWaitForAccept
          isAccepted
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      email
      username
      status
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
          isWaitForAccept
          isAccepted
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
export const onCreateUserConversation = /* GraphQL */ `
  subscription OnCreateUserConversation {
    onCreateUserConversation {
      id
      userID
      chatRoomID
      user {
        id
        email
        username
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        initiatorID
        subscriberID
        initiator {
          id
          email
          username
          status
          createdAt
          updatedAt
        }
        subscriber {
          id
          email
          username
          status
          createdAt
          updatedAt
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        createdAt
        updatedAt
      }
      isWaitForAccept
      isAccepted
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserConversation = /* GraphQL */ `
  subscription OnUpdateUserConversation {
    onUpdateUserConversation {
      id
      userID
      chatRoomID
      user {
        id
        email
        username
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        initiatorID
        subscriberID
        initiator {
          id
          email
          username
          status
          createdAt
          updatedAt
        }
        subscriber {
          id
          email
          username
          status
          createdAt
          updatedAt
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        createdAt
        updatedAt
      }
      isWaitForAccept
      isAccepted
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserConversation = /* GraphQL */ `
  subscription OnDeleteUserConversation {
    onDeleteUserConversation {
      id
      userID
      chatRoomID
      user {
        id
        email
        username
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        initiatorID
        subscriberID
        initiator {
          id
          email
          username
          status
          createdAt
          updatedAt
        }
        subscriber {
          id
          email
          username
          status
          createdAt
          updatedAt
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        createdAt
        updatedAt
      }
      isWaitForAccept
      isAccepted
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom {
    onCreateChatRoom {
      id
      initiatorID
      subscriberID
      initiator {
        id
        email
        username
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      subscriber {
        id
        email
        username
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      lastMessageID
      lastMessage {
        id
        createdAt
        content
        userID
        chatRoomID
        user {
          id
          email
          username
          status
          createdAt
          updatedAt
        }
        chatRoom {
          id
          initiatorID
          subscriberID
          lastMessageID
          createdAt
          updatedAt
        }
        updatedAt
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
      initiatorID
      subscriberID
      initiator {
        id
        email
        username
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      subscriber {
        id
        email
        username
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      lastMessageID
      lastMessage {
        id
        createdAt
        content
        userID
        chatRoomID
        user {
          id
          email
          username
          status
          createdAt
          updatedAt
        }
        chatRoom {
          id
          initiatorID
          subscriberID
          lastMessageID
          createdAt
          updatedAt
        }
        updatedAt
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
      initiatorID
      subscriberID
      initiator {
        id
        email
        username
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      subscriber {
        id
        email
        username
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      lastMessageID
      lastMessage {
        id
        createdAt
        content
        userID
        chatRoomID
        user {
          id
          email
          username
          status
          createdAt
          updatedAt
        }
        chatRoom {
          id
          initiatorID
          subscriberID
          lastMessageID
          createdAt
          updatedAt
        }
        updatedAt
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
      createdAt
      content
      userID
      chatRoomID
      user {
        id
        email
        username
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        initiatorID
        subscriberID
        initiator {
          id
          email
          username
          status
          createdAt
          updatedAt
        }
        subscriber {
          id
          email
          username
          status
          createdAt
          updatedAt
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
      id
      createdAt
      content
      userID
      chatRoomID
      user {
        id
        email
        username
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        initiatorID
        subscriberID
        initiator {
          id
          email
          username
          status
          createdAt
          updatedAt
        }
        subscriber {
          id
          email
          username
          status
          createdAt
          updatedAt
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
      id
      createdAt
      content
      userID
      chatRoomID
      user {
        id
        email
        username
        status
        chatRoomUser {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        initiatorID
        subscriberID
        initiator {
          id
          email
          username
          status
          createdAt
          updatedAt
        }
        subscriber {
          id
          email
          username
          status
          createdAt
          updatedAt
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          content
          userID
          chatRoomID
          updatedAt
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
