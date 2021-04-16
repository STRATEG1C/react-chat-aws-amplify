/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      email
      username
      status
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      email
      username
      status
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      email
      username
      status
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
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
export const createUserConversation = /* GraphQL */ `
  mutation CreateUserConversation(
    $input: CreateUserConversationInput!
    $condition: ModelUserConversationConditionInput
  ) {
    createUserConversation(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const updateUserConversation = /* GraphQL */ `
  mutation UpdateUserConversation(
    $input: UpdateUserConversationInput!
    $condition: ModelUserConversationConditionInput
  ) {
    updateUserConversation(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteUserConversation = /* GraphQL */ `
  mutation DeleteUserConversation(
    $input: DeleteUserConversationInput!
    $condition: ModelUserConversationConditionInput
  ) {
    deleteUserConversation(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
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
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
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
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
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
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
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
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
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
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
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
