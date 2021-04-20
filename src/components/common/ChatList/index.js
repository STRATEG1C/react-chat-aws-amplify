import React from 'react';
import ChatListItem from './ChatListItem';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../store/Auth';

const ChatList = ({ items, onItemClick, className }) => {
  const currentUser = useSelector(state => selectCurrentUser(state.auth));

  return (
    <div className={`chat-list ${className}`}>
      <h2>Chat List</h2>
      {items.map((item) => (
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
