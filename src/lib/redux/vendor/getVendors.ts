import { gql } from 'graphql-request';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';
import {
    type Vendor,
    type VendorInputs,
    type VendorListResponse,
    type VendorProduct,
    type VendorProductInputs,
    type VendorProductListResponse,
    type VendorResponse,
} from './types';

type VendorQueryFields =
    | '_id'
    | 'createdAt'
    | 'deleted'
    | 'deletedAt'
    | 'deletedBy'
    | 'deletedNote'
    | 'deletedReason'
    | 'email'
    | 'name'
    | 'source'
    | 'updatedAt'
    | 'uuid';

type VendorProductQueryFields =
    | '_id'
    | 'createdBy'
    | 'currency'
    | 'deleted'
    | 'deletedAt'
    | 'deletedBy'
    | 'deletedNote'
    | 'deletedReason'
    | 'price'
    | 'product'
    | 'updatedBy'
    | 'uuid'
    | 'vendor';

export const vendorAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getVendorList: builder.query<
            Vendor[],
            {
                filters?: Partial<Vendor>;
                fields?: VendorQueryFields[];
            } | void
        >({
            providesTags: [GRAPHQL_TAGS.Vendors],
            query: (params) => ({
                variables: params?.filters
                    ? {
                          filters: params.filters,
                      }
                    : undefined,
                document: params?.fields?.length
                    ? gql`
                        query GetVendorList {
                            vendorList {
                                vendors {
                                    ${params.fields.join('\n')}
                                }
                                hasMore
                            }
                        }
                    `
                    : gql`
                          query VendorList(
                              $first: Int
                              $after: Int
                              $filters: VendorInput
                          ) {
                              vendorList(
                                  first: $first
                                  after: $after
                                  filters: $filters
                              ) {
                                  vendors {
                                      _id
                                      uuid
                                      name
                                      email
                                      source
                                      createdAt
                                      updatedAt
                                      deleted
                                      deletedBy
                                      deletedAt
                                      deletedReason
                                      deletedNote
                                  }
                                  hasMore
                              }
                          }
                      `,
            }),
            transformResponse: (response: VendorListResponse) => {
                return response.vendorList.vendors;
            },
        }),
        createVendor: builder.mutation<Vendor, { vendor: VendorInputs }>({
            invalidatesTags: [GRAPHQL_TAGS.Vendors],
            query: ({ vendor }) => ({
                document: gql`
                    mutation VendorCreate($vendor: VendorInput!) {
                        vendorCreate(vendor: $vendor) {
                            name
                            email
                            source
                            uuid
                        }
                    }
                `,
                variables: {
                    vendor,
                },
            }),
        }),
        getVendorProductList: builder.query<
            VendorProduct[],
            {
                filters?: Partial<VendorProductInputs>;
                fields?: VendorProductQueryFields[];
            } | void
        >({
            providesTags: [GRAPHQL_TAGS.VendorProducts],
            query: (params) => ({
                variables: params?.filters
                    ? {
                          filters: params.filters,
                      }
                    : undefined,
                document: params?.fields?.length
                    ? gql`
                        query GetVendorProductList {
                            vendorProductList {
                                vendorProducts {
                                    ${params.fields.join('\n')}
                                }
                                hasMore
                            }
                        }
                    `
                    : gql`
                          query VendorProductList(
                              $first: Int
                              $after: Int
                              $filters: VendorProductInput
                          ) {
                              vendorProductList(
                                  first: $first
                                  after: $after
                                  filters: $filters
                              ) {
                                  vendorProducts {
                                      _id
                                      uuid
                                      vendor {
                                          uuid
                                          name
                                          source
                                          email
                                      }
                                      product {
                                          uuid
                                          name
                                      }
                                      price
                                      currency
                                      createdBy
                                      updatedBy
                                      deletedAt
                                      deletedBy
                                      deleted
                                      deletedReason
                                      deletedNote
                                  }
                                  hasMore
                              }
                          }
                      `,
            }),
            transformResponse: (response: VendorProductListResponse) => {
                return response.vendorProductList.vendorProducts;
            },
        }),
        createVendorProduct: builder.mutation<
            VendorProduct,
            { vendorProduct: VendorProductInputs }
        >({
            invalidatesTags: [GRAPHQL_TAGS.VendorProducts],
            query: ({ vendorProduct }) => ({
                document: gql`
                    mutation VendorProductCreate(
                        $vendorProduct: VendorProductInput!
                    ) {
                        vendorProductCreate(vendorProduct: $vendorProduct) {
                            uuid
                            price
                            currency
                        }
                    }
                `,
                variables: {
                    vendorProduct,
                },
            }),
        }),
        getVendor: builder.query<Vendor, { uuid: string }>({
            query: ({ uuid }) => ({
                document: gql`
                    query GetVendor($uuid: String!) {
                        vendor(uuid: $uuid) {
                            _id
                            uuid
                            name
                            email
                            source
                        }
                    }
                `,
                variables: { uuid },
            }),
            transformResponse: (response: VendorResponse) => {
                return response.vendor;
            },
        }),
    }),
});

export const {
    useGetVendorListQuery,
    useCreateVendorMutation,
    useGetVendorProductListQuery,
    useCreateVendorProductMutation,
    useGetVendorQuery,
} = vendorAPI;
