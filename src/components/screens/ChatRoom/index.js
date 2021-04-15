import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const { chatId, chatName } = match.params;

  const dispatch = useDispatch();
  const chatRoomData = useSelector(state => selectCurrentChatRoom(state.chat));
  const chatMessages = useSelector(state => selectRoomMessages(state.chat));
  const nextChatMessages = useSelector(state => selectNextMessages(state.chat));
  const currentUser = useSelector(state => selectCurrentUser(state.auth));

  useEffect(() => {
    dispatch(fetchChatRoom(chatId));
    dispatch(fetchMessages({ chatId, limit: MESSAGES_PER_PAGE }));
  }, [chatId, dispatch]);

  const onAddMessage = async (message) => {
    try {
      const { chatId } = match.params;

      const newMessage = {
        chatRoomId: chatId,
        userId: currentUser.id,
        content: message
      };

      await chatService.createChatMessage(newMessage);
    } catch (err) {
      console.log('Error while adding message', err);
    }
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
    <PageWrapper title={`Chat with ${chatName}`}>
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
            isOwn={currentUser.id === message.userId}
          />
        ))}
      </LazyLoad>
      <hr/>
    </PageWrapper>
  );
};

export default ChatRoom;
