import { gql } from 'graphql-request';

import {
    type Department,
    type GetDepartmentListResponse,
} from '@/lib/redux/department/types';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';

type DepartmentQueryFields =
    | '_id'
    | 'createdAt'
    | 'createdBy'
    | 'deleted'
    | 'deletedAt'
    | 'deletedBy'
    | 'deletedNote'
    | 'deletedReason'
    | 'description'
    | 'name'
    | 'status'
    | 'updatedAt'
    | 'updatedBy'
    | 'uuid';

export const getDepartmentsAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getDepartmentList: builder.query<
            Partial<Department>[],
            { fields: DepartmentQueryFields[] } | void
        >({
            providesTags: [GRAPHQL_TAGS.Departments],
            query: (params) => ({
                document: params?.fields?.length
                    ? gql`
                          query GetDepartmentList {
                              departmentList {
                                  departments {
                                      ${params.fields.join('\n')}
                                  }
                                  hasMore
                              }
                          }
                      `
                    : gql`
                          query GetDepartmentList {
                              departmentList {
                                  departments {
                                      _id
                                      createdAt
                                      createdBy
                                      deleted
                                      deletedAt
                                      deletedBy
                                      deletedNote
                                      deletedReason
                                      description
                                      name
                                      status
                                      updatedAt
                                      updatedBy
                                      uuid
                                  }
                                  hasMore
                              }
                          }
                      `,
            }),
            transformResponse: (response: GetDepartmentListResponse) => {
                return response.departmentList.departments;
            },
        }),
    }),
});

export const { useGetDepartmentListQuery } = getDepartmentsAPI;
