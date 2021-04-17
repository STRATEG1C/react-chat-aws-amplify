import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllChats } from '../../../store/Chat';
import { fetchChats } from '../../../store/Chat/thunks';
import { selectCurrentUser } from '../../../store/Auth';
import ChatListItem from './ChatListItem';

const ChatList = () => {
  const currentUser = useSelector(state => selectCurrentUser(state.auth));
  const chatList = useSelector(state => selectAllChats(state.chat));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChats(currentUser.id));
  }, [currentUser.id, dispatch]);

  return (
    <div className="users-list">
      <h2 className="users-list__heading">Chats list</h2>
      <div className="users-list__list">
        {chatList.map(item => (
          <ChatListItem
            room={item.chatRoom}
            ownUserId={currentUser.id}
            key={item.chatRoom.id}
          />
        ))}
      </div>
    </div>
  )
};

export default ChatList;
