import { gql } from 'graphql-request';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';
import { type Role, type RoleListResponse } from './types';

export const getRolesAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getRolesList: builder.query<Role[], void>({
            providesTags: [GRAPHQL_TAGS.Roles],
            query: () => ({
                document: gql`
                    query GetRolesListQuery {
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
            transformResponse: (response: RoleListResponse) =>
                response.roleList,
        }),
    }),
});

export const { useGetRolesListQuery } = getRolesAPI;
