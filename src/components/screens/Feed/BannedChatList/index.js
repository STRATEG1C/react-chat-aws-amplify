import React from 'react';
import { useSelector } from 'react-redux';
import ChatListItem from '../../../common/ChatList/ChatListItem';
import { selectCurrentUser } from '../../../../store/Auth';

const BannedChatList = ({ items, onItemClick, className }) => {
  const currentUser = useSelector(state => selectCurrentUser(state.auth));

  return (
    <div className={`chat-list ${className}`}>
      <h2>Banned chats</h2>
      {items.map((item) => (
        <ChatListItem
          room={item.chatRoom}
          ownUserId={currentUser.id}
          isAccepted={item.isWaitForAccept}
          key={item.chatRoom.id}
          onClick={onItemClick}
          lastSeenTime={new Date(item.lastSeenTime).getTime()}
        />
      ))}
    </div>
  )
};

export default BannedChatList;
