import React from 'react';
import { Link } from 'react-router-dom';

const ChatListItem = ({ room, ownUserId }) => {
  let partnerUser = room.subscriberID === ownUserId
    ? room.initiator
    : room.subscriber;

  return (
    <Link key={room.id} to={`/chat/${room.id}`}>
      <div className="chat-card">
        <div className="chat-card__title">{partnerUser.username}</div>
        {room.lastMessage ? (
          <div className="chat-card__last-message chat-last-message">
            <span className="chat-last-message__from">{`${room.lastMessage.user.username}: `}</span>
            <span className="chat-last-message__message">{room.lastMessage.content}</span>
          </div>
        ): null}
      </div>
    </Link>
  )
}

export default ChatListItem;
