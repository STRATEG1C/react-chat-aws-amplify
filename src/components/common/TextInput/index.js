import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const TextInput = ({ label, name, value, onChange, type, error, className }) => {
  const onChangeHandler = (e) => onChange && onChange(name, e.target.value);

  return (
    <div className="input-group">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChangeHandler}
        type={type}
        className={`input-group__input ${className}`}
        data-testid="text-input"
      />
      {error && <span className="error">{error}</span>}
    </div>
  )
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string
}

TextInput.defaultProps = {
  type: 'text',
  error: '',
  className: ''
}

export default TextInput;
