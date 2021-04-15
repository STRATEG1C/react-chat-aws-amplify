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
      let chatRoom;

      // 0 Check if room with this user already exists
      // const filter = {
      //   or: [
      //     {
      //       and: [
      //         { initiatorId: { eq: userId } },
      //         { subscriberId: { eq: currentUser.id } }
      //       ]
      //     },
      //     {
      //       and: [
      //         { initiatorId: { eq: currentUser.id } },
      //         { subscriberId: { eq: userId } }
      //       ]
      //     }
      //   ]
      // }
      // const rooms = await chatService.getList(filter, 1);

      // TODO: Add checking
      if (false) {
        // chatRoom = rooms[0];
      } else {
        // 1. Create a new ChatRoom
        chatRoom = await chatService.create({});

        // 2. Add User to the ChatRoom
        await chatService.addUserToRoom(userId, chatRoom.id);

        // 3. Add authenticated user to the ChatRoom
        await chatService.addUserToRoom(currentUser.id, chatRoom.id);
      }

      // 4. Navigate user to the room
      history.push(`/chat/${chatRoom.id}/HardcodedName`);
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
