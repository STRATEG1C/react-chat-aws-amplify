import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../services/UserService';
import UserProvider from '../../providers/UserProvider';

const userService = new UserService(new UserProvider());

export const fetchUsers = createAsyncThunk('FETCH_USERS', async () => {
  const { items, next } = await userService.getList();
  return items;
});
