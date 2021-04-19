import React from 'react';

const AcceptChatBlock = ({ onAccept }) => {
  return (
    <div className="accept-chat">
      <p>Do you accept this conversation?</p>
      <button onClick={() => onAccept(true)}>Yes, I do</button>
      ---------
      <button onClick={() => onAccept(false)}>No, I don't</button>
    </div>
  )
}

export default AcceptChatBlock;
