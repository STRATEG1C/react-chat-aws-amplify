import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Auth, graphqlOperation, API } from 'aws-amplify';
import { getUser } from '../../graphql/queries';
import { createUser } from '../../graphql/mutations';

const initialState = {
  user: null,
  isLoggedIn: false,
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
      email,
      nickname: username
    }
  });
});

export const login = createAsyncThunk('LOGIN', async ({ email, password }) => {
  try {
    const res = await Auth.signIn({
      username: email,
      password
    });

    const {sub, nickname} = res.attributes;
    const userQueryRes = await API.graphql(graphqlOperation(getUser, {id: sub}))
    let user = userQueryRes.data.getUser;

    if (!user) {
      const userData = {
        id: sub,
        email: email,
        username: nickname
      };
      const createUserRes = await API.graphql(graphqlOperation(createUser, {input: userData}))
      user = createUserRes.data.createUser;
    }

    return user;
  } catch (error) {
    console.log(error);
  }
});

export const signOut = createAsyncThunk('SIGN_OUT', async () => {
  return await Auth.signOut();
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
      state.isLoggedIn = false;
      state.isError = false;
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    [login.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isLoggedIn = false;
    },

    [register.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.isRegistered = false;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isRegistered = true;
    },
    [register.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isRegistered = false;
    },

    [signOut.pending]: (state, action) => {
      state.isLoading = true;
      state.isLoggedIn = false;
      state.isError = false;
    },
  }
});

export const { setUser, clearUser } = authSlice.actions;

export const selectCurrentUser = state => state.user;

export default authSlice.reducer;
