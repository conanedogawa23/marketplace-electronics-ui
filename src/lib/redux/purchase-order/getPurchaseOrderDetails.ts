import { gql } from 'graphql-request';

import {
    type PurchaseOrder,
    type PurchaseOrderResponse,
} from '@/lib/redux/purchase-order/types';

import { graphQLBaseAPI } from '../graphQLBaseAPI';

export const PurchaseOrderAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getPurchaseOrderDetails: builder.query<
            PurchaseOrder,
            {
                uuid: string;
            }
        >({
            query: ({ uuid }) => ({
                variables: {
                    uuid,
                },
                document: gql`
                    query PurchaseOrder($uuid: String!) {
                        purchaseOrder(uuid: $uuid) {
                            uuid
                            deleted
                            deletedAt
                            deletedBy
                            createdBy
                            updatedBy
                            deletedReason
                            deletedNote
                            project {
                                _id
                                uuid
                                name
                                description
                                createdAt
                                updatedAt
                                deleted
                                deletedAt
                                deletedBy
                                deletedReason
                                deletedNote
                                createdBy
                                updatedBy
                                status
                                project_type
                                stage
                                payment_schedule
                                sales_tax
                                labor_tax
                                total_margin
                                equipment_margin
                                equipment_total
                                labor_total
                                shipping_total
                                tax_total
                                budget
                                address
                                city
                                state
                                zipcode
                                country
                                owner {
                                    _id
                                    uuid
                                    firstName
                                    lastName
                                    email
                                    phoneNumber
                                    dateOfBirth
                                    address {
                                        street
                                        city
                                        state
                                        zipCode
                                        country
                                    }
                                    employeeId
                                    department
                                    position
                                    salary
                                    hireDate
                                    employmentStatus
                                    role
                                    createdAt
                                    updatedAt
                                    deleted
                                    deletedAt
                                    projects
                                    deletedReason
                                    deletedNote
                                    permissions
                                    admin
                                    image
                                }
                                client {
                                    uuid
                                    name
                                    type
                                }
                                primary_contact_id
                                company_location_id
                                company_location_name
                            }
                            purchasingSource {
                                uuid
                                deleted
                                deletedAt
                                deletedBy
                                createdBy
                                updatedBy
                                deletedReason
                                deletedNote
                                company_name
                                first_name
                                last_name
                                email
                                phone
                                default_ship
                                dealer_number
                            }
                            custom_id
                            default_ship
                            notes
                            status
                            shipping_option
                            ship_name
                            ship_address {
                                street
                                city
                                region
                                postal_code
                                country
                            }
                        }
                    }
                `,
            }),
            transformResponse: (response: PurchaseOrderResponse) => {
                return response.purchaseOrder;
            },
        }),
    }),
});

export const { useGetPurchaseOrderDetailsQuery } = PurchaseOrderAPI;
