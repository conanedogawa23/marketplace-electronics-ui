import { gql } from 'graphql-request';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';

export const updateUserAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation<unknown, unknown>({
            invalidatesTags: [GRAPHQL_TAGS.Users],
            query: () => ({
                variables: {
                    user: {
                        _id: '6601cc65517a7d7e0d4838f1',
                        department: 'Delivery',
                        email: 'bala1219+3@gmail.com',
                        employeeId: 'EMP2244',
                        employmentStatus: 'Active',
                        firstName: 'Test',
                        lastName: 'User',
                        password: 'Test123',
                        position: 'Engineer',
                        role: '6601cc65517a7d7e0d4838f2',
                        salary: 1000.2,
                    },
                },
                document: gql`
                    mutation UpdateUserMutation($user: UserInput!) {
                        updateUser(user: $user) {
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

export const { useUpdateUserMutation } = updateUserAPI;
