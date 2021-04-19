import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const ChatListItem = ({ room, ownUserId, onClick }) => {
  const onClickHandler = () => {
    onClick(room.id);
  }

  let partnerUser = room.subscriberID === ownUserId
    ? room.initiator
    : room.subscriber;

  return (
    <div key={room.id} onClick={onClickHandler}>
      <div className="chat-card">
        <div className="chat-card__avatar" />
        <div className="chat-card__info">
          <div className="chat-card__title">{partnerUser.username}</div>
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

export default ChatListItem;
