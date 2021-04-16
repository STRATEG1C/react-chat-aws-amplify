import React from 'react';
import ChatMessage from './ChatMessage';

const MessageList = ({ messages, ownUserId }) => {
  return (
    <div className="message-list">
      {messages.map(message => (
        <ChatMessage
          key={message.id}
          message={message}
          isOwn={ownUserId === message.userID}
        />
      ))}
    </div>
  )
}

export default MessageList;
