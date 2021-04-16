import { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { selectCurrentUser } from './store/Auth';
import { addRoom, selectAllChats, updateRoom } from './store/Chat';
import ChatService from './services/ChatService';
import ChatProvider from './providers/ChatProvider';
import Routing from './routing';
import './App.css';

const chatService = new ChatService(new ChatProvider());

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => selectCurrentUser(state.auth));
  const chatRooms = useSelector(state => selectAllChats(state.chat));
  let subscriptionToCreateRooms = useRef(null);
  let subscriptionsToUpdateRooms = useRef([]);

  const onNewChat = useCallback((newRoom) => {
    toast('Somebody new wrote to you!');
    dispatch(addRoom(newRoom));
  }, [dispatch])

  const onUpdateChat = useCallback((updatedRoom) => {
    if (updatedRoom.lastMessageAuthorId !== currentUser.id) {
      const username = updatedRoom.lastMessageAuthorId === updatedRoom.initiatorId
        ? updatedRoom.initiatorUsername
        : updatedRoom.subscriberUsername;

      toast(`New message from ${username}: ${updatedRoom.lastMessage}`);
    }

    dispatch(updateRoom(updatedRoom));
  }, [dispatch]);

  useEffect(() => {

  }, []);

  useEffect(() => {
    // if (!currentUser || !currentUser.id) {
    //   return;
    // }
    //
    // subscriptionToCreateRooms.current = chatService.subscribeToCreationNewRoom(currentUser.id, onNewChat);
    //
    // return () => {
    //   subscriptionToCreateRooms.current.unsubscribe();
    // }
  }, [currentUser, onNewChat]);

  useEffect(() => {
    // if (!chatRooms.length) {
    //   return;
    // }
    //
    // const subscriptions = subscriptionsToUpdateRooms.current;
    //
    // subscriptions.forEach(subscription => subscription.unsubscribe());
    //
    // chatRooms.forEach(chat => {
    //   const subscription = chatService.subscribeToUpdateRoom(chat.id, (newRoom) => {
    //     onUpdateChat(newRoom);
    //   });
    //   subscriptions.push(subscription);
    // })
    //
    // return () => {
    //   subscriptions.forEach(subscription => subscription.unsubscribe());
    // }
  }, [chatRooms, onUpdateChat])

  return (
    <div className="app">
      <Routing />
    </div>
  )
};

export default App;
