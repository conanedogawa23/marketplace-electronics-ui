import { gql } from 'graphql-request';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';
import {
    type ProjectProduct,
    type ProjectProductInputs,
    type ProjectProductListResponse,
} from './types';

type ProjectProductQueryFields =
    | 'createdAt'
    | 'createdBy'
    | 'deleted'
    | 'deletedAt'
    | 'deletedBy'
    | 'deletedNote'
    | 'deletedReason'
    | 'product'
    | 'project'
    | 'quantity'
    | 'status'
    | 'updatedAt'
    | 'updatedBy'
    | 'uuid';

export const getProjectProductsAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getProjectProductList: builder.query<
            ProjectProduct[],
            {
                filters?: Partial<ProjectProductInputs>;
                fields?: ProjectProductQueryFields[];
            } | void
        >({
            providesTags: [GRAPHQL_TAGS.ProjectProducts],
            query: (params) => ({
                variables: params?.filters
                    ? {
                          filters: params.filters,
                      }
                    : undefined,
                document: params?.fields?.length
                    ? gql`
                    query GetProjectProductList {
                        projectProductList {
                            projectProducts {
                                ${params.fields.join('\n')}
                            }
                            hasMore
                        }
                    }
                `
                    : gql`
                          query ProjectProductList(
                              $filters: ProjectProductInput
                          ) {
                              projectProductList(filters: $filters) {
                                  projectProducts {
                                      uuid
                                      project {
                                          uuid
                                          name
                                      }
                                      product {
                                          uuid
                                          name
                                      }
                                      quantity
                                      status
                                      allocated
                                      createdAt
                                      updatedAt
                                      createdBy
                                      updatedBy
                                      deleted
                                      deletedAt
                                      deletedBy
                                      deletedReason
                                      deletedNote
                                  }
                                  hasMore
                              }
                          }
                      `,
            }),
            transformResponse: (response: ProjectProductListResponse) => {
                return response?.projectProductList?.projectProducts;
            },
        }),
    }),
});

export const { useGetProjectProductListQuery } = getProjectProductsAPI;
