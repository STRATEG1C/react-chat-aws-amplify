import React from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom';
import ChatService from '../../../services/ChatService';
import ChatProvider from '../../../providers/ChatProvider';
import { selectCurrentUser } from '../../../store/Auth';
import PageWrapper from '../../common/PageWrapper';
import UsersList from '../../common/UsersList';
import ChatList from '../../common/ChatList';

import './style.css';
import UserService from '../../../services/UserService';
import UserProvider from '../../../providers/UserProvider';

const chatService = new ChatService(new ChatProvider());
const userService = new UserService(new UserProvider());

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

    const roomsRes = await chatService.getList(filter, 1);
    room = roomsRes[0];

    if (!room) {
      const subscriberUser = await userService.getById(userId);

      if (subscriberUser) {
        const newChatRoomData = {
          id: uuid(),
          initiatorId: currentUser.id,
          initiatorUsername: currentUser.username,
          subscriberId: subscriberUser.id,
          subscriberUsername: subscriberUser.username,
          lastMessage: 'New room created!'
        }

        room = await chatService.create(newChatRoomData);
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
