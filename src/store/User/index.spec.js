import reducer from './index';
import { fetchUsers, login, signOut } from './thunks';

describe('Test User reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      items: [],
      isLoading: false,
      isError: false
    });
  });

  it('should be in loading while fetching users', () => {
    expect(reducer(undefined, {
      type: fetchUsers.pending
    })).toEqual({
      items: [],
      isLoading: true,
      isError: false
    });
  });

  it('should set users after success fetching', () => {
    expect(reducer(undefined, {
      type: fetchUsers.fulfilled,
      payload: {
        items: [
          {
            id: 1,
          },
          {
            id: 2,
          },
        ],
      },
    })).toEqual({
      items: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
      isLoading: false,
      isError: false
    });
  });

  it('should be in error if fetching users fails', () => {
    expect(reducer(undefined, {
      type: fetchUsers.rejected,
    })).toEqual({
      items: [],
      isLoading: false,
      isError: true
    });
  });
});
