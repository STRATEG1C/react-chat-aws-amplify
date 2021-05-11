import reducer from './index';
import { login, signOut } from './thunks';

describe('Test Auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      user: null,
      isLoading: false,
      isError: false
    });
  });

  it('should be in loading while login', () => {
    expect(reducer(undefined, {
      type: login.pending
    })).toEqual({
      user: null,
      isLoading: true,
      isError: false
    });
  });

  it('should set user after success login', () => {
    expect(reducer(undefined, {
      type: login.fulfilled,
      payload: { id: 1, username: 'Test' }
    })).toEqual({
      user: { id: 1, username: 'Test' },
      isLoading: false,
      isError: false
    });
  });

  it('should be in error if login fails', () => {
    expect(reducer(undefined, {
      type: login.rejected
    })).toEqual({
      user: null,
      isLoading: false,
      isError: true
    });
  });

  it('should clear user after success logout', () => {
    expect(reducer(undefined, {
      type: signOut.fulfilled
    })).toEqual({
      user: null,
      isLoading: false,
      isError: false
    });
  });

  it('should clear user if logout fails', () => {
    expect(reducer(undefined, {
      type: login.rejected
    })).toEqual({
      user: null,
      isLoading: false,
      isError: true
    });
  });
});
