import React from 'react';

const ChatMessage = ({ message, isOwn }) => {
  const { content } = message;

  return (
    <div className={`chat-message ${isOwn ? 'own' : ''}`}>
      {isOwn ? <b>Me: </b> : <b>Partner: </b>} { content }
    </div>
  );
};

export default ChatMessage;
