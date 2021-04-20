import React from 'react';

const UsersList = ({ items, onItemClick, currentUserId }) => {
  const userList = items.filter(user => user.id !== currentUserId);

  return (
    <div className="users-list chat-list">
      <h2 className="users-list__heading">Users list</h2>
      <div className="users-list__list">
        {userList.map(item => (
          <div className="user-card chat-card" key={item.id} onClick={() => item.id !== currentUserId && onItemClick(item.id)}>
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
  )
};

export default UsersList;
