import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChatService from '../../../services/ChatService';
import ChatProvider from '../../../providers/ChatProvider';
import UserService from '../../../services/UserService';
import UserProvider from '../../../providers/UserProvider';
import { selectCurrentUser } from '../../../store/Auth';
import { selectAcceptedChats, selectBannedChats } from '../../../store/Chat';
import { fetchBannedChats, fetchChats } from '../../../store/Chat/thunks';
import PageWrapper from '../../common/PageWrapper';
import UsersList from '../../common/UsersList';
import ChatList from '../../common/ChatList';
import ChatRoom from '../ChatRoom';
import BannedChatList from './BannedChatList';
import './style.scss';

const chatService = new ChatService(new ChatProvider());
const userService = new UserService(new UserProvider());

const Feed = ({ match }) => {
  const [searchContactString, setSearchContactString] = useState('');
  const [userList, setUserList] = useState([]);

  const currentUser = useSelector(state => selectCurrentUser(state.auth));
  const history = useHistory();

  const onClickChat = (chatId) => {
    history.push(`/${chatId}`);
  }

  const chatList = useSelector(state => selectAcceptedChats(state.chat));
  const bannedChats = useSelector(state => selectBannedChats(state.chat));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChats(currentUser.id));
    dispatch(fetchBannedChats(currentUser.id));
  }, [currentUser.id, dispatch]);

  useEffect(() => {
    if (searchContactString.length < 3) {
      return;
    }

    userService.searchUser(searchContactString.toLowerCase())
      .then(users => {
        setUserList(users.items);
      });
  }, [searchContactString]);

  const onUserClick = async (userId) => {
    try {
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
        chatRoom = await chatService.createChatRoom(currentUser.id, userId);
        await chatService.createUserConversation(userId, chatRoom.id, false);
        await chatService.createUserConversation(currentUser.id, chatRoom.id, true);
      }

      if (searchContactString) {
        setSearchContactString('');
      }

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
              onItemClick={onUserClick}
              currentUserId={currentUser.id}
              className="feed__chat-list"
            />
          ) : (
            <ChatList
              items={chatList}
              onItemClick={onClickChat}
              ownUserId={currentUser.id}
              className="feed__chat-list"
            />
          )}
          {!!bannedChats.length && (
            <BannedChatList
              items={bannedChats}
              onItemClick={onClickChat}
              className="feed__chat-list"
            />
          )}
        </div>
        {chatId && <ChatRoom id={chatId} />}
      </div>
    </PageWrapper>
  );
}

export default Feed;
