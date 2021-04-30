import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const ChatListItem = ({ room, ownUserId, isAccepted, lastSeenTime, onClick }) => {
  let partnerUser = room.subscriberID === ownUserId
    ? room.initiator
    : room.subscriber;

  const onClickHandler = () => onClick(room.id);

  const showUnreadMessages = () => {
    if (!room.lastMessage || !lastSeenTime) {
      return <span className="chat-card__badge">NEW</span>;
    }

    let unreadMessagesCount = 0;
    const lastMessageTime = new Date(room.lastMessage.createdAt).getTime();
    const isUnreadMessages = lastSeenTime < lastMessageTime;

    if (isUnreadMessages) {
      const messages = room.messages.items;
      messages.forEach(item => {
        const messageTime = new Date(item.createdAt).getTime();
        if (lastSeenTime < messageTime) {
          unreadMessagesCount++;
        }
      });
    }

    return isUnreadMessages
      ? <span className="chat-card__badge">{ unreadMessagesCount }</span>
      : null;
  }

  return (
    <div key={room.id} onClick={onClickHandler}>
      <div className="chat-card">
        { showUnreadMessages() }
        <div className="chat-card__avatar" />
        <div className="chat-card__info">
          <div className="chat-card__title">
            {partnerUser.username}&nbsp;
            {isAccepted ? '(NEW! Wait for accept)' : ''}
          </div>
          {room.lastMessage ? (
            <div className="chat-card__last-message chat-last-message">
              <span className="chat-last-message__from">{`${room.lastMessage.user.username}: `}</span>
              <span className="chat-last-message__message">{room.lastMessage.content}</span>
            </div>
          ): null}
        </div>
      </div>
    </div>
  )
}

ChatListItem.propTypes = {
  room: PropTypes.object.isRequired,
  ownUserId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  isAccepted: PropTypes.bool,
  lastSeenTime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onClick: PropTypes.func
}

ChatListItem.defaultProps = {
  isAccepted: false,
  onClick: () => {}
}

export default ChatListItem;
