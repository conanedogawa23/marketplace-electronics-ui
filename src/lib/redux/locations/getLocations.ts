import { gql } from 'graphql-request';

import {
    type Area,
    type AreaInputs,
    type AreaListResponse,
    type Bin,
    type BinInputs,
    type BinListResponse,
    type Location,
    type LocationInputs,
    type LocationListResponse,
    type Rack,
    type RackInputs,
    type RackListResponse,
    type Shelf,
    type ShelfInputs,
    type ShelfListResponse,
} from '@/lib/redux/locations/types';

import { graphQLBaseAPI } from '../graphQLBaseAPI';
import { GRAPHQL_TAGS } from '../graphQLTags';

type LocationQueryFields =
    | '_id'
    | 'area'
    | 'bin'
    | 'createdAt'
    | 'deleted'
    | 'deletedAt'
    | 'deletedBy'
    | 'deletedNote'
    | 'deletedReason'
    | 'description'
    | 'name'
    | 'rack'
    | 'shelf'
    | 'status'
    | 'type'
    | 'updatedAt'
    | 'uuid'
    | 'warehouse';

export const getLocationsAPI = graphQLBaseAPI.injectEndpoints({
    endpoints: (builder) => ({
        getLocationsForWarehouse: builder.query<
            Location[],
            { warehouse: string }
        >({
            providesTags: [GRAPHQL_TAGS.Locations],
            query: ({ warehouse }) => ({
                document: gql`
                    query GetLocationsForWarehouse($warehouse: String!) {
                        locationList(filters: { warehouse: $warehouse }) {
                            locations {
                                _id
                                uuid
                                name
                                description
                                type
                                area
                                rack
                                shelf
                                bin
                                deletedAt
                                deletedBy
                                deleted
                                deletedReason
                                deletedNote
                                status
                                warehouse
                                createdAt
                                updatedAt
                            }
                        }
                    }
                `,
                variables: {
                    warehouse,
                },
            }),
            transformResponse: (response: LocationListResponse) => {
                return response?.locationList?.locations;
            },
        }),
        getLocationList: builder.query<
            Location[],
            { fields: LocationQueryFields[] } | void
        >({
            providesTags: [GRAPHQL_TAGS.Locations],
            query: (params) => ({
                document: params?.fields?.length
                    ? gql`
                          query GetLocationList {
                              locationList {
                                  locations {
                                      ${params.fields.join('\n')}
                                  }
                                  hasMore
                              }
                          }
                      `
                    : gql`
                          query GetLocationList {
                              locationList {
                                  locations {
                                      _id
                                      uuid
                                      name
                                      description
                                      type
                                      area
                                      rack
                                      shelf
                                      bin
                                      deletedAt
                                      deletedBy
                                      deleted
                                      deletedReason
                                      deletedNote
                                      status
                                      warehouse
                                      createdAt
                                      updatedAt
                                  }
                                  hasMore
                              }
                          }
                      `,
            }),
            transformResponse: (response: LocationListResponse) => {
                return response?.locationList?.locations;
            },
        }),
        createLocation: builder.mutation<
            Location,
            { location: LocationInputs }
        >({
            query: ({ location }) => ({
                document: gql`
                    mutation LocationCreate($location: LocationInput!) {
                        locationCreate(location: $location) {
                            name
                        }
                    }
                `,
                variables: {
                    location,
                },
            }),
            invalidatesTags: [GRAPHQL_TAGS.Locations],
        }),
        getCompanyLocationWarehouseList: builder.query<Location[], void>({
            query: () => ({
                document: gql`
                    query LocationList(
                        $first: Int
                        $after: Int
                        $filters: LocationInput
                    ) {
                        locationList(
                            first: $first
                            after: $after
                            filters: $filters
                        ) {
                            locations {
                                name
                                uuid
                            }
                        }
                    }
                `,
                variables: {
                    first: 100,
                    after: 0,
                    filters: {
                        type: 'company',
                    },
                },
            }),
            transformResponse: (response: LocationListResponse) => {
                return response?.locationList?.locations;
            },
        }),
        getProjectLocationsDetailsList: builder.query<Location[], void>({
            query: () => ({
                document: gql`
                    query LocationList(
                        $first: Int
                        $after: Int
                        $filters: LocationInput
                    ) {
                        locationList(
                            first: $first
                            after: $after
                            filters: $filters
                        ) {
                            locations {
                                _id
                                uuid
                                name
                                description
                                type
                                area
                                rack
                                shelf
                                bin
                                deletedAt
                                deletedBy
                                deleted
                                deletedReason
                                deletedNote
                                status
                                createdAt
                                updatedAt
                            }
                            hasMore
                        }
                    }
                `,
                variables: {
                    first: 100,
                    after: 0,
                    filters: {
                        type: 'project',
                    },
                },
            }),
            transformResponse: (response: LocationListResponse) => {
                return response?.locationList?.locations;
            },
        }),
        getWarehouseDetails: builder.query<any, { filters: { name: string } }>({
            query: ({ filters }) => ({
                document: gql`
                    query LocationList(
                        $first: Int
                        $after: Int
                        $filters: LocationInput
                    ) {
                        locationList(
                            first: $first
                            after: $after
                            filters: $filters
                        ) {
                            locations {
                                _id
                                uuid
                                name
                                description
                                type
                                area
                                rack
                                shelf
                                bin
                                deletedAt
                                deletedBy
                                deleted
                                deletedReason
                                deletedNote
                                status
                                createdAt
                                updatedAt
                            }
                            hasMore
                        }
                    }
                `,
                variables: {
                    first: 100,
                    after: 0,
                    filters,
                },
            }),
            transformResponse: (response: LocationListResponse) => {
                return response?.locationList?.locations;
            },
        }),
        createArea: builder.mutation<Area, { area: AreaInputs }>({
            query: ({ area }) => ({
                document: gql`
                    mutation AreaCreate($area: AreaInput!) {
                        areaCreate(area: $area) {
                            name
                            uuid
                        }
                    }
                `,
                variables: {
                    area,
                },
            }),
            invalidatesTags: [GRAPHQL_TAGS.Locations],
        }),
        getLocationAreaList: builder.query<
            Area[],
            { filters: { warehouse: string } }
        >({
            query: ({ filters }) => ({
                document: gql`
                    query AreaList(
                        $first: Int
                        $after: Int
                        $filters: AreaInput
                    ) {
                        areaList(
                            first: $first
                            after: $after
                            filters: $filters
                        ) {
                            areas {
                                name
                                uuid
                            }
                            hasMore
                        }
                    }
                `,
                variables: {
                    first: 100,
                    after: 0,
                    filters,
                },
            }),
            transformResponse: (response: AreaListResponse) => {
                return response?.areaList?.areas;
            },
        }),
        createRack: builder.mutation<Rack, { rack: RackInputs }>({
            query: ({ rack }) => ({
                document: gql`
                    mutation RackCreate($rack: RackInput!) {
                        rackCreate(rack: $rack) {
                            name
                            uuid
                        }
                    }
                `,
                variables: {
                    rack,
                },
            }),
            invalidatesTags: [GRAPHQL_TAGS.Locations],
        }),
        getAreaRackList: builder.query<Rack[], { filters: { area: string } }>({
            query: ({ filters }) => ({
                document: gql`
                    query RackList(
                        $first: Int
                        $after: Int
                        $filters: RackInput
                    ) {
                        rackList(
                            first: $first
                            after: $after
                            filters: $filters
                        ) {
                            racks {
                                name
                                uuid
                            }
                            hasMore
                        }
                    }
                `,
                variables: {
                    first: 100,
                    after: 0,
                    filters,
                },
            }),
            transformResponse: (response: RackListResponse) => {
                return response?.rackList?.racks;
            },
        }),
        createShelf: builder.mutation<Shelf, { shelf: ShelfInputs }>({
            query: ({ shelf }) => ({
                document: gql`
                    mutation ShelfCreate($shelf: ShelfInput!) {
                        shelfCreate(shelf: $shelf) {
                            name
                            uuid
                        }
                    }
                `,
                variables: {
                    shelf,
                },
            }),
            invalidatesTags: [GRAPHQL_TAGS.Locations],
        }),
        getRackShelfList: builder.query<Shelf[], { filters: { rack: string } }>(
            {
                query: ({ filters }) => ({
                    document: gql`
                        query ShelfList(
                            $first: Int
                            $after: Int
                            $filters: ShelfInput
                        ) {
                            shelfList(
                                first: $first
                                after: $after
                                filters: $filters
                            ) {
                                shelves {
                                    name
                                    uuid
                                }
                                hasMore
                            }
                        }
                    `,
                    variables: {
                        first: 100,
                        after: 0,
                        filters,
                    },
                }),
                transformResponse: (response: ShelfListResponse) => {
                    return response?.shelfList?.shelves;
                },
            },
        ),
        createBin: builder.mutation<Bin, { bin: BinInputs }>({
            query: ({ bin }) => ({
                document: gql`
                    mutation BinCreate($bin: BinInput!) {
                        binCreate(bin: $bin) {
                            name
                            uuid
                        }
                    }
                `,
                variables: {
                    bin,
                },
            }),
            invalidatesTags: [GRAPHQL_TAGS.Locations],
        }),
        getShelfBinList: builder.query<Bin[], { filters: { shelf: string } }>({
            query: ({ filters }) => ({
                document: gql`
                    query BinList(
                        $first: Int
                        $after: Int
                        $filters: BinInput
                    ) {
                        binList(
                            first: $first
                            after: $after
                            filters: $filters
                        ) {
                            bins {
                                name
                                uuid
                            }
                            hasMore
                        }
                    }
                `,
                variables: {
                    first: 100,
                    after: 0,
                    filters,
                },
            }),
            transformResponse: (response: BinListResponse) => {
                return response?.binList?.bins;
            },
        }),
    }),
});

export const {
    useGetLocationsForWarehouseQuery,
    useLazyGetLocationsForWarehouseQuery,
    useGetLocationListQuery,
    useCreateLocationMutation,
    useGetCompanyLocationWarehouseListQuery,
    useGetProjectLocationsDetailsListQuery,
    useGetWarehouseDetailsQuery,
    useGetLocationAreaListQuery,
    useGetAreaRackListQuery,
    useGetRackShelfListQuery,
    useGetShelfBinListQuery,
    useCreateAreaMutation,
    useCreateRackMutation,
    useCreateShelfMutation,
    useCreateBinMutation,
} = getLocationsAPI;
