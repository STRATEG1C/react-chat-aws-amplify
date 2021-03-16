/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateRoom = /* GraphQL */ `
  subscription OnCreateRoom {
    onCreateRoom {
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
export const onUpdateRoom = /* GraphQL */ `
  subscription OnUpdateRoom {
    onUpdateRoom {
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
export const onDeleteRoom = /* GraphQL */ `
  subscription OnDeleteRoom {
    onDeleteRoom {
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
