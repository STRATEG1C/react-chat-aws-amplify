import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddMessageBlock = ({ onAdd }) => {
  const [message, setMessage] = useState('');

  const onPressKey = (e) => {
    if (e.key !== 'Enter') {
      return;
    }

    onAdd(message);
    setMessage('');
  }

  return (
    <div className="add-message">
      <p>Type message:</p>
      <textarea
        cols={60}
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={onPressKey}
        role="text-area"
      />
    </div>
  )
}

AddMessageBlock.propTypes = {
  onAdd: PropTypes.func
};

AddMessageBlock.defaultProps = {
  onAdd: () => {}
};

export default AddMessageBlock;
