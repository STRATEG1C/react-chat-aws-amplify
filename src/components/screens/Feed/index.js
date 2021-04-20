import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChatService from '../../../services/ChatService';
import ChatProvider from '../../../providers/ChatProvider';
import { selectCurrentUser } from '../../../store/Auth';
import PageWrapper from '../../common/PageWrapper';
import UsersList from '../../common/UsersList';
import ChatList from '../../common/ChatList';
import './style.css';
import ChatRoom from '../ChatRoom';
import { selectAllUsers } from '../../../store/User';
import { fetchUsers } from '../../../store/User/thunks';
import { fetchChats } from '../../../store/Chat/thunks';
import { selectAllChats } from '../../../store/Chat';

const chatService = new ChatService(new ChatProvider());

const Feed = ({ match }) => {
  const [searchContactString, setSearchContactString] = useState('');

  const currentUser = useSelector(state => selectCurrentUser(state.auth));
  const history = useHistory();

  const onClickChat = (chatId) => {
    history.push(`/${chatId}`);
  }

  const userList = useSelector(state => selectAllUsers(state.user)).filter(user => user.id !== currentUser);
  const chatList = useSelector(state => selectAllChats(state.chat));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchChats(currentUser.id));
  }, [currentUser.id, dispatch]);

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
        await chatService.createUserConversation(userId, chatRoom.id, false);
        // 3. Add authenticated user to the ChatRoom
        await chatService.createUserConversation(currentUser.id, chatRoom.id, true);
      }

      // 4. Navigate user to the room
      history.push(`/${chatRoom.id}`);
    } catch(err) {
      console.log('Error while creating a new chat room', err);
    }
  };

  const onChangeSearchContact = (e) => {
    setSearchContactString(e.target.value);
  }

  const chatId = match?.params?.chatId;

  return (
    <PageWrapper title="Feed">
      <div className="flex">
        <div className="contact-list">
          <input
            type="text"
            placeholder="Search chat or user"
            value={searchContactString}
            onChange={onChangeSearchContact}
          />
          {searchContactString ? (
            <UsersList
              items={userList}
              onItemClick={onClickChat}
              currentUserId={currentUser.id}
              className="feed__chat-list"
            />
          ) : (
            <ChatList
              items={chatList}
              onItemClick={onClickChat}
              className="feed__chat-list"
            />
          )}
        </div>
        {chatId ? <ChatRoom id={chatId} /> : null}
      </div>
      <UsersList
        items={userList}
        onUserClick={onUserClick}
        currentUserId={currentUser.id}
      />
    </PageWrapper>
  );
}

export default Feed;
