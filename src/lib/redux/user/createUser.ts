import { gql } from 'graphql-request';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';
import {
    type CreateUserParams,
    type CreateUserResponse,
    type User,
} from './types';

export const createUserAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        createUser: builder.mutation<User, CreateUserParams>({
            invalidatesTags: [GRAPHQL_TAGS.Users],
            query: (variables) => ({
                variables,
                document: gql`
                    mutation CreateUserMutation($user: UserInput!) {
                        createUser(user: $user) {
                            firstName
                            lastName
                            email
                            phoneNumber
                            department
                            role
                            projects
                            permissions
                        }
                    }
                `,
            }),
            transformResponse: (response: CreateUserResponse) =>
                response.createUser,
        }),
    }),
});

export const { useCreateUserMutation } = createUserAPI;
