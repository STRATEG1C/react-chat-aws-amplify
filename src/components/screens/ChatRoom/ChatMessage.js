import React from 'react';

const ChatMessage = ({ message, isOwn }) => {
  const { id, authorId, roomId, body } = message;

  return (
    <div className={`chat-message ${isOwn ? 'own' : ''}`}>
      {isOwn ? <b>Me: </b> : <b>Partner: </b>} { body }
    </div>
  );
};

export default ChatMessage;
