import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChatRoom, selectCurrentChatRoom, setRoomData } from '../../../store/Chat';
import PageWrapper from '../../common/PageWrapper';
import { selectCurrentUser, setUser } from '../../../store/Auth';
import ChatMessage from './ChatMessage';
import AddMessageBlock from './AddMessageForm';
import { API, graphqlOperation } from 'aws-amplify';
import { v4 as uuid } from 'uuid';
import { updateChatRoom } from '../../../graphql/mutations';
import { onUpdateChatRoom } from '../../../graphql/subscriptions';
import { Link } from 'react-router-dom';

const ChatRoom = ({ match }) => {
  const dispatch = useDispatch();
  const chatRoomData = useSelector(state => selectCurrentChatRoom(state.chat));
  const isLoading = useSelector(state => state.chat.isLoading);
  const currentUser = useSelector(state => selectCurrentUser(state.auth));

  let subscription;

  useEffect(() => {
    const { chatId } = match.params;
    dispatch(fetchChatRoom(chatId));

    subscription = API.graphql(
      {
        query: onUpdateChatRoom
      }
    ).subscribe({
      next(value) {
        const updatedRoom = value.value.data.onUpdateChatRoom;
        dispatch(setRoomData(updatedRoom));
      }
    });

    return () => {
      subscription.unsubscribe();
    }
  }, []);

  const onAddMessage = async (message) => {
    const { chatId } = match.params;

    const { messages, createdAt, updatedAt, ...rest } = chatRoomData;

    const newMessage = {
      id: uuid(),
      authorId: currentUser.id,
      text: message
    };

    const newMessages = [
      newMessage,
      ...chatRoomData.messages,
    ];

    const updatedData = {
      ...rest,
      messages: newMessages
    }

    console.log(updatedData);

    await API.graphql(graphqlOperation(updateChatRoom, {input: updatedData}));
  }

  if (isLoading || !chatRoomData) {
    return (
      <div>Loading...</div>
    )
  }

  const { messages } = chatRoomData;

  return (
    <PageWrapper title={`Chat with ${chatRoomData.subscriberUsername}`}>
      <Link to="/">To feed</Link>
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
      <AddMessageBlock onAdd={onAddMessage} />
    </PageWrapper>
  );
};

export default ChatRoom;
