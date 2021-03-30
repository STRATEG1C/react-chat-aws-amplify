import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { selectCurrentChatRoom, setRoomData } from '../../../store/Chat';
import { fetchChatRoom } from '../../../store/Chat/thunks';
import { selectCurrentUser } from '../../../store/Auth';
import ChatService from '../../../services/ChatService';
import ChatProvider from '../../../providers/ChatProvider';
import PageWrapper from '../../common/PageWrapper';
import ChatMessage from './ChatMessage';
import AddMessageBlock from './AddMessageForm';

const chatService = new ChatService(new ChatProvider());

const ChatRoom = ({ match }) => {
  const dispatch = useDispatch();
  const chatRoomData = useSelector(state => selectCurrentChatRoom(state.chat));
  const isLoading = useSelector(state => state.chat.isLoading);
  const currentUser = useSelector(state => selectCurrentUser(state.auth));

  let subscription;

  useEffect(() => {
    const { chatId } = match.params;
    dispatch(fetchChatRoom(chatId));
  }, []);

  useEffect(() => {
    if (!chatRoomData) {
      return;
    }

    subscription = chatService.subscribeToRoom(chatRoomData.id, (newMessage) => {
      dispatch(setRoomData({
        ...chatRoomData,
        messages: [
          newMessage,
          ...chatRoomData.messages
        ]
      }));
    });

    return () => {
      subscription.unsubscribe();
    }
  }, [chatRoomData]);

  const onAddMessage = async (message) => {
    const { chatId } = match.params;

    const newMessage = {
      id: uuid(),
      chatId: chatId,
      authorId: currentUser.id,
      body: message
    };

    await chatService.createChatMessage(newMessage);
  }

  if (isLoading || !chatRoomData) {
    return (
      <div>Loading...</div>
    )
  }

  const { messages } = chatRoomData;

  return (
    <PageWrapper title={`Chat with ${
      chatRoomData.initiatorId === currentUser.id
        ? chatRoomData.subscriberUsername
        : chatRoomData.initiatorUsername
    }`}>
      <Link to="/">To feed</Link>
      <AddMessageBlock onAdd={onAddMessage} />
      <div className="chat-room">
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwn={currentUser.id === message.authorId}
          />
        ))}
      </div>
      <hr/>
    </PageWrapper>
  );
};

export default ChatRoom;
