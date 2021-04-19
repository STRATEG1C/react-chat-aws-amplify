import React from 'react';

const ChatMessage = ({ message, isOwn }) => {
  const { content, user } = message;

  return (
    <div className={`chat-message ${isOwn ? 'chat-message-own' : ''}`}>
      <p className="chat-message__user">
        { user.username }
      </p>
      <p className="chat-message__text">
        { content }
      </p>
    </div>
  );
};

export default ChatMessage;
