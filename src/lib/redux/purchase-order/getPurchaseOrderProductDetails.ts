import { gql } from 'graphql-request';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import {
    type PurchaseOrderItem,
    type PurchaseOrderProductDetailResponse,
} from './types';

export const PurchaseOrderProductDetailsAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getPurchaseOrderProductDetails: builder.query<
            PurchaseOrderItem[],
            {
                purchaseOrderId: string;
            }
        >({
            query: ({ purchaseOrderId }) => ({
                variables: {
                    purchaseOrderId,
                },
                document: gql`
                    query PurchaseOrderItemsList($purchaseOrderId: String) {
                        purchaseOrderItemsList(
                            purchaseOrderId: $purchaseOrderId
                        ) {
                            purchaseOrderItems {
                                uuid
                                product {
                                    width
                                    sku
                                    status
                                    uuid
                                    price {
                                        cost
                                        mapp
                                        msrp
                                        sell
                                    }
                                    name
                                    tags
                                }
                                order_status
                                order_quantity
                                order_notes
                                project_quantity
                                short_description
                                source {
                                    id
                                    name
                                }
                                full_name
                                cost
                                total_order_cost
                            }
                        }
                    }
                `,
            }),
            transformResponse: (
                response: PurchaseOrderProductDetailResponse,
            ) => {
                return response.purchaseOrderItemsList.purchaseOrderItems;
            },
        }),
    }),
});

export const { useGetPurchaseOrderProductDetailsQuery } =
    PurchaseOrderProductDetailsAPI;
