import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ChatService from '../../../services/ChatService';
import ChatProvider from '../../../providers/ChatProvider';
import { selectCurrentUser } from '../../../store/Auth';
import PageWrapper from '../../common/PageWrapper';
import UsersList from '../../common/UsersList';
import ChatList from '../../common/ChatList';
import './style.css';
import ChatRoom from '../ChatRoom';

const chatService = new ChatService(new ChatProvider());

const Feed = ({ match }) => {
  const currentUser = useSelector(state => selectCurrentUser(state.auth));
  const history = useHistory();

  const onClickChat = (chatId) => {
    history.push(`/${chatId}`);
  }

  const onUserClick = async (userId) => {
    try {
      // 0. Check if user already has such conversation
      let chatRoom;

      const filter = {
        or: [
          {
            and: [
              { initiatorID: { eq: userId } },
              { subscriberID: { eq: currentUser.id } }
            ]
          },
          {
            and: [
              { initiatorID: { eq: currentUser.id } },
              { subscriberID: { eq: userId } }
            ]
          }
        ]
      }

      const rooms = await chatService.getChatRoomList(filter, 1);

      if (rooms.length) {
        chatRoom = rooms[0];
      } else {
        // 1. Create a new ChatRoom
        chatRoom = await chatService.createChatRoom(currentUser.id, userId);
        // 2. Add User to the ChatRoom
        await chatService.createUserConversation(userId, chatRoom.id);
        // 3. Add authenticated user to the ChatRoom
        await chatService.createUserConversation(currentUser.id, chatRoom.id);
      }

      // 4. Navigate user to the room
      history.push(`/chat/${chatRoom.id}`);
    } catch(err) {
      console.log('Error while creating a new chat room', err);
    }
  };

  const chatId = match?.params?.chatId;

  return (
    <PageWrapper title="Feed">
      <div className="flex">
        {/*<UsersList onUserClick={onUserClick} currentUser={currentUser.id} />*/}
        <ChatList
          onItemClick={onClickChat}
          className="feed__chat-list"
        />
        {chatId ? <ChatRoom id={chatId} /> : null}
      </div>
    </PageWrapper>
  );
}

export default Feed;
