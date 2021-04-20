import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  addMessage,
  selectChatRoom,
  selectMessages,
  selectNextMessages,
} from '../../../store/Chat';
import { fetchChatRoom, fetchMessages } from '../../../store/Chat/thunks';
import { selectCurrentUser } from '../../../store/Auth';
import ChatService from '../../../services/ChatService';
import ChatProvider from '../../../providers/ChatProvider';
import AddMessageBlock from './AddMessageForm';
import LazyLoad from '../../common/LazyLoad';
import MessageList from './MessageList';
import AcceptChatBlock from './AcceptChatBlock';
import './style.scss';

const chatService = new ChatService(new ChatProvider());

const MESSAGES_PER_PAGE = 20;

const ChatRoom = ({ id }) => {
  const [userConversation, setUserConversation] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();
  const chatRoomData = useSelector(state => selectChatRoom(state.chat));
  const chatRoomMessages = useSelector(state => selectMessages(state.chat));
  const nextChatMessages = useSelector(state => selectNextMessages(state.chat));
  const currentUser = useSelector(state => selectCurrentUser(state.auth));

  useEffect(async () => {
    const userConversation = await chatService.getUserConversation(currentUser.id, id);

    if (!userConversation) {
      history.push('/');
    }

    setUserConversation(userConversation);

    dispatch(fetchChatRoom(id));
    dispatch(fetchMessages({
      chatId: id,
      limit: MESSAGES_PER_PAGE
    }));
  }, []);

  const onReceiveNewMessage = (message) => {
    dispatch(addMessage(message));
  }

  useEffect(async () => {
    if (!chatRoomData) {
      return;
    }

    const subscription = chatService.subscribeToChatRoom(id, onReceiveNewMessage);

    return () => subscription.unsubscribe();
  }, [chatRoomData])

  const onAcceptConversation = async (state) => {
    const updatedConversation = await chatService.updateConversation(userConversation.id, {
      isWaitForAccept: false,
      isAccepted: state
    });

    if (!state) {
      return history.push('/');
    }

    setUserConversation(updatedConversation);
  }

  const onAddMessage = async (message) => {
    try {
      const newMessage = await chatService.createChatMessage(id, currentUser.id, message);
      await chatService.updateChatRoom(id, {
        lastMessageID: newMessage.id
      });
    } catch (err) {
      console.log('Error while adding message', err);
    }
  }

  const onLoadMoreMessages = () => {
    if (nextChatMessages) {
      dispatch(fetchMessages({ chatId: id, limit: MESSAGES_PER_PAGE, next: nextChatMessages }));
    }
  }

  if (!userConversation || !chatRoomData) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className="chat-room-wrapper">
      <Link to="/" className="back">{`<- Close`}</Link>
      {userConversation.isWaitForAccept ? <AcceptChatBlock onAccept={onAcceptConversation} /> : <AddMessageBlock onAdd={onAddMessage} />}
      <LazyLoad
        onLoadMore={onLoadMoreMessages}
        className="message-scrollable-list "
      >
        <MessageList
          messages={chatRoomMessages}
          ownUserId={currentUser.id}
        />
      </LazyLoad>
      <hr/>
    </div>
  );
};

export default ChatRoom;
