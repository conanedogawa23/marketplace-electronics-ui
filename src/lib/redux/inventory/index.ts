import { gql } from 'graphql-request';

import {
    type FormattedInventoryInput,
    type FormattedInventoryResponseType,
    type InventoryItem,
    type InventoryListResponse,
    type ProductListResponse,
    type QrInput,
} from '@/lib/redux/inventory/types';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';

export const inventoryAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getInventoryListNew: builder.query<
            any,
            { page?: number; filters?: { name?: string } }
        >({
            providesTags: [GRAPHQL_TAGS.InventoryList],
            query: ({ page, filters } = {}) => ({
                document: gql`
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
                            hasMore
                            products {
                                name
                                category {
                                    name
                                }
                                description
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
                                quantity
                                sku
                                status
                                tags
                                uuid
                                vendors {
                                    name
                                }
                                weight
                                height
                                width
                            }
                        }
                    }
                `,
                variables: {
                    first: 50,
                    after: page ? page * 50 : 0,
                    filters: filters ? filters : {},
                },
            }),
            transformResponse: (response: InventoryListResponse) =>
                response.productList,
        }),

        getInventoryAutocompleteList: builder.query<
            any,
            { filters?: { name?: string } }
        >({
            query: ({ filters } = {}) => ({
                document: gql`
                    query ProductList($filters: ProductInput) {
                        productList(filters: $filters) {
                            products {
                                name
                            }
                        }
                    }
                `,
                variables: filters ? { filters } : {},
            }),
            providesTags: [GRAPHQL_TAGS.InventoryList],
            transformResponse: (response: InventoryListResponse) =>
                response.productList,
        }),

        getInventoryListWithUUID: builder.query<
            any,
            { filters: { uuid: string } }
        >({
            providesTags: [GRAPHQL_TAGS.InventoryList],
            query: ({ filters }) => ({
                document: gql`
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
                                name
                                category {
                                    name
                                }
                                description
                                manufacturer {
                                    name
                                }
                                price {
                                    mapp
                                    cost
                                    sell
                                    shippingCost
                                    shippingSell
                                }
                                quantity
                                sku
                                serialized
                                onUsed
                                serializedProducts {
                                          number
                                          uuid
                                          project
                                      }
                                status
                                tags
                                uuid
                                vendors {
                                    name
                                }
                                weight
                                height
                                locations {
                                    uuid
                                    quantity
                                    onUsed
                                    warehouse {
                                        uuid
                                        name
                                    }
                                    area {
                                        uuid
                                        name
                                    }
                                    rack {
                                        uuid
                                        name
                                    }
                                    shelf {
                                        uuid
                                        name
                                    }
                                    bin {
                                        uuid
                                        name
                                    }
                                }
                            }
                        }
                    }
                `,
                variables: { filters },
            }),
            transformResponse: (response: InventoryListResponse) =>
                response.productList,
        }),

        getProductByUuid: builder.query<
            FormattedInventoryResponseType,
            { uuid: string }
        >({
            query: ({ uuid }) => ({
                document: gql`
                    query Product($uuid: String!) {
                        product(uuid: $uuid) {
                            _id
                            uuid
                            attachments {
                                name
                                type
                                url
                                uuid
                            }
                            image {
                                url
                                name
                            }
                            createdAt
                            deleted
                            deletedAt

                            deletedNote
                            description
                            deletedReason
                            height
                            length
                            width
                            weight
                            onUsed
                            maxQuantity
                            minQuantity
                            name
                            notes
                            type
                            price {
                                msrp
                                mapp
                                cost
                                sell
                                shippingCost
                                shippingSell
                            }
                            quantity
                            sku
                            status
                            category {
                                _id
                                createdAt

                                deleted
                                deletedAt

                                deletedNote
                                deletedReason
                                description
                                name
                                status
                                updatedAt

                                uuid
                            }
                            manufacturer {
                                _id
                                createdAt

                                deleted

                                deletedAt
                                deletedNote
                                deletedReason
                                description
                                name
                                status
                                updatedAt
                                uuid
                            }
                            tags
                            uom {
                                _id
                                createdAt

                                deleted

                                deletedAt
                                deletedNote
                                deletedReason
                                description
                                name
                                status
                                updatedAt

                                uuid
                            }
                            serializedProducts {
                                number
                                uuid
                            }
                        }
                    }
                `,
                variables: { uuid },
            }),
            transformResponse: (response: ProductListResponse) =>
                response.product,
        }),
        createProduct: builder.mutation<
            InventoryItem,
            { product: FormattedInventoryInput }
        >({
            invalidatesTags: [GRAPHQL_TAGS.InventoryList],
            query: ({ product }) => ({
                document: gql`
                    mutation CreateProduct($product: ProductInput!) {
                        createProduct(product: $product) {
                            uuid
                        }
                    }
                `,
                variables: { product },
            }),
            transformResponse: (response: any) => response.createProduct,
        }),
        updateProduct: builder.mutation<
            InventoryItem,
            { product: FormattedInventoryInput }
        >({
            invalidatesTags: [GRAPHQL_TAGS.InventoryList],
            query: ({ product }) => ({
                document: gql`
                    mutation Mutation($product: ProductInputUpdate!) {
                        updateProduct(product: $product) {
                            uuid
                            name
                        }
                    }
                `,
                variables: { product },
            }),
            transformResponse: (response: any) => response.updateProduct,
        }),
        createCategory: builder.mutation<
            any,
            {
                category: {
                    name: string;
                    description: string;
                    status: string;
                };
            }
        >({
            query: ({ category }) => ({
                document: gql`
                    mutation CategoryCreate($category: CategoryInput!) {
                        categoryCreate(category: $category) {
                            name
                            status
                            _id
                            deletedNote
                            deletedReason
                            description
                            uuid
                        }
                    }
                `,
                variables: { category },
            }),
            transformResponse: (response: any) => response.categoryCreate,
            invalidatesTags: [GRAPHQL_TAGS.CategoryList],
        }),
        createManufacturer: builder.mutation<
            any,
            {
                manufacturer: {
                    name: string;
                    description: string;
                    status: string;
                };
            }
        >({
            query: ({ manufacturer }) => ({
                document: gql`
                    mutation ManufacturerCreate(
                        $manufacturer: ManufacturerInput!
                    ) {
                        manufacturerCreate(manufacturer: $manufacturer) {
                            name
                            status
                            description
                            uuid
                        }
                    }
                `,
                variables: { manufacturer },
            }),
            transformResponse: (response: any) => response.manufacturerCreate,

            invalidatesTags: [GRAPHQL_TAGS.ManufacturerList],
        }),
        createUom: builder.mutation<
            any,
            {
                uom: {
                    name: string;
                    description: string;
                };
            }
        >({
            query: ({ uom }) => ({
                document: gql`
                    mutation UomCreate($uom: UomInput!) {
                        uomCreate(uom: $uom) {
                            name
                            description
                            status
                            uuid
                        }
                    }
                `,
                variables: { uom },
            }),
            transformResponse: (response: any) => response.uomCreate,
            invalidatesTags: [GRAPHQL_TAGS.UomList],
        }),
        generateQrCode: builder.mutation<
            any,
            {
                qrInput: QrInput[];
            }
        >({
            query: ({ qrInput }) => ({
                document: gql`
                    mutation GenerateQRCode($qrInput: [QrCodeInput]!) {
                        generateQRCode(qrInput: $qrInput) {
                            qrCode
                            serialNo
                            sku
                            type
                            uuid
                            name
                        }
                    }
                `,
                variables: { qrInput },
            }),
            transformResponse: (response: any) => response.generateQRCode,
        }),

        getCategoryList: builder.query<
            any,
            {
                filters?: { name?: string };
            }
        >({
            query: ({ filters } = {}) => ({
                document: gql`
                    query Category($filters: CategoryInput) {
                        categoryList(filters: $filters) {
                            hasMore
                            categories {
                                name
                                uuid
                            }
                        }
                    }
                `,
                variables: filters ? { filters } : {},
            }),
            transformResponse: (response: any) => response.categoryList,
        }),
        getManufacturerList: builder.query<
            any,
            {
                filters?: { name?: string };
            }
        >({
            query: ({ filters } = {}) => ({
                document: gql`
                    query ManufacturerList($filters: ManufacturerInput) {
                        manufacturerList(filters: $filters) {
                            manufacturer {
                                name
                                uuid
                            }
                        }
                    }
                `,
                variables: filters ? { filters } : {},
            }),
            transformResponse: (response: any) => response.manufacturerList,
        }),
        getUomList: builder.query<
            any,
            {
                filters?: { name?: string };
            }
        >({
            query: ({ filters } = {}) => ({
                document: gql`
                    query UomList($filters: UomInput) {
                        uomList(filters: $filters) {
                            uoms {
                                name
                                uuid
                            }
                            hasMore
                        }
                    }
                `,
                variables: filters ? { filters } : {},
            }),
            transformResponse: (response: any) => response.uomList,
        }),
        getProductsByLocationUUID: builder.query<
            any,
            {
                filters?: { location?: string };
            }
        >({
            query: ({ filters } = {}) => ({
                document: gql`
                    query LocationProductList($filters: LocationProductInput) {
                        locationProductList(filters: $filters) {
                            locationProducts {
                                product {
                                    _id
                                    name
                                    description
                                    quantity
                                    createdAt
                                    updatedAt
                                    deleted
                                    deletedAt
                                    deletedBy
                                    deletedReason
                                    deletedNote
                                    createdBy
                                    updatedBy
                                    uuid
                                }
                            }
                        }
                    }
                `,
                variables: filters ? { filters } : {},
            }),
            transformResponse: (response: any) =>
                response.locationProductList.locationProducts,
        }),
        getSingleProductInLocationDetails: builder.query<
            any,
            {
                filters?: {
                    location?: string;
                    product?: string;
                };
            }
        >({
            query: ({ filters } = {}) => ({
                document: gql`
                    query LocationProductList($filters: LocationProductInput) {
                        locationProductList(filters: $filters) {
                            locationProducts {
                                product {
                                    _id
                                    name
                                    description
                                    quantity
                                    createdAt
                                    updatedAt
                                    deleted
                                    deletedAt
                                    deletedBy
                                    deletedReason
                                    deletedNote
                                    createdBy
                                    updatedBy
                                    uuid
                                }
                                location {
                                    area
                                    bin
                                    rack
                                    shelf
                                }
                            }
                        }
                    }
                `,
                variables: filters ? { filters } : {},
            }),
            transformResponse: (response: any) =>
                response.locationProductList.locationProducts,
        }),
        getUnAuthorizedProductDetails: builder.query<
            any,
            {
                uuid: string;
            }
        >({
            query: ({ uuid }) => ({
                document: gql`
                    query GetUnauthorizedProductDetails($uuid: String!) {
                        getUnauthorizedProductDetails(uuid: $uuid) {
                            sku
                            serialized
                            _id
                            adjusted
                            name

                            image {
                                name
                                type
                                url
                            }

                            description
                            height
                            notes
                            price {
                                sell
                                cost
                            }
                            quantity
                            serializedProducts {
                                uuid
                                number
                                product
                            }
                            status
                            tags
                            type
                            uuid
                        }
                    }
                `,
                variables: { uuid: uuid },
            }),
            transformResponse: (response: any) =>
                response.getUnauthorizedProductDetails,
        }),
    }),
});

export const {
    useGetInventoryListNewQuery,
    useGetInventoryAutocompleteListQuery,
    useGetInventoryListWithUUIDQuery,
    useGetProductByUuidQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useCreateCategoryMutation,
    useCreateManufacturerMutation,
    useCreateUomMutation,
    useGetCategoryListQuery,
    useGetManufacturerListQuery,
    useGetUomListQuery,

    useGetProductsByLocationUUIDQuery,
    useGetSingleProductInLocationDetailsQuery,

    useGenerateQrCodeMutation,
    useGetUnAuthorizedProductDetailsQuery,
} = inventoryAPI;
