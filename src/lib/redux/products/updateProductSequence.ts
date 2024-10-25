import { gql } from 'graphql-request';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';
import { locationProductQuery } from '../location-products/gqlQueries';
import {
    createReasonLogMutation,
    getActivityLogListQuery,
    getReasonLogListQuery,
    getSerializedProductListQuery,
} from './gqlQueries';
import type {
    ActivityLog,
    ActivityLogList,
    ActivityLogQueryFields,
    LocationProductFilters,
    LocationProductList,
    LocationProductQueryFields,
    LocationProductUpdate,
    ReasonLog,
    ReasonLogInput,
    ReasonLogList,
    ReasonLogQueryFields,
    SerializedProductList,
    UpdateSequenceInput,
} from './types';

export const updateProductSequenceAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        updateProductSequence: builder.mutation<string, UpdateSequenceInput>({
            invalidatesTags: [
                GRAPHQL_TAGS.Products,
                {
                    type: GRAPHQL_TAGS.UpdateProductSequence,
                    id: `${GRAPHQL_TAGS.UpdateProductSequence}_LIST`,
                },
            ],
            query: (products) => ({
                document: gql`
                    mutation UpdateProductSequence(
                        $products: UpdateProductSequenceInput!
                    ) {
                        updateProductSequence(products: $products)
                    }
                `,
                variables: {
                    products,
                },
            }),
        }),
        getActivityLogList: builder.query<
            ActivityLogList,
            {
                page?: number;
                filters?: Partial<ActivityLog>;
                fields?: ActivityLogQueryFields[];
                first?: number;
                after?: number;
            } | void
        >({
            providesTags: [
                {
                    type: GRAPHQL_TAGS.ActivityLog,
                    id: `${GRAPHQL_TAGS.ActivityLog}_LIST`,
                },
            ],
            query: (params) => ({
                variables: params?.filters
                    ? {
                          filters: params.filters,
                          first: params.first,
                          after:
                              params.page && params.after
                                  ? params.page * params.after
                                  : undefined,
                      }
                    : undefined,
                document: getActivityLogListQuery,
            }),
            transformResponse: (
                response: Record<string, ActivityLogList>,
            ): ActivityLogList => {
                return response.activityLogList;
            },
        }),
        getActivityLogListForAutocompleteOptions: builder.query<
            ActivityLogList,
            {
                page?: number;
                filters?: Partial<ActivityLog>;
                fields?: ActivityLogQueryFields[];
                first?: number;
                after?: number;
            } | void
        >({
            providesTags: [
                {
                    type: GRAPHQL_TAGS.ActivityLog,
                    id: `${GRAPHQL_TAGS.ActivityLog}_LIST`,
                },
            ],
            query: (params) => ({
                variables: params?.filters
                    ? {
                          filters: params.filters,
                          first: params.first,
                          after:
                              params.page && params.after
                                  ? params.page * params.after
                                  : undefined,
                      }
                    : undefined,
                document: getActivityLogListQuery,
            }),
            transformResponse: (
                response: Record<string, ActivityLogList>,
            ): ActivityLogList => {
                return response.activityLogList;
            },
        }),
        getReasonLogList: builder.query<
            ReasonLog[],
            {
                filters?: Partial<ReasonLog>;
                fields?: ReasonLogQueryFields[];
                first?: number;
                after?: number;
            } | void
        >({
            providesTags: [
                {
                    type: GRAPHQL_TAGS.ReasonLog,
                    id: `${GRAPHQL_TAGS.ReasonLog}_LIST`,
                },
            ],
            query: (params) => ({
                variables: params?.filters
                    ? {
                          filters: params.filters,
                          first: params.first,
                          after: params.after,
                      }
                    : undefined,
                document: getReasonLogListQuery,
            }),
            transformResponse: (
                response: Record<string, ReasonLogList>,
            ): ReasonLog[] => {
                return response.reasonLogList.reasonLogs;
            },
        }),
        getLocationProductListUpdated: builder.query<
            LocationProductUpdate[],
            {
                filters?: LocationProductFilters;
                fields?: LocationProductQueryFields[];
                first?: number;
                after?: number;
            } | void
        >({
            providesTags: [
                {
                    type: GRAPHQL_TAGS.LocationProducts,
                    id: `${GRAPHQL_TAGS.LocationProducts}_LIST`,
                },
            ],
            query: (params) => ({
                variables: params?.filters
                    ? {
                          filters: params.filters,
                          first: params.first,
                          after: params.after,
                      }
                    : undefined,
                document: locationProductQuery,
            }),
            transformResponse: (
                response: Record<string, LocationProductList>,
            ): LocationProductUpdate[] => {
                return response.locationProductList.locationProducts;
            },
        }),
        createReason: builder.mutation<ReasonLog, ReasonLogInput>({
            invalidatesTags: [
                {
                    type: GRAPHQL_TAGS.ReasonLog,
                    id: `${GRAPHQL_TAGS.ReasonLog}_NEW`,
                },
            ],
            query: (reasonLog) => ({
                document: createReasonLogMutation,
                variables: {
                    reasonLog,
                },
            }),
        }),
        getSerializedProductList: builder.query<
            SerializedProductList,
            {
                filters?: LocationProductFilters;
                fields?: any[];
                first?: number;
                after?: number;
            } | void
        >({
            providesTags: [
                {
                    type: GRAPHQL_TAGS.SerializedProducts,
                    id: `${GRAPHQL_TAGS.SerializedProducts}_LIST`,
                },
            ],
            query: (params) => ({
                variables: params?.filters
                    ? {
                          filters: params.filters,
                          first: params.first,
                          after: params.after,
                      }
                    : undefined,
                document: getSerializedProductListQuery,
            }),
            transformResponse: (
                response: Record<string, SerializedProductList>,
            ): SerializedProductList => {
                return response.serializedProducts;
            },
        }),
    }),
});

export const {
    useUpdateProductSequenceMutation,
    useGetActivityLogListQuery,
    useGetActivityLogListForAutocompleteOptionsQuery,
    useGetReasonLogListQuery,
    useLazyGetReasonLogListQuery,
    useGetLocationProductListUpdatedQuery,
    useLazyGetLocationProductListUpdatedQuery,
    useCreateReasonMutation,
    useGetSerializedProductListQuery,
    useLazyGetSerializedProductListQuery,
} = updateProductSequenceAPI;
