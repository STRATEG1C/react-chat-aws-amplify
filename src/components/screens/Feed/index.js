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
    try {
      // 0. Check if user already has such conversation
      let chatRoom;

      const filter = {
        or: [
          {
            and: [
              { initiatorID: { eq: userId } },
              { subscriberID: { eq: currentUser.id } }
            ]
          },
          {
            and: [
              { initiatorID: { eq: currentUser.id } },
              { subscriberID: { eq: userId } }
            ]
          }
        ]
      }

      const rooms = await chatService.getChatRoomList(filter, 1);

      if (rooms.length) {
        chatRoom = rooms[0];
      } else {
        // 1. Create a new ChatRoom
        chatRoom = await chatService.createChatRoom(currentUser.id, userId);
        // 2. Add User to the ChatRoom
        await chatService.createUserConversation(userId, chatRoom.id);
        // 3. Add authenticated user to the ChatRoom
        await chatService.createUserConversation(currentUser.id, chatRoom.id);
      }

      // 4. Navigate user to the room
      history.push(`/chat/${chatRoom.id}`);
    } catch(err) {
      console.log('Error while creating a new chat room', err);
    }
  };


  return (
    <PageWrapper title="Feed">
      <UsersList onUserClick={onUserClick} currentUser={currentUser.id} />
      <br />
      <br />
      <ChatList />
    </PageWrapper>
  );
}

export default Feed;
