import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, selectAllUsers } from '../../../store/User';

const UsersList = ({ onUserClick, currentUser }) => {
  const userList = useSelector(state => selectAllUsers(state.user)).filter(user => user.id !== currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="users-list">
      <h2 className="users-list__heading">Users list</h2>
      <div className="users-list__list">
        {userList.map(item => (
          <div className="user-card" key={item.id} onClick={() => item.id !== currentUser && onUserClick(item.id)}>
            <p className="user-card__nickname">{item.username}</p>
          </div>
        ))}
      </div>
    </div>
  )
};

export default UsersList;
