import React, { useState } from 'react';

const AddMessageBlock = ({ onAdd }) => {
  const [message, setMessage] = useState('');

  const onPressKey = (e) => {
    if (e.key === 'Enter') {
      onAdd(message);
      setMessage('');
    }
  }

  return (
    <div className="add-message">
      <p>Input message</p>
      <textarea
        cols={60}
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={onPressKey}
      />
    </div>
  )
}

export default AddMessageBlock;
