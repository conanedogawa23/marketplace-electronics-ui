import { gql } from 'graphql-request';

import {
    type LocationProduct,
    type LocationProductInputs,
    type LocationProductListResponse,
} from '@/lib/redux/location-products/types';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';

type LocationProductQueryFields =
    | 'batchNumber'
    | 'comments'
    | 'createdAt'
    | 'createdBy'
    | 'deleted'
    | 'deletedAt'
    | 'deletedBy'
    | 'deletedNote'
    | 'deletedReason'
    | 'expirationDate'
    | 'lastChecked'
    | 'location'
    | 'product'
    | 'quantity'
    | 'receivedDate'
    | 'status'
    | 'updatedAt'
    | 'updatedBy'
    | 'uuid';

export const getLocationProductsAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getLocationProductList: builder.query<
            LocationProduct[],
            {
                filters?: Partial<LocationProductInputs>;
                fields?: LocationProductQueryFields[];
            } | void
        >({
            providesTags: [GRAPHQL_TAGS.LocationProducts],
            query: (params) => ({
                variables: params?.filters
                    ? {
                          filters: params.filters,
                      }
                    : undefined,
                document: params?.fields?.length
                    ? gql`
                    query GetLocationProductList {
                        locationProductList {
                            locationProducts {
                                ${params.fields.join('\n')}
                            }
                            hasMore
                        }
                `
                    : gql`
                          query LocationProductList(
                              $first: Int
                              $after: Int
                              $filters: LocationProductInput
                          ) {
                              locationProductList(
                                  first: $first
                                  after: $after
                                  filters: $filters
                              ) {
                                  locationProducts {
                                      uuid
                                      product {
                                          uuid
                                          name
                                          serialized
                                          serializedProducts {
                                              uuid
                                              number
                                          }
                                      }
                                      location {
                                          uuid
                                          name
                                      }
                                      quantity
                                      lastChecked
                                      expirationDate
                                      comments
                                      batchNumber
                                      receivedDate
                                      createdBy
                                      deletedAt
                                      deletedBy
                                      deleted
                                      deletedReason
                                      deletedNote
                                      updatedBy
                                      status
                                      createdAt
                                      updatedAt
                                  }
                                  hasMore
                              }
                          }
                      `,
            }),
            transformResponse: (response: LocationProductListResponse) => {
                return response?.locationProductList?.locationProducts;
            },
        }),
    }),
});

export const { useGetLocationProductListQuery } = getLocationProductsAPI;
