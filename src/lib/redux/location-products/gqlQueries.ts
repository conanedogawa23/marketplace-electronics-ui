import { gql } from 'graphql-request';

export const locationProductQuery = gql`
    query LocationProductList(
        $first: Int
        $after: Int
        $filters: LocationProductInput
    ) {
        locationProductList(first: $first, after: $after, filters: $filters) {
            locationProducts {
                product {
                    serializedProducts {
                        uuid
                        number
                    }
                    status
                    serialized
                    name
                    uuid
                }
                location {
                    uuid
                    warehouse
                    name
                }
                quantity
                lastChecked
                expirationDate
                comments
                batchNumber
                receivedDate
                createdAt
                updatedAt
                createdBy
                updatedBy
                uuid
                deletedAt
                deletedBy
                deleted
                deletedReason
                deletedNote
                status
            }
            hasMore
        }
    }
`;
