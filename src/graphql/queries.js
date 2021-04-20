/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      username
      status
      conversations {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        username
        status
        conversations {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserConversation = /* GraphQL */ `
  query GetUserConversation($id: ID!) {
    getUserConversation(id: $id) {
      id
      userID
      chatRoomID
      user {
        id
        email
        username
        status
        conversations {
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
export const listUserConversations = /* GraphQL */ `
  query ListUserConversations(
    $filter: ModelUserConversationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserConversations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
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
        isWaitForAccept
        isAccepted
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      id
      initiatorID
      subscriberID
      initiator {
        id
        email
        username
        status
        conversations {
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
        conversations {
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
export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
        conversations {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const messagesByChatRoom = /* GraphQL */ `
  query MessagesByChatRoom(
    $chatRoomID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByChatRoom(
      chatRoomID: $chatRoomID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUserFilterInput
    $sort: SearchableUserSortInput
    $limit: Int
    $nextToken: String
    $from: Int
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
    ) {
      items {
        id
        email
        username
        status
        conversations {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
      total
    }
  }
`;
