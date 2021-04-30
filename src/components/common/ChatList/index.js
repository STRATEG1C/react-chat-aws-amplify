import React from 'react';
import PropTypes from 'prop-types';
import ChatListItem from './ChatListItem';

const ChatList = ({ items, onItemClick, ownUserId, className }) => {
  return (
    <div className={`chat-list ${className}`}>
      <h2>Chat List</h2>
      {items.map((item) => (
        <ChatListItem
          room={item.chatRoom}
          ownUserId={ownUserId}
          isAccepted={item.isWaitForAccept}
          key={item.chatRoom.id}
          onClick={onItemClick}
          lastSeenTime={new Date(item.lastSeenTime).getTime()}
        />
      ))}
    </div>
  )
};

ChatList.propTypes = {
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func,
  ownUserId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  className: PropTypes.string
};

ChatList.defaultProps = {
  onItemClick: () => {},
  className: ''
};

export default ChatList;
