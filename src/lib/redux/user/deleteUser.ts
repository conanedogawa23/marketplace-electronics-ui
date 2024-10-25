import { gql } from 'graphql-request';

import { type DeleteUserResponse, type User } from '@/lib/redux/user/types';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';

export const deleteUserAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        deleteUserNew: builder.mutation<User, { id: string }>({
            invalidatesTags: [GRAPHQL_TAGS.Users],
            query: ({ id }) => ({
                variables: {
                    id,
                },
                document: gql`
                    mutation DeleteUserMutation($id: ID!) {
                        deleteUser(_id: $id) {
                            _id
                            createdAt
                            dateOfBirth
                            deleted
                            deletedAt
                            department
                            email
                            employeeId
                            employmentStatus
                            firstName
                            hireDate
                            lastName
                            permissions
                            phoneNumber
                            position
                            projects
                            role
                            salary
                            updatedAt
                            uuid
                        }
                    }
                `,
            }),
            transformResponse: (response: DeleteUserResponse) =>
                response.deleteUser,
        }),
    }),
});

export const { useDeleteUserNewMutation } = deleteUserAPI;
