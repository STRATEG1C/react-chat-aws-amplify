import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllChats } from '../../../store/Chat';
import { fetchChats } from '../../../store/Chat/thunks';
import { selectCurrentUser } from '../../../store/Auth';
import ChatListItem from './ChatListItem';

const ChatList = ({ onItemClick, className }) => {
  const currentUser = useSelector(state => selectCurrentUser(state.auth));
  const chatList = useSelector(state => selectAllChats(state.chat));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChats(currentUser.id));
  }, [currentUser.id, dispatch]);

  return (
    <div className={`chat-list ${className}`}>
      <h2>Chat List</h2>
      {chatList.map((item) => (
        <ChatListItem
          room={item.chatRoom}
          ownUserId={currentUser.id}
          isAccepted={item.isWaitForAccept}
          key={item.chatRoom.id}
          onClick={onItemClick}
        />
      ))}
    </div>
  )
};

export default ChatList;
