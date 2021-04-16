import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllChats } from '../../../store/Chat';
import { fetchChats } from '../../../store/Chat/thunks';
import { selectCurrentUser } from '../../../store/Auth';
import UserService from '../../../services/UserService';
import UserProvider from '../../../providers/UserProvider';

const userService = new UserService(new UserProvider());

const ChatList = () => {
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
        {chatList.map(item => {
          let partnerUser = item.chatRoom.subscriberID === currentUser.id
            ? item.chatRoom.initiator
            : item.chatRoom.subscriber;

          return (
            <Link key={item.id} to={`/chat/${item.chatRoom.id}`}>
              <div className="user-card">
                <p className="user-card__nickname">{partnerUser.username}</p>
                {item.chatRoom.lastMessage ? (
                  <p>
                    <b>{`${item.chatRoom.lastMessage.user.username}: `}</b>
                    <span>{item.chatRoom.lastMessage.content}</span>
                  </p>
                ): null}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
};

export default ChatList;
