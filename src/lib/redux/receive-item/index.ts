import { filterUniqueByUUID } from '@/utils/filterByUUID';
import { gql } from 'graphql-request';

import {
    type ReceiveItemSearch,
    type ReceiveItemSearchResponse,
} from '@/lib/redux/receive-item/type';

import { graphQLBaseAPI } from '../graphQLBaseAPI';

export const ReceiveSearchItems = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getReceiveSearchItems: builder.query<
            ReceiveItemSearch[],
            {
                query: string;
            }
        >({
            query: ({ query }) => ({
                variables: {
                    query,
                },
                document: gql`
                    query ReceiveOrderList($query: String!) {
                        receiveOrderList(query: $query) {
                            purchaseOrder
                            product
                            name
                            description
                            uuid
                        }
                    }
                `,
            }),
            transformResponse: (response: ReceiveItemSearchResponse) => {
                return filterUniqueByUUID(response.receiveOrderList);
            },
        }),
    }),
});

export const { useGetReceiveSearchItemsQuery } = ReceiveSearchItems;
