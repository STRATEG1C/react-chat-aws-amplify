import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ChatListItem from '../../../common/ChatList/ChatListItem';
import { selectCurrentUser } from '../../../../store/Auth';

const BannedChatList = ({ items, onItemClick, className }) => {
  const currentUser = useSelector(state => selectCurrentUser(state.auth));

  const onClickHandler = id => onItemClick && onItemClick(id);

  return (
    <div className={`chat-list ${className}`}>
      <h2>Banned chats</h2>
      {items.map((item) => (
        <ChatListItem
          room={item.chatRoom}
          ownUserId={currentUser.id}
          isAccepted={item.isWaitForAccept}
          key={item.chatRoom.id}
          onClick={onClickHandler}
          lastSeenTime={new Date(item.lastSeenTime).getTime()}
        />
      ))}
    </div>
  )
};

BannedChatList.propTypes = {
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func,
  className: PropTypes.string
};

BannedChatList.defaultProps = {
  onItemClick: () => {},
  className: ''
};

export default BannedChatList;
