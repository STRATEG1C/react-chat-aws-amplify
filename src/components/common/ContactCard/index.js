import React from 'react';

const ContactCard = ({ contact, onClick }) => {
  const onClickHandler = () => {
    onClick(contact.id);
  }

  return (
    <div className="contact-card" onClick={onClickHandler}>
      <div className="contact-card__avatar">
      </div>
      <div className="contact-card__info">
        <p className="contact-card__username">{contact.username}</p>
      </div>
    </div>
  )
}

export default ContactCard;
