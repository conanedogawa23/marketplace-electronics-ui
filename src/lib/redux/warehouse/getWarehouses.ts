import { gql } from 'graphql-request';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';
import {
    type Warehouse,
    type WarehouseInputs,
    type WarehouseListResponse,
} from './types';

type WarehouseQueryFields =
    | 'address'
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

export const getWarehousesAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getWarehouseList: builder.query<
            Warehouse[],
            {
                filters?: Partial<Warehouse>;
                fields?: WarehouseQueryFields[];
            } | void
        >({
            providesTags: [
                {
                    type: GRAPHQL_TAGS.Warehouses,
                    id: `${GRAPHQL_TAGS.Warehouses}_LIST`,
                },
            ],
            query: (params) => ({
                variables: params?.filters
                    ? {
                          filters: params.filters,
                      }
                    : undefined,
                document: gql`
                    query GetWarehouseList(
                        $filters: WarehouseInput
                        $first: Int
                        $after: Int
                    ) {
                        warehouseList(
                            filters: $filters
                            first: $first
                            after: $after
                        ) {
                            warehouses {
                                uuid
                                name
                                description
                                status
                                createdAt
                                updatedAt
                                createdBy
                                updatedBy
                                deleted
                                deletedAt
                                deletedBy
                                deletedReason
                                deletedNote
                                address
                            }
                            hasMore
                        }
                    }
                `,
            }),
            transformResponse: (response: WarehouseListResponse) => {
                return response?.warehouseList?.warehouses;
            },
        }),
        createWarehouse: builder.mutation<
            Warehouse,
            { warehouse: WarehouseInputs }
        >({
            invalidatesTags: [GRAPHQL_TAGS.Warehouses],
            query: ({ warehouse }) => ({
                variables: { warehouse },
                document: gql`
                    mutation WarehouseCreate($warehouse: WarehouseInput!) {
                        warehouseCreate(warehouse: $warehouse) {
                            uuid
                            name
                        }
                    }
                `,
            }),
        }),
    }),
});

export const { useGetWarehouseListQuery, useCreateWarehouseMutation } =
    getWarehousesAPI;
