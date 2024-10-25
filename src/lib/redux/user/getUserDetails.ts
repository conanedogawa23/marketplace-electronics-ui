import { gql } from 'graphql-request';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';

export const getUserDetailsAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query<unknown, unknown>({
            providesTags: [GRAPHQL_TAGS.User],
            query: () => ({
                variables: { id: '6601cc65517a7d7e0d4838f1' },
                document: gql`
                    query GetUserDetailsQuery($id: ID!) {
                        user(_id: $id) {
                            _id
                            createdAt
                            dateOfBirth
                            department
                            email
                            employeeId
                            employmentStatus
                            firstName
                            hireDate
                            lastName
                            phoneNumber
                            position
                            role
                            salary
                            updatedAt
                            uuid
                        }
                    }
                `,
            }),
            // transformResponse: (response: unknown) => response.inventoryList,
        }),
    }),
});

export const { useGetUserQuery } = getUserDetailsAPI;
