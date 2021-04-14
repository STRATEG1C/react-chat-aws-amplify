import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { selectCurrentChatRoom, selectNextMessages, selectRoomMessages, setMessages } from '../../../store/Chat';
import { fetchChatRoom, fetchMessages } from '../../../store/Chat/thunks';
import { selectCurrentUser } from '../../../store/Auth';
import ChatService from '../../../services/ChatService';
import ChatProvider from '../../../providers/ChatProvider';
import PageWrapper from '../../common/PageWrapper';
import ChatMessage from './ChatMessage';
import AddMessageBlock from './AddMessageForm';
import LazyLoad from '../../common/LazyLoad';

const chatService = new ChatService(new ChatProvider());

const MESSAGES_PER_PAGE = 20;

const ChatRoom = ({ match }) => {
  const { chatId } = match.params;

  const dispatch = useDispatch();
  const chatRoomData = useSelector(state => selectCurrentChatRoom(state.chat));
  const chatMessages = useSelector(state => selectRoomMessages(state.chat));
  const nextChatMessages = useSelector(state => selectNextMessages(state.chat));
  const currentUser = useSelector(state => selectCurrentUser(state.auth));

  let subscription = useRef(null);

  useEffect(() => {
    dispatch(fetchChatRoom(chatId));
    dispatch(fetchMessages({ chatId, limit: MESSAGES_PER_PAGE }));
  }, [chatId, dispatch]);

  useEffect(() => {
    if (!chatRoomData) {
      return;
    }

    subscription.current = chatService.subscribeToRoom(chatRoomData.id, (newMessage) => {
      dispatch(setMessages([
        newMessage,
        ...chatMessages
      ]));
    });

    return () => {
      subscription.current.unsubscribe();
    }
  }, [chatRoomData, chatMessages, dispatch]);

  const onAddMessage = async (message) => {
    const { chatId } = match.params;

    const newMessage = {
      id: uuid(),
      chatId: chatId,
      authorId: currentUser.id,
      body: message
    };

    const { createdAt, updatedAt, messages, ...restChatRoomData } = chatRoomData;

    await chatService.createChatMessage(newMessage);
    await chatService.update(chatId, {
      ...restChatRoomData,
      lastMessage: message,
      lastMessageAuthorId: currentUser.id
    });
  }

  const onLoadMoreMessages = () => {
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
    <PageWrapper title={`Chat with ${
      chatRoomData.initiatorId === currentUser.id
        ? chatRoomData.subscriberUsername
        : chatRoomData.initiatorUsername
    }`}>
      <Link to="/">To feed</Link>
      <AddMessageBlock onAdd={onAddMessage} />
      <LazyLoad
        className="chat-room"
        onLoadMore={onLoadMoreMessages}
      >
        {chatMessages.map(message => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwn={currentUser.id === message.authorId}
          />
        ))}
      </LazyLoad>
      <hr/>
    </PageWrapper>
  );
};

export default ChatRoom;
