import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { prepareHeaders } from '../helpers/prepareHeaders';
import {
    CREATE_USER_MUTATION,
    DELETE_USER_MUTATION,
    UPDATE_USER_MUTATION,
} from './user.mutations';
import { USER_LIST_QUERY } from './user.queries';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.API_ENDPOINT,
        prepareHeaders: (headers, { getState }: any) => {
            const mutations = prepareHeaders(getState());
            if (mutations?.Authorization) {
                headers.set('Authorization', mutations?.Authorization);
            }
            return headers;
        },
    }),
    tagTypes: ['User'],
    endpoints: (build) => ({
        createUser: build.mutation({
            query: (user) => ({
                url: '/',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: CREATE_USER_MUTATION,
                    variables: { user },
                }),
            }),
            transformResponse: (response: any) => response.data.createUser,
            invalidatesTags: ['User'],
        }),
        updateUser: build.mutation({
            query: ({ id, user }) => ({
                url: '/',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: UPDATE_USER_MUTATION,
                    variables: { id, user },
                }),
            }),
            transformResponse: (response: any) => response.data.updateUser,
            invalidatesTags: ['User'],
        }),
        deleteUser: build.mutation({
            query: (id) => ({
                url: '/',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: DELETE_USER_MUTATION,
                    variables: { id },
                }),
            }),
            transformResponse: (response: any) => response.data.deleteUser,
            invalidatesTags: ['User'],
        }),
        listUser: build.query({
            query: () => ({
                url: '/',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: USER_LIST_QUERY,
                }),
            }),
            transformResponse: (response: any) => {
                return response.data.userList;
            },
        }),
    }),
});

export const {
    useCreateUserMutation,
    useDeleteUserMutation,
    useUpdateUserMutation,
    useListUserQuery,
    useLazyListUserQuery,
} = userApi;
