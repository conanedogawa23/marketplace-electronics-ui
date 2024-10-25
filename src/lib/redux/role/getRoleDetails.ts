import { gql } from 'graphql-request';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';

export const getRoleDetailsAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getRoleDetails: builder.query<unknown, unknown>({
            providesTags: [GRAPHQL_TAGS.Roles],
            query: () => ({
                variables: { id: '' },
                document: gql`
                    query GetRoleDetailsQuery {
                        roleList {
                            _id
                            createdAt
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

export const { useGetRoleDetailsQuery } = getRoleDetailsAPI;
