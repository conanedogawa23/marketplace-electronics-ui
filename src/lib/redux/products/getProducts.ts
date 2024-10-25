import { filterUniqueByUUID } from '@/utils/filterByUUID';
import { gql } from 'graphql-request';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';
import { type Product, type ProductListResponse } from './types';

type ProductQueryFields =
    | '_id'
    | 'attachments'
    // | 'category'
    | 'createdAt'
    | 'createdBy'
    | 'deleted'
    | 'deletedAt'
    | 'deletedBy'
    | 'deletedNote'
    | 'deletedReason'
    | 'description'
    | 'height'
    | 'length'
    // | 'manufacturer'
    | 'maxQuantity'
    | 'minQuantity'
    | 'name'
    | 'notes'
    | 'price'
    | 'quantity'
    | 'serialized'
    | 'sku'
    | 'status'
    | 'tags'
    | 'type'
    // | 'uom'
    | 'updatedAt'
    | 'updatedBy'
    | 'uuid'
    // | 'vendors'
    | 'weight'
    | 'width';

export const getProductsAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getProductList: builder.query<
            Product[],
            {
                filters?: Partial<Product>;
                fields?: ProductQueryFields[];
            } | void
        >({
            providesTags: [GRAPHQL_TAGS.Products],
            query: (params) => ({
                variables: params?.filters
                    ? {
                          filters: params.filters,
                      }
                    : undefined,
                document: params?.fields?.length
                    ? gql`
                          query GetProductList {
                              productList {
                                  products {
                                    ${params.fields.join('\n')}
                                  }
                                  hasMore
                              }
                          }
                      `
                    : gql`
                          query ProductList(
                              $first: Int
                              $after: Int
                              $filters: ProductInput
                          ) {
                              productList(
                                  first: $first
                                  after: $after
                                  filters: $filters
                              ) {
                                  products {
                                      description
                                      name
                                      serialized
                                      status
                                      tags
                                      uuid
                                      serializedProducts {
                                          number
                                          uuid
                                      }
                                      weight
                                      height
                                      quantity
                                      adjusted
                                      sku
                                      category {
                                          name
                                      }
                                      manufacturer {
                                          name
                                      }
                                      price {
                                          msrp
                                          mapp
                                          cost
                                          sell
                                          shippingCost
                                          shippingSell
                                      }

                                      locations {
                                          uuid
                                          area {
                                              name
                                              uuid
                                          }
                                          rack {
                                              name
                                              uuid
                                          }
                                          shelf {
                                              name
                                              uuid
                                          }
                                          bin {
                                              name
                                              uuid
                                          }
                                      }
                                  }
                                  hasMore
                              }
                          }
                      `,
            }),
            transformResponse: (response: ProductListResponse) => {
                return filterUniqueByUUID(response.productList.products);
            },
        }),
    }),
});

export const { useGetProductListQuery } = getProductsAPI;
