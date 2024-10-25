import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type RootState } from '../store';
import { type User } from '../user/types';
import { type AuthState } from './types';

export const authSlice = createSlice({
    name: 'auth',
    reducerPath: 'authSlice',
    initialState: { user: null, token: null, error: null } as AuthState,
    reducers: {
        setCredentials: (
            state,
            {
                payload: { user, token, rememberMe },
            }: PayloadAction<{
                user: User;
                token: string;
                rememberMe: boolean;
            }>,
        ) => {
            state.user = user;
            state.token = token;

            if (rememberMe) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
            }
            state.error = null;
        },
        clearCredentials: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            state.error = null;
        },
        setErrorMessage(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

export const { setCredentials, clearCredentials, setErrorMessage } =
    authSlice.actions;

export const authSelector = (state: RootState) => state.authSlice;
