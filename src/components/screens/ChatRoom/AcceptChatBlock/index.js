import React from 'react';
import PropTypes from 'prop-types';

const AcceptChatBlock = ({ onAccept }) => {
  const onAcceptHandler = (state) => onAccept && onAccept(state);

  return (
    <div className="accept-chat">
      <p>Do you accept this conversation?</p>
      <button data-testid="accept-btn" onClick={onAcceptHandler.bind(this, true)}>Yes, I do</button>
      ---------
      <button data-testid="decline-btn" onClick={onAcceptHandler.bind(this, false)}>No, I don't</button>
    </div>
  )
}

AcceptChatBlock.proptTypes = {
  onAccept: PropTypes.func.isRequired
};

export default AcceptChatBlock;
