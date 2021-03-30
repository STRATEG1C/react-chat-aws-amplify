import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';
import CognitoAuthProvider from '../../providers/AuthProvider';
import UserService from '../../services/UserService';
import UserProvider from '../../providers/UserProvider';

const authService = new AuthService(new CognitoAuthProvider());
const userService = new UserService(new UserProvider());

export const register = createAsyncThunk('Register', async ({ email, username, password, repeatPassword }) => {
  await authService.register({
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
    const res = await authService.login({
      username: email,
      password
    });

    const {sub, nickname} = res.attributes;
    let user = await userService.getById(sub);

    if (!user) {
      const userData = {
        id: sub,
        email: email,
        username: nickname
      };

      user = await userService.create(userData);
    }

    return user;
  } catch (error) {
    console.log(error);
  }
});

export const signOut = createAsyncThunk('SIGN_OUT', async () => {
  return await authService.logout();
});
