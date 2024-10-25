import { createSelector } from '@reduxjs/toolkit';

import { GRAPHQL_TAGS } from '../graphQLTags';

const seletedApiState = (state: any) => state?.['graphQL-base-API'];

export const selectWarehouses = createSelector(
    [seletedApiState],
    (apiState: any) => {
        const providerKey =
            apiState?.provided?.[GRAPHQL_TAGS?.Warehouses]?.[
                `${GRAPHQL_TAGS?.Warehouses}_LIST`
            ][0];
        const query = apiState?.queries?.[providerKey] || [];
        return query?.data;
    },
);

export const getFirstWarehouseName = createSelector(
    [seletedApiState],
    (apiState: any) => {
        const providerKey =
            apiState?.provided?.[GRAPHQL_TAGS?.Warehouses]?.[
                `${GRAPHQL_TAGS?.Warehouses}_LIST`
            ][0];
        const query = apiState?.queries?.[providerKey] || [];
        const { data: warehouseList = [] } = query;
        if (!warehouseList.length) {
            return '';
        }
        return warehouseList[0]?.name;
    },
);
