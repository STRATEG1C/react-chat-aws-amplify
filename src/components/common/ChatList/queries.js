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
        isWaitForAccept
        isAccepted
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
          initiator {
            id
            username
          }
          subscriber {
            id
            username
          }
          lastMessage {
            id
            content
            createdAt
            user {
              id
              username
            }
          }
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
