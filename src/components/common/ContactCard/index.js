import React from 'react';
import PropTypes from 'prop-types';

const ContactCard = ({ contact, onClick }) => {
  return (
    <div className="contact-card" onClick={onClick}>
      <div className="contact-card__avatar">
      </div>
      <div className="contact-card__info">
        <p className="contact-card__username">{contact.username}</p>
      </div>
    </div>
  )
}

ContactCard.propTypes = {
  contact: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

ContactCard.defaultProps = {
  onClick: () => {}
};

export default ContactCard;
