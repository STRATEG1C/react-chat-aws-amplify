import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats, selectAllChats } from '../../../store/Chat';
import { selectCurrentUser } from '../../../store/Auth';

const ChatList = ({ onChatClick }) => {
  const currentUser = useSelector(state => selectCurrentUser(state.auth));
  const chatList = useSelector(state => selectAllChats(state.chat));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChats(currentUser.id));
  }, [currentUser.id, dispatch]);

  return (
    <div className="users-list">
      <h2 className="users-list__heading">Chats list</h2>
      <div className="users-list__list">
        {chatList.map(item => (
          <div className="user-card" key={item.id} onClick={() => onChatClick(item.id)}>
            <p className="user-card__nickname">{
              currentUser.id === item.initiatorId
                ? item.subscriberUsername
                : item.initiatorUsername
            }</p>
          </div>
        ))}
      </div>
    </div>
  )
};

export default ChatList;
