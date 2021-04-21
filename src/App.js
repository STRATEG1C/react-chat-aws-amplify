import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectCurrentUser } from './store/Auth';
import { selectAcceptedChats } from './store/Chat';
import { fetchChats } from './store/Chat/thunks';
import ChatService from './services/ChatService';
import ChatProvider from './providers/ChatProvider';
import Routing from './routing';

const chatService = new ChatService(new ChatProvider());

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => selectCurrentUser(state.auth));
  const chatRooms = useSelector(state => selectAcceptedChats(state.chat));

  useEffect(() => {
    if (!currentUser || !currentUser.id) {
      return;
    }

    const onNewChat = (newConversation) => {
      const { chatRoom } = newConversation;
      if (chatRoom.initiatorID !== currentUser.id) {
        toast(`User ${chatRoom.initiator.username} wants to start conversation with you!`);
      }

      dispatch(fetchChats(currentUser.id));
    };

    const subscription = chatService.subscribeToCreateNewConversation(currentUser.id, onNewChat);

    return () => subscription.unsubscribe();
  });

  useEffect(() => {
    if (!currentUser || !chatRooms.length) {
      return;
    }

    const onUpdateChat = (updatedRoom) => {
      const { lastMessage } = updatedRoom;

      const url = window.location.href;
      if (url.includes(updatedRoom.id)) {
        return;
      }

      if (lastMessage.user.id !== currentUser.id) {
        toast(`New message from ${lastMessage.user.username}: ${lastMessage.content}`)
      }

      dispatch(fetchChats(currentUser.id));
    };

    const subscriptionBySubscriber = chatService.subscribeToUpdateRoomBySubscriberId(currentUser.id, onUpdateChat);
    const subscriptionByInitiator = chatService.subscribeToUpdateRoomByInitiatorId(currentUser.id, onUpdateChat);

    return () => {
      subscriptionBySubscriber.unsubscribe();
      subscriptionByInitiator.unsubscribe();
    };
  }, [chatRooms, currentUser, dispatch]);

  const onConversationUpdate = (updatedConversation) => {
    dispatch(fetchChats(currentUser.id));
  };

  useEffect(() => {
    if (!currentUser || !currentUser.id) {
      return;
    }

    const subscription = chatService.subscribeToUpdateOwnConversation(currentUser.id, onConversationUpdate);

    return () => subscription.unsubscribe();
  });

  return (
    <div className="app">
      <Routing />
    </div>
  )
};

export default App;
