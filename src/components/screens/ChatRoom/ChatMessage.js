import React from 'react';

const ChatMessage = ({ message, isOwn }) => {
  const { id, authorId, roomId, text } = message;

  return (
    <div className={`chat-message ${isOwn ? 'own' : ''}`}>
      {isOwn ? <b>Me: </b> : <b>Partner: </b>} { text }
    </div>
  );
};

export default ChatMessage;
