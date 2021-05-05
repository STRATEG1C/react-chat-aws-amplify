import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const ChatMessage = ({ message, isOwn }) => {
  const { content, user } = message;

  return (
    <div role="chat-message" className={`chat-message ${isOwn ? 'chat-message-own' : ''}`}>
      <p className="chat-message__user">
        { user.username }
      </p>
      <p className="chat-message__text">
        { content }
      </p>
    </div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.object.isRequired,
  isOwn: PropTypes.bool
};

ChatMessage.defaultProps = {
  isOwn: false
};

export default ChatMessage;
