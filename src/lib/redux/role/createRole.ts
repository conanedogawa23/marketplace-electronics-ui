import { gql } from 'graphql-request';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';

export const createRoleAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        createRole: builder.mutation<unknown, unknown>({
            invalidatesTags: [GRAPHQL_TAGS.Roles],
            query: () => ({
                variables: {
                    user: {
                        role: {
                            name: 'SampleRole1',
                            status: 'Active',
                        },
                    },
                },
                document: gql`
                    mutation CreateRoleMutation($role: RoleInput!) {
                        createRole(role: $role) {
                            _id
                            name
                            status
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

export const { useCreateRoleMutation } = createRoleAPI;
