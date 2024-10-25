import { gql } from 'graphql-request';

export const createReasonLogMutation = gql`
    mutation CreateReasonLog($reasonLog: ReasonLogInput!) {
        createReasonLog(reasonLog: $reasonLog) {
            uuid
            description
            name
            createdBy
            updatedBy
            deletedBy
            deletedReason
            deletedNote
            deletedAt
            createdAt
            updatedAt
            deleted
        }
    }
`;

export const getActivityLogListQuery = gql`
    query ActivityLogList(
        $first: Int
        $after: Int
        $filters: ActivityLogInput
    ) {
        activityLogList(first: $first, after: $after, filters: $filters) {
            activityLogs {
                uuid
                activityId
                activityReason
                description
                name
                type
                note
                status
                createdAt
                createdBy
                updatedAt
                updatedBy
                deleted
                deletedAt
                deletedBy
                deletedReason
                deletedNote
                track {
                    product
                    quantity
                    deleteSerialNumbers
                    serialNumbers
                    fromLocation
                    toLocation
                }
            }
            hasMore
        }
    }
`;

export const getReasonLogListQuery = gql`
    query GetReasonLogList($first: Int, $after: Int, $filters: ReasonLogInput) {
        reasonLogList(first: $first, after: $after, filters: $filters) {
            reasonLogs {
                uuid
                description
                name
                createdBy
                updatedBy
                deletedBy
                deletedReason
                deletedNote
                deletedAt
                createdAt
                updatedAt
                deleted
            }
            hasMore
        }
    }
`;

export const getLocationProductListQuery = gql`
    query Query($first: Int, $after: Int, $filters: LocationProductInput) {
        locationProductList(first: $first, after: $after, filters: $filters) {
            locationProducts {
                quantity
                uuid
            }
            hasMore
        }
    }
`;

export const getSerializedProductListQuery = gql`
    query Query($after: Int, $first: Int, $filters: SerializedProductInput) {
        serializedProducts(after: $after, first: $first, filters: $filters) {
            serializedProducts {
                _id
                product
                number
                location
                createdBy
                updatedBy
                deletedBy
                deletedReason
                deletedNote
                deletedAt
                createdAt
                updatedAt
                deleted
                uuid
                status
            }
            hasMore
        }
    }
`;
