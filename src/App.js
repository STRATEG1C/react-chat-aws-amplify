import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectCurrentUser } from './store/Auth';
import { selectAllChats } from './store/Chat';
import { fetchChats } from './store/Chat/thunks';
import ChatService from './services/ChatService';
import ChatProvider from './providers/ChatProvider';
import Routing from './routing';
import { onCreateUserConversationByUserId } from './graphql/subscriptions';

const chatService = new ChatService(new ChatProvider());

const App = () => {
  const [chatRoomSubscriptions, setChatRoomSubscriptions] = useState([]);

  const dispatch = useDispatch();
  const currentUser = useSelector(state => selectCurrentUser(state.auth));
  const chatRooms = useSelector(state => selectAllChats(state.chat));

  const onNewChat = useCallback((newConversation) => {
    const { chatRoom } = newConversation;

    toast(`User ${chatRoom.initiator.username} wants to start conversation with you!`);
    setTimeout(() => {
      dispatch(fetchChats(currentUser.id));
    }, 500);
  }, [dispatch])

  const onUpdateChat = useCallback((updatedRoom) => {
    const { lastMessage } = updatedRoom;

    const url = window.location.href;
    if (url.includes(updatedRoom.id)) {
      return;
    }

    if (lastMessage.user.id !== currentUser.id) {
      toast(`New message from ${lastMessage.user.username}: ${lastMessage.content}`)
    }

    dispatch(fetchChats(currentUser.id));
  }, [dispatch]);

  useEffect(() => {
    if (!currentUser || !currentUser.id) {
      return;
    }

    const subscription = chatService.subscribeToCreateNewConversation(currentUser.id, onNewChat);

    return () => subscription.unsubscribe();
  }, [currentUser, onNewChat]);

  const unsubscribeFromRoomUpdates = () => {
    chatRoomSubscriptions.forEach(item => item.unsubscribe());
    setChatRoomSubscriptions([]);
  }

  const subscribeToRoomUpdates = () => {
    unsubscribeFromRoomUpdates();
    setChatRoomSubscriptions(chatRooms.map(item => {
      return chatService.subscribeToUpdateRoom(item.id, onUpdateChat);
    }));
  }

  useEffect(() => {
    if (!chatRooms.length) {
      return;
    }

    subscribeToRoomUpdates();

    return () => unsubscribeFromRoomUpdates();
  }, [chatRooms, chatRooms.length]);

  const onConversationUpdate = (updatedConversation) => {
    dispatch(fetchChats(currentUser.id));
  }

  useEffect(() => {
    if (!currentUser || !currentUser.id) {
      return;
    }

    const subscription = chatService.subscribeToUpdateOwnConversation(currentUser.id, onConversationUpdate);

    return () => subscription.unsubscribe();
  }, [currentUser, onNewChat]);

  return (
    <div className="app">
      <Routing />
    </div>
  )
};

export default App;
