import { createSlice } from '@reduxjs/toolkit';
import { StatusInterface, UserModel } from '../../shared/models/signModel';
import { UserReducerInterface } from '../../shared/models/userModel/reducerModel';
import { getAllUsers, getCurrentUser, loginUser, registerUser } from '../actions';

const initialState: UserReducerInterface = {
   loading: false,
   currentUser: {},
   users: [],
   error: null,
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
   },
   extraReducers: (builder) => {
      builder
         .addCase(loginUser.pending, (state) => {
            state.loading = true;
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            const data = action.payload;
            state.loading = false;
            if(data) {
               state.currentUser = data;
               state.error = null;
            } else {
               state.currentUser = {};
            }
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.currentUser = {};
         })
         .addCase(registerUser.pending, (state) => {
            state.loading = true;
         })
         .addCase(registerUser.fulfilled, (state, action) => {
            const data = action.payload;
            state.loading = false;
            if(data) {
               state.currentUser = data;
               state.error = null;
            } else {
               state.currentUser = {};
            }
         })
         .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.currentUser = {};
         })
         .addCase(getCurrentUser.pending, (state) => {
            state.loading = true;
         })
         .addCase(getCurrentUser.fulfilled, (state, action) => {
            const data: UserModel = action.payload;
            state.loading = false;
            if(data) {
               state.currentUser = data;
               state.error = null;
            } else {
               state.currentUser = {};
            }
         })
         .addCase(getCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.currentUser = {};
         })
         .addCase(getAllUsers.pending, (state) => {
            state.loading = true;
         })
         .addCase(getAllUsers.fulfilled, (state, action) => {
            const data: Array<UserModel & StatusInterface> = action.payload;
            state.loading = false;
            if(Array.isArray(data)) {
               state.users = data;
               state.error = null;
            } else {
               state.users = [];
            }
         })
         .addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.users = [];
         })
   },
});

export default userSlice.reducer;
