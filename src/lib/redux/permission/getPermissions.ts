import { gql } from 'graphql-request';

import {
    type Permission,
    type PermissionListResponse,
} from '@/lib/redux/permission/types';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';

export const getPermissionAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getPermissionList: builder.query<
            {
                modules: string[];
                permissions: Record<string, Permission[]>;
            },
            void
        >({
            providesTags: [GRAPHQL_TAGS.Permissions],
            query: () => ({
                document: gql`
                    query GetPermissionListQuery {
                        permissionList {
                            module
                            permissions {
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
                    }
                `,
            }),
            transformResponse: (response: PermissionListResponse) => {
                const modules = response.permissionList.map((d) => {
                    return d.module;
                });

                const permissions: Record<string, Permission[]> = {};

                response.permissionList.forEach((d) => {
                    permissions[d.module] = d.permissions;
                });

                return {
                    modules,
                    permissions,
                };
            },
        }),
    }),
});

export const { useGetPermissionListQuery } = getPermissionAPI;
