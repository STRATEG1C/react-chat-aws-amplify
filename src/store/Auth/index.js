import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Auth } from 'aws-amplify';
import History from '../../helpers/history';

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  isRegistered: false
};

export const register = createAsyncThunk('Register', async ({ email, username, password, repeatPassword }) => {
  console.log(`Register user with ${email} and ${password}...`);
  await Auth.signUp({
    username: email,
    password,
    attributes: {
      email
    }
  });
});

export const login = createAsyncThunk('LOGIN', async ({ email, password }) => {
  const res = await Auth.signIn({
    username: email,
    password
  });

  const userSession = res.getSignInUserSession();

  return {
    ...res.attributes,
    username: res.username,
    idToken: userSession.getIdToken().getJwtToken(),
    accessToken: userSession.getAccessToken().getJwtToken()
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = null;
    },
    toggleLoading: state => {
      state.isLoading = !state.isLoading;
    }
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      History.push('/posts');
    },
    [login.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
    },

    [register.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isRegistered = false;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isRegistered = true;
    },
    [register.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isRegistered = false;
    }
  }
});

export const { setUser, clearUser, toggleLoading } = authSlice.actions;

export const selectCurrentUser = state => state.user;

export default authSlice.reducer;
