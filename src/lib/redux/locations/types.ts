export interface LocationListResponse {
    locationList: LocationList;
}

interface LocationList {
    locations: Location[];
    hasMore: boolean;
}

export interface LocationInputs {
    type: string;
    area?: string;
    rack?: string;
    shelf?: string;
    bin?: string;
    description?: string;
    name?: string;
    warehouse?: string;
}
export interface Location {
    _id: string;
    uuid: string;
    name: string;
    description: string;
    type: string;
    area: string;
    rack: string;
    shelf: string;
    bin: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    deletedBy: string;
    deletedAt: string;
    deletedReason: string;
    deletedNote: string;
}

export interface Warehouse {
    _id: string;
    uuid: string;
    name: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    deletedBy: string;
    deletedAt: string;
    deletedReason: string;
    deletedNote: string;
}

export interface WarehouseListResponse {
    warehouseList: WarehouseList;
}

interface WarehouseList {
    warehouses: Warehouse[];
    hasMore: boolean;
}

export interface WarehouseInputs {
    name: string;
    description: string;
    address: string;
}

export interface Area {
    _id: string;
    uuid: string;
    name: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    deletedBy: string;
    deletedAt: string;
    deletedReason: string;
    deletedNote: string;
    warehouse: string;
}

export interface AreaListResponse {
    areaList: AreaList;
}

interface AreaList {
    areas: Area[];
    hasMore: boolean;
}

export interface AreaInputs {
    name?: string;
    description?: string;
    warehouse?: string;
}

export interface Rack {
    _id: string;
    uuid: string;
    name: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    deletedBy: string;
    deletedAt: string;
    deletedReason: string;
    deletedNote: string;
    area: string;
}

export interface RackListResponse {
    rackList: RackList;
}

interface RackList {
    racks: Rack[];
    hasMore: boolean;
}

export interface RackInputs {
    name?: string;
    description?: string;
    area?: string;
}

export interface Shelf {
    _id: string;
    uuid: string;
    name: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    deletedBy: string;
    deletedAt: string;
    deletedReason: string;
    deletedNote: string;
    rack: string;
}

export interface ShelfListResponse {
    shelfList: ShelfList;
}

interface ShelfList {
    shelves: Shelf[];
    hasMore: boolean;
}

export interface ShelfInputs {
    name?: string;
    description?: string;
    rack?: string;
}

export interface Bin {
    _id: string;
    uuid: string;
    name: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    deletedBy: string;
    deletedAt: string;
    deletedReason: string;
    deletedNote: string;
    shelf: string;
}

export interface BinListResponse {
    binList: BinList;
}

interface BinList {
    bins: Bin[];
    hasMore: boolean;
}

export interface BinInputs {
    name?: string;
    description?: string;
    shelf?: string;
}
