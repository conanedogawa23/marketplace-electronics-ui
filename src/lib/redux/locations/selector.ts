import { createSelector } from '@reduxjs/toolkit';

const selectedApiState = (state: any) => state?.['graphQL-base-API'];

export const selectWarehouseAssociatedLocations = createSelector(
    [selectedApiState, (_state: any, warehouseId: string) => warehouseId],
    (apiState: any, warehouseId: string) => {
        const warehouseObjKey = `getLocationsForWarehouse({"warehouse":"${warehouseId}"})`;
        const query = apiState?.queries[warehouseObjKey] || [];
        return query?.data;
    },
);
