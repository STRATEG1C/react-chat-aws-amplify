import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers } from '../../../store/User';
import { fetchUsers } from '../../../store/User/thunks';

const UsersList = ({ onUserClick, currentUser }) => {
  const userList = useSelector(state => selectAllUsers(state.user)).filter(user => user.id !== currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="users-list chat-list">
      <h2 className="users-list__heading">Users list</h2>
      <div className="users-list__list">
        {userList.map(item => (
          <div className="user-card chat-card" key={item.id} onClick={() => item.id !== currentUser && onUserClick(item.id)}>
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
