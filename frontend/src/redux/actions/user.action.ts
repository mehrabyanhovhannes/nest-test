import { createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from "jwt-decode";

import { UserApi } from '../../shared/api/user.api';
import { getToken, storeToken } from '../../shared/helpers/helper';
import { LoginModel, UserModel } from '../../shared/models/signModel';

export const loginUser = createAsyncThunk(
   'user/login',
   async (credentials: LoginModel) => {
      const result = await UserApi.login(credentials);
      if (result.error) {
         throw new Error(result.errorInfo);
      }
      storeToken(result.accessToken);
      const user: UserModel = jwtDecode(`${getToken()}`);
      return user;
   },
);

export const registerUser = createAsyncThunk(
   'user/register',
   async (data: UserModel) => {
      const {id, confirmPassword, ...body} = data;
      const result = await UserApi.register(body);
      if (result.error) {
         throw new Error(result.errorInfo);
      }
      storeToken(result.data.token);
      const user: UserModel = jwtDecode(`${getToken()}`);
      return user;
   },
);

export const getCurrentUser = createAsyncThunk(
   'user/current',
   async () => {
      const result: UserModel = jwtDecode(`${getToken()}`);
      return result;
   },
);

export const getAllUsers = createAsyncThunk(
   'user/all',
   async () => {
      const result = await UserApi.getAllUsers();
      return result;
   },
);
