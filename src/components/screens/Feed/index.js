import React from 'react';
import { useSelector } from 'react-redux';
import { graphqlOperation, API } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom';
import { createChatRoom } from '../../../graphql/mutations';
import { getUser, listChatRooms } from '../../../graphql/queries';
import { selectCurrentUser } from '../../../store/Auth';
import PageWrapper from '../../common/PageWrapper';
import UsersList from '../../common/UsersList';

import './style.css';
import ChatList from '../../common/ChatList';

const Feed = () => {
  const currentUser = useSelector(state => selectCurrentUser(state.auth));
  const history = useHistory();

  const onUserClick = async (userId) => {
    let room;

    const filter = {
      or: [
        {
          and: [
            { initiatorId: { eq: userId } },
            { subscriberId: { eq: currentUser.id } }
          ]
        },
        {
          and: [
            { initiatorId: { eq: currentUser.id } },
            { subscriberId: { eq: userId } }
          ]
        }
      ]
    }

    const getChatRes = await API.graphql(graphqlOperation(listChatRooms, { filter, limit: 1 }));
    room = getChatRes.data.listChatRooms.items[0];

    if (!room) {
      const subscriberUserRes = await API.graphql(graphqlOperation(getUser, { id: userId }));
      const subscriberUser = subscriberUserRes.data.getUser;

      if (subscriberUser) {
        const newChatRoomData = {
          id: uuid(),
          initiatorId: currentUser.id,
          initiatorUsername: currentUser.username,
          subscriberId: subscriberUser.id,
          subscriberUsername: subscriberUser.username,
          lastMessage: '',
          messages: []
        }

        const createRoomRes = await API.graphql(graphqlOperation(createChatRoom, { input: newChatRoomData }));
        room = createRoomRes.data.createChatRoom;
      }
    }

    history.push(`/chat/${room.id}`);
  };

  const onChatClick = (chatId) => {
    history.push(`/chat/${chatId}`);
  }

  return (
    <PageWrapper title="Feed">
      <UsersList onUserClick={onUserClick} currentUser={currentUser.id} />
      <br />
      <br />
      <ChatList onChatClick={onChatClick} />
    </PageWrapper>
  );
}

export default Feed;
