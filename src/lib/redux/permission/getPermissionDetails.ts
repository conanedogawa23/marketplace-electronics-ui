import { gql } from 'graphql-request';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';

export const getPermissionDetailsAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getPermission: builder.query<unknown, unknown>({
            providesTags: [GRAPHQL_TAGS.User],
            query: () => ({
                variables: { id: '' },
                document: gql`
                    query GetPermissionDetailsQuery($id: ID!) {
                        findPermission(_id: $id) {
                            _id
                            accessLevel
                            createdAt
                            createdBy
                            description
                            feature
                            module
                            name
                            status
                            updatedAt
                            updatedBy
                            uuid
                        }
                    }
                `,
            }),
            // transformResponse: (response: unknown) => response.inventoryList,
        }),
    }),
});

export const { useGetPermissionQuery } = getPermissionDetailsAPI;
