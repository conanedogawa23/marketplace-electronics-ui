import { type User } from '../user/types';

export type AuthState = {
    user: User | null;
    token: string | null;
    error: string | null;
};

export type LoginResponse = {
    loginUser: LoginUser;
};

export interface LoginUser {
    token: string;
    user: User;
}
