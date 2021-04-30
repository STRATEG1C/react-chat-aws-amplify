import React from 'react';
import PropTypes from 'prop-types';
import ChatMessage from './ChatMessage';
import './style.scss';

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
};

MessageList.propTypes = {
  messages: PropTypes.array.isRequired,
  ownUserId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

export default MessageList;
