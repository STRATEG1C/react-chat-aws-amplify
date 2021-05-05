import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
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
import LazyLoad from '../../common/LazyLoad';
import AcceptChatBlock from './AcceptChatBlock';
import AddMessageBlock from './AddMessageBlock';
import MessageList from './MessageList';
import './style.scss';
import { FEED } from '../../../constants/pathNames';

const chatService = new ChatService(new ChatProvider());

const MESSAGES_PER_PAGE = 30;

const ChatRoom = ({ id }) => {
  const [userConversation, setUserConversation] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const chatRoomData = useSelector(state => selectChatRoom(state.chat));
  const chatRoomMessages = useSelector(state => selectMessages(state.chat));
  const nextChatMessages = useSelector(state => selectNextMessages(state.chat));
  const currentUser = useSelector(state => selectCurrentUser(state.auth));

  const updateReadTime = useCallback(async () => {
    await chatService.updateConversation(userConversation.id, {
      lastSeenTime: new Date().toISOString()
    });
  }, [userConversation]);

  useEffect(() => {
    if (!userConversation) {
      return;
    }
    updateReadTime();
  }, [userConversation, updateReadTime]);

  useEffect(() => {
    if (!currentUser || !id) {
      return;
    }

    chatService.getUserConversation(currentUser.id, id)
      .then(userConversation => {
        if (!userConversation) {
          return history.push(FEED);
        }

        setUserConversation(userConversation);
        dispatch(fetchChatRoom(id));
        dispatch(fetchMessages({
          chatId: id,
          limit: MESSAGES_PER_PAGE
        }));
      });
  }, [id, currentUser, dispatch, history]);

  useEffect(() => {
    if (!chatRoomData) {
      return;
    }

    const newMessageSubscription = chatService.subscribeToChatRoom(chatRoomData.id, (message) => {
      dispatch(addMessage(message));
      updateReadTime();
    });

    return () => newMessageSubscription.unsubscribe();
  }, [chatRoomData, dispatch, id, updateReadTime]);

  const onAcceptConversation = async (state) => {
    if (!state) {
      await chatService.acceptConversation(userConversation.id);
      return history.push('/');
    }

    const updatedConversation = await chatService.acceptConversation(userConversation.id);
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

  const isChatWaitForAccept = userConversation.isWaitForAccept;
  const isChatBanned = !userConversation.isWaitForAccept && !userConversation.isAccepted;

  return (
    <div className="chat-room-wrapper">
      <Link to="/" className="back">{`<- Close`}</Link>
      {isChatWaitForAccept ? (
        <AcceptChatBlock onAccept={onAcceptConversation} />
      ) : (
        <AddMessageBlock onAdd={onAddMessage} />
      )}
      {isChatBanned && (
        <AcceptChatBlock onAccept={onAcceptConversation} />
      )}
      <LazyLoad
        onLoadMore={onLoadMoreMessages}
        className="message-scrollable-list"
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

ChatRoom.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired
};

export default ChatRoom;
