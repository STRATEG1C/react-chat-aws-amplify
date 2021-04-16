import React, { useEffect } from 'react';
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
import PageWrapper from '../../common/PageWrapper';
import AddMessageBlock from './AddMessageForm';
import LazyLoad from '../../common/LazyLoad';
import MessageList from './MessageList';

const chatService = new ChatService(new ChatProvider());

const MESSAGES_PER_PAGE = 20;

const ChatRoom = ({ match }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const chatRoomData = useSelector(state => selectChatRoom(state.chat));
  const chatRoomMessages = useSelector(state => selectMessages(state.chat));
  const nextChatMessages = useSelector(state => selectNextMessages(state.chat));
  const currentUser = useSelector(state => selectCurrentUser(state.auth));

  useEffect(async () => {
    const { chatId } = match.params;
    const userConversation = await chatService.getUserConversation(currentUser.id, chatId);

    if (!userConversation) {
      history.push('/');
    }

    dispatch(fetchChatRoom(chatId));
    dispatch(fetchMessages({ chatId, limit: MESSAGES_PER_PAGE }));
  }, []);

  const onReceiveNewMessage = (message) => {
    dispatch(addMessage(message));
  }

  useEffect(async () => {
    if (!chatRoomData) {
      return;
    }

    const { chatId } = match.params;
    const subscription = chatService.subscribeToChatRoom(chatId, onReceiveNewMessage);

    return () => subscription.unsubscribe();
  }, [chatRoomData])

  const onAddMessage = async (message) => {
    try {
      const { chatId } = match.params;
      const newMessage = await chatService.createChatMessage(chatId, currentUser.id, message);
      await chatService.updateChatRoom(chatId, {
        lastMessageID: newMessage.id
      });
    } catch (err) {
      console.log('Error while adding message', err);
    }
  }

  const onLoadMoreMessages = () => {
    const { chatId } = match.params;
    if (nextChatMessages) {
      dispatch(fetchMessages({ chatId, limit: MESSAGES_PER_PAGE, next: nextChatMessages }));
    }
  }

  if (!chatRoomData) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <PageWrapper title={`Chat with user`}>
      <Link to="/">To feed</Link>
      <AddMessageBlock onAdd={onAddMessage} />
      <LazyLoad
        onLoadMore={onLoadMoreMessages}
      >
        <MessageList
          messages={chatRoomMessages}
          ownUserId={currentUser.id}
        />
      </LazyLoad>
      <hr/>
    </PageWrapper>
  );
};

export default ChatRoom;
