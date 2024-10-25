import { type LoginResponse, type LoginUser } from '@/lib/redux/auth/types';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { LOGIN_MUTATION } from './auth.mutations';

export const authAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (build) => ({
        loginUserNew: build.mutation<
            LoginUser,
            {
                email: string;
                password: string;
            }
        >({
            query: ({ email, password }) => ({
                url: '/',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                document: LOGIN_MUTATION,
                variables: { email, password },
            }),

            transformResponse: (response: LoginResponse) => {
                return response.loginUser;
            },
        }),
    }),
});

export const { useLoginUserNewMutation } = authAPI;
