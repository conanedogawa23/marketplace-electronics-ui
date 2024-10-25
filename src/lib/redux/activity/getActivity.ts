import { gql } from 'graphql-request';

import {
    type ActivityLog,
    type ActivityLogInputs,
    type ActivityLogListResponse,
    type ActivityLogResponse,
    type ActivityLogDetailResponse,
    type ActivityLogDetail,
    type ActivityLogDetailsListResponse
} from '@/lib/redux/activity/types';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';

type ActivityQueryFields =
    | 'activityType'
    | 'createdAt'
    | 'createdBy'
    | 'deleted'
    | 'deletedAt'
    | 'deletedBy'
    | 'deletedNote'
    | 'deletedReason'
    | 'description'
    | 'location'
    | 'updatedAt'
    | 'updatedBy'
    | 'uuid';

export const getActivityLogAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getActivityLogList: builder.query<
            ActivityLog[],
            {
                filters?: Partial<ActivityLogInputs>;
                fields?: ActivityQueryFields[];
            } | void
        >({
            providesTags: [GRAPHQL_TAGS.ActivityLog],
            query: (params) => ({
                variables: params?.filters
                    ? {
                          filters: params.filters,
                      }
                    : undefined,
                document: params?.fields?.length
                    ? gql`
                        query GetActivityLogList {
                            activityLogList {
                                activities {
                                    ${params.fields.join('\n')}
                                }
                                hasMore
                            }
                        }
                    `
                    : gql`
                          query ActivityLogList {
                              activityLogList {
                                  activities {
                                      uuid
                                      activityType
                                      createdAt
                                      createdBy
                                      deleted
                                      deletedAt
                                      deletedBy
                                      deletedNote
                                      deletedReason
                                      description
                                      location
                                      updatedAt
                                      updatedBy
                                  }
                                  hasMore
                              }
                          }
                      `,
            }),
            transformResponse: (response: ActivityLogListResponse) => {
                return response?.activityLogList?.activityLogs;
            },
        }),
        getActivityLogWithUuid: builder.query<ActivityLog, { uuid: string }>({
            providesTags: [GRAPHQL_TAGS.ActivityLog],
            query: ({ uuid }) => ({
                document: gql`
                    query GetActivityLogWithUuid($uuid: String!) {
                        activityLog(uuid: $uuid) {
                            uuid
                            type
                            activityId
                            track {
                                product
                                project
                            }
                            createdAt
                            createdBy
                            deleted
                            deletedAt
                            deletedBy
                            deletedNote
                            deletedReason
                            description
                            updatedAt
                            updatedBy
                        }
                    }
                `,
                variables: { uuid },
            }),
            transformResponse: (response: ActivityLogResponse) => {
                return response?.activityLog;
            },
        }),
        getActivityLogDetails: builder.query<ActivityLogDetail, { uuid: string }>({
            providesTags: [GRAPHQL_TAGS.ActivityLog],
            query: ({ uuid }) => ({
                document: gql`
                    query GetActivityLogDetails($uuid: String!) {
                        activityLogDetails(uuid: $uuid) {
                            uuid
                            type
                            activityId
                            products {
                                uuid
                                name
                                quantity
                                onUsed
                            }
                            fromLocation {
                                uuid
                                name
                            }
                            projectProducts {
                                product {
                                    uuid
                                }
                                project {
                                    uuid
                                    name
                                }
                                quantity
                                allocated
                            }
                            track {
                                product
                                project
                                fromLocation
                            }
                            createdAt
                            createdBy
                            deleted
                            deletedAt
                            deletedBy
                            deletedNote
                            deletedReason
                            description
                            updatedAt
                            updatedBy
                        }
                    }
                `,
                variables: { uuid },
            }),
            transformResponse: (response: ActivityLogDetailResponse) => {
                return response?.activityLogDetails;
            },
        }),
        getActivityLogDetailsList: builder.query<ActivityLogDetail[], { 
            filters?: Partial<ActivityLogInputs>;
            fields?: ActivityQueryFields[];
            first?: number;
            after?: number;
         }>({
            providesTags: [GRAPHQL_TAGS.ActivityLog],
            query: (params) => ({
                variables: params?.filters
                    ? {
                          filters: params.filters,
                          first: params.first,
                          after: params.after,
                      }
                    : undefined,
                document: params?.fields?.length
                    ? gql`
                        query GetActivityLogDetailsList {
                            activityLogDetailsListAdjust {
                                activityLogDetails {
                                    ${params.fields.join('\n')}
                                }
                                hasMore
                            }
                        }
                    `
                    : gql`
                          query ActivityLogDetailsList {
                              activityLogDetailsListAdjust {
                                  activityLogDetails {
                                      uuid
                                      type
                                      activityId
                                      fromLocation {
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
                                        warehouse {
                                            name
                                            uuid
                                        }
                                      }
                                      toLocation {
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
                                        warehouse {
                                            name
                                            uuid
                                        }
                                      }
                                      track {
                                            product
                                            project
                                            fromLocation
                                            toLocation
                                            quantity
                                      } 
                                      createdAt
                                      createdBy
                                      deleted
                                      deletedAt
                                      deletedBy
                                      deletedNote
                                      deletedReason
                                      description
                                      updatedAt
                                      updatedBy
                                  }
                                  hasMore
                              }
                          }
                      `,
            }),
            transformResponse: (response: ActivityLogDetailsListResponse) => {
                return response?.activityLogDetailsListAdjust.activityLogDetails;                ;
            },
         }),
        createActivityLog: builder.mutation<
            ActivityLog,
            { activity: ActivityLogInputs }
        >({
            query: ({ activity }) => ({
                document: gql`
                    mutation CreateActivityLog($activity: ActivityLogInput!) {
                        createActivityLog(activity: $activity) {
                            uuid
                        }
                    }
                `,
                variables: { activity },
            }),
            invalidatesTags: [GRAPHQL_TAGS.ActivityLog],
        }),
    }),
});

export const { 
    useGetActivityLogListQuery, 
    useCreateActivityLogMutation,
    useGetActivityLogWithUuidQuery,
    useGetActivityLogDetailsQuery,
    useGetActivityLogDetailsListQuery,
} =
    getActivityLogAPI;
