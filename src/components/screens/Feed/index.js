import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChatService from '../../../services/ChatService';
import ChatProvider from '../../../providers/ChatProvider';
import { selectCurrentUser } from '../../../store/Auth';
import { selectAcceptedChats, selectBannedChats } from '../../../store/Chat';
import { fetchBannedChats, fetchChats } from '../../../store/Chat/thunks';
import { FEED } from '../../../constants/pathNames';
import PageWrapper from '../../common/PageWrapper';
import ChatList from '../../common/ChatList';
import ChatRoom from '../ChatRoom';
import BannedChatList from './BannedChatList';
import SearchUser from './SearchUser';
import './style.scss';

const chatService = new ChatService(new ChatProvider());

const Feed = ({ match }) => {
  const [searchContactString, setSearchContactString] = useState('');
  const [isSearchContainsValue, setIsSearchContainsValue] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => selectCurrentUser(state.auth));
  const chatList = useSelector(state => selectAcceptedChats(state.chat));
  const bannedChats = useSelector(state => selectBannedChats(state.chat));

  useEffect(() => {
    dispatch(fetchChats(currentUser.id));
    dispatch(fetchBannedChats(currentUser.id));
  }, [currentUser.id, dispatch]);

  const onChangeSearch = (value) => {
    setIsSearchContainsValue(value.trim());
  }

  const onClickChat = (chatId) => {
    history.push(`${FEED}${chatId}`);
  }

  const makeSearchRoomCondition = (userId, currentUserId) => {
    return {
      or: [
        {
          and: [
            { initiatorID: { eq: userId } },
            { subscriberID: { eq: currentUserId } },
          ],
        },
        {
          and: [
            { initiatorID: { eq: currentUserId } },
            { subscriberID: { eq: userId } },
          ],
        },
      ],
    };
  }

  const getChatRoomOrCreateNew = async (userId, currentUserId) => {
    let chatRoom;
    const filter = makeSearchRoomCondition(userId, currentUserId);
    const rooms = await chatService.getChatRoomList(filter, 1);

    if (rooms.length) {
      chatRoom = rooms[0];
    } else {
      chatRoom = await chatService.createChatRoom(currentUserId, userId);
      await chatService.createUserConversation(userId, chatRoom.id, false);
      await chatService.createUserConversation(currentUserId, chatRoom.id, true);
    }

    return chatRoom;
  }

  const onUserClick = async (user) => {
    try {
      const chatRoom = await getChatRoomOrCreateNew(user.id, currentUser.id);

      console.log(chatRoom);

      if (searchContactString) {
        setSearchContactString('');
      }

      history.push(`${FEED}${chatRoom.id}`);
    } catch(err) {
      console.log('Error while creating a new chat room', err);
    }
  };

  const chatId = match?.params?.chatId;

  return (
    <PageWrapper title="Feed">
      <div className="flex">
        <div className="contact-list">
          <SearchUser
            value={searchContactString}
            onChange={onChangeSearch}
            onSelectUser={onUserClick}
          />
          {!isSearchContainsValue && (
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
