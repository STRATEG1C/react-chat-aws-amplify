import React from 'react';
import PropTypes from 'prop-types';

const AcceptChatBlock = ({ onAccept }) => {
  const onAcceptHandler = (state) => onAccept(state);

  return (
    <div className="accept-chat">
      <p>Do you accept this conversation?</p>
      <button onClick={onAcceptHandler.bind(this, true)}>Yes, I do</button>
      ---------
      <button onClick={onAcceptHandler.bind(this, false)}>No, I don't</button>
    </div>
  )
}

AcceptChatBlock.proptTypes = {
  onAccept: PropTypes.func
};

AcceptChatBlock.defaultProps = {
  onAccept: () => {}
};

export default AcceptChatBlock;
