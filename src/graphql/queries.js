/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRoom = /* GraphQL */ `
  query GetRoom($id: ID!) {
    getRoom(id: $id) {
      id
      authorCognitoId
      recipientCognitoId
      recipientLocalId
      messages {
        authorCognitoId
        contentType
        content
        createdAt
      }
      messagesReadDateTime {
        readerCognitoId
        readDateTime
      }
      createdAt
      updatedAt
    }
  }
`;
export const listRooms = /* GraphQL */ `
  query ListRooms(
    $filter: ModelRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        authorCognitoId
        recipientCognitoId
        recipientLocalId
        messages {
          authorCognitoId
          contentType
          content
          createdAt
        }
        messagesReadDateTime {
          readerCognitoId
          readDateTime
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
