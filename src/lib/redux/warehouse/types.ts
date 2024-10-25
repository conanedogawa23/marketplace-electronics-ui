import { type Status } from '../types';

export interface WarehouseListResponse {
    warehouseList: WarehouseList;
}

export interface WarehouseList {
    hasMore: boolean;
    warehouses: Warehouse[];
}

export interface WarehouseInputs {
    name?: string;
    description?: string;
    address?: string;
}

export interface Warehouse {
    name: string;
    description: string;
    createdBy: string;
    updatedBy: string;
    status: Status;
    deletedAt: string;
    deletedBy: string;
    deleted: boolean;
    deletedReason: string;
    deletedNote: string;
    createdAt: string;
    updatedAt: string;
    uuid: string;
    address: string;
}
