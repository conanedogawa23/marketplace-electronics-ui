import { gql } from 'graphql-request';

import { type User, type UserListResponse } from '@/lib/redux/user/types';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';

export const getUserAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getUserList: builder.query<{users: User[], hasMore: boolean },  { page?: number; filter?: { admin?: boolean } }>({
            providesTags: [GRAPHQL_TAGS.Users],
            query: ({ page, filter } = {}) => ({
                document: gql`
                    query UserList(
                        $after: Int
                        $first: Int
                        $filter: UserInput
                    ) {
                        userList(
                            after: $after
                            first: $first
                            filter: $filter
                        ) {
                            hasMore
                            users {
                                employeeId
                                email
                                uuid
                                updatedAt
                                salary
                                position
                                phoneNumber
                                lastName
                                hireDate
                                firstName
                                employmentStatus
                                deletedAt
                                deleted
                                dateOfBirth
                                createdAt
                                admin
                            }
                        }
                    }
                `,
                variables: {
                    first: 20,
                    after: page ? page * 20 : 0,
                    filter: filter ? filter : {},
                },
            }),
            transformResponse: (response: UserListResponse) => {
                return response.userList;
            },
        }),
    }),
});

export const { useGetUserListQuery } = getUserAPI;
