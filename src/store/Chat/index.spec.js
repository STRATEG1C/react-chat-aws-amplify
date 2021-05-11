import reducer from './index';
import {
  fetchChats,
  fetchBannedChats,
  fetchChatRoom,
  fetchMessages,
} from './thunks';
import {
  addRoom,
  updateRoom,
  addMessage,
  selectAcceptedChats,
  selectBannedChats,
  selectMessages,
  selectChatRoom,
  selectNextMessages
} from './index';

describe('Test Chat reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      chatRooms: [],
      bannedChats: [],
      chatRoom: null,
      messages: [],
      isLoading: false,
      isError: false,
      nextMessages: ''
    });
  });

  it('should be in loading while fetching chats', () => {
    expect(reducer(undefined, {
      type: fetchChats.pending
    })).toEqual({
      chatRooms: [],
      bannedChats: [],
      chatRoom: null,
      messages: [],
      isLoading: true,
      isError: false,
      nextMessages: ''
    });
  });

  it('should set chats after success fetching', () => {
    expect(reducer(undefined, {
      type: fetchChats.fulfilled,
      payload: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
    })).toEqual({
      chatRooms: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
      bannedChats: [],
      chatRoom: null,
      messages: [],
      isLoading: false,
      isError: false,
      nextMessages: ''
    });
  });

  it('should be in error if fetching chats fails', () => {
    expect(reducer(undefined, {
      type: fetchChats.rejected
    })).toEqual({
      chatRooms: [],
      bannedChats: [],
      chatRoom: null,
      messages: [],
      isLoading: false,
      isError: true,
      nextMessages: ''
    });
  });

  it('should be in loading while fetching banned chats', () => {
    expect(reducer(undefined, {
      type: fetchBannedChats.pending
    })).toEqual({
      chatRooms: [],
      bannedChats: [],
      chatRoom: null,
      messages: [],
      isLoading: true,
      isError: false,
      nextMessages: ''
    });
  });

  it('should set banned chats after success fetching', () => {
    expect(reducer(undefined, {
      type: fetchBannedChats.fulfilled,
      payload: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
    })).toEqual({
      chatRooms: [],
      bannedChats: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
      chatRoom: null,
      messages: [],
      isLoading: false,
      isError: false,
      nextMessages: ''
    });
  });

  it('should be in error if fetching banned chats fails', () => {
    expect(reducer(undefined, {
      type: fetchChats.rejected
    })).toEqual({
      chatRooms: [],
      bannedChats: [],
      chatRoom: null,
      messages: [],
      isLoading: false,
      isError: true,
      nextMessages: ''
    });
  });

  it('should be in loading while fetching chat room', () => {
    expect(reducer(undefined, {
      type: fetchChatRoom.pending
    })).toEqual({
      chatRooms: [],
      bannedChats: [],
      chatRoom: null,
      messages: [],
      isLoading: true,
      isError: false,
      nextMessages: ''
    });
  });

  it('should set chat room after success fetching', () => {
    expect(reducer(undefined, {
      type: fetchChatRoom.fulfilled,
      payload: {
        id: 1
      },
    })).toEqual({
      chatRooms: [],
      bannedChats: [],
      chatRoom: { id: 1 },
      messages: [],
      isLoading: false,
      isError: false,
      nextMessages: ''
    });
  });

  it('should be in error if fetching chat room fails', () => {
    expect(reducer(undefined, {
      type: fetchChats.rejected
    })).toEqual({
      chatRooms: [],
      bannedChats: [],
      chatRoom: null,
      messages: [],
      isLoading: false,
      isError: true,
      nextMessages: ''
    });
  });

  it('should be in loading while fetching messages', () => {
    expect(reducer({
      chatRooms: [],
      bannedChats: [],
      chatRoom: { id: 1 },
      messages: [],
      isLoading: true,
      isError: false,
      nextMessages: ''
    }, {
      type: fetchMessages.pending
    })).toEqual({
      chatRooms: [],
      bannedChats: [],
      chatRoom: { id: 1 },
      messages: [],
      isLoading: true,
      isError: false,
      nextMessages: ''
    });
  });

  it('should set messages after success fetching', () => {
    expect(reducer({
      chatRooms: [],
      bannedChats: [],
      chatRoom: { id: 1 },
      messages: [],
      isLoading: true,
      isError: false,
      nextMessages: ''
    }, {
      type: fetchMessages.fulfilled,
      payload: {
        items: [
          {
            id: 1,
          },
          {
            id: 2,
          },
        ],
        nextToken: 'token'
      },
    })).toEqual({
      chatRooms: [],
      bannedChats: [],
      chatRoom: { id: 1 },
      messages: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
      isLoading: false,
      isError: false,
      nextMessages: 'token'
    });
  });

  it('should be in error if fetching messages fails', () => {
    expect(reducer({
      chatRooms: [],
      bannedChats: [],
      chatRoom: { id: 1 },
      messages: [],
      isLoading: true,
      isError: false,
      nextMessages: ''
    }, {
      type: fetchMessages.rejected
    })).toEqual({
      chatRooms: [],
      bannedChats: [],
      chatRoom: { id: 1 },
      messages: [],
      isLoading: false,
      isError: true,
      nextMessages: ''
    });
  });
});
