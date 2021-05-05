import React from 'react';
import PropTypes from 'prop-types';

const UsersList = ({ items, onItemClick, currentUserId }) => {
  const userList = items.filter(user => user.id !== currentUserId);

  const onClickHandler = (userId) => {
    if (userId !== currentUserId) {
      onItemClick && onItemClick(userId);
    }
  }

  return (
    <div className="users-list chat-list">
      <h2 className="users-list__heading">Users list</h2>
      <div className="users-list__list">
        {userList.map(item => (
          <div data-testid="user-card" className="user-card chat-card" key={item.id} onClick={() => onClickHandler(item)}>
            <div className="chat-card__avatar" />
            <div className="chat-card__info">
              <div className="chat-card__title">
                {item.username}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

UsersList.propTypes = {
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
  currentUserId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default UsersList;
