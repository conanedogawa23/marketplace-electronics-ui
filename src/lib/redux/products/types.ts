import { type Status } from '../types';

export interface ProductListResponse {
    productList: ProductList;
}

export interface ProductList {
    hasMore: boolean;
    products: Product[];
}

export interface Product {
    _id: string;
    attachments: null;
    adjusted: boolean;
    category: Category | null;
    createdAt: string;
    createdBy: null;
    deleted: null;
    deletedAt: null;
    deletedBy: null;
    deletedNote: null;
    deletedReason: null;
    description: string | null;
    height: number | null;
    length: number | null;
    manufacturer: Category | null;
    maxQuantity: number | null;
    minQuantity: number | null;
    name: string;
    notes: string | null;
    price: string;
    quantity: number;
    serialized: boolean | null;
    sku: string;
    status: Status;
    tags: string[];
    type: null;
    uom: Category | null;
    updatedAt: string;
    updatedBy: null;
    uuid: string;
    vendors: Category[];
    weight: number | null;
    serializedProducts: SerializedProduct[];
    width: number | null;
    location: Location;
    onUsed: number | null;
}

export interface SerializedProduct {
    number: string;
    uuid: string;
}
export interface Location {
    area?: string;
    rack?: string;
    shelf?: string;
    bin?: string;
    warehouse?: string;
    name?: string;
    uuid?: string;
}

export interface Category {
    _id: string;
    createdAt: string;
    createdBy: null;
    deleted: boolean;
    deletedAt: null;
    deletedBy: null;
    deletedNote: null;
    deletedReason: null;
    description: string;
    email?: string;
    name: string;
    phoneNumber?: string;
    source?: string;
    status: Status;
    updatedAt: string;
    updatedBy: null;
    uuid: string;
}

export interface UpdateProductSequenceInput {
    uuid: string;
    fromLocation?: string;
    toLocation: string;
    quantity: number;
    deleteSerialNumbers: boolean;
    serialNumbers: string[];
    serialized?: boolean;
}

export interface UpdateSequenceInput {
    products: UpdateProductSequenceInput[];
    activityId: string;
    activityReason?: string;
    description?: string;
    name?: string;
    type?: string;
    status?: string;
    note?: string;
    warehouse?: string;
}

export interface ReasonLogInput {
    name: string;
    status: string;
    description?: string;
}

export type ActivityLogQueryFields =
    | 'activityId'
    | 'activityReason'
    | 'createdAt'
    | 'createdBy'
    | 'deleted'
    | 'description'
    | 'name'
    | 'note'
    | 'status'
    | 'type'
    | 'updatedAt'
    | 'updatedBy'
    | 'uuid';

export interface TrackProduct {
    product: string;
    changedQuantity: number;
    deleteSerialNumbers: boolean;
    serialNumbers: string[];
    fromLocation?: string;
    toLocation: string;
}

export type ReasonLogQueryFields =
    | 'createdAt'
    | 'createdBy'
    | 'deleted'
    | 'deletedAt'
    | 'deletedBy'
    | 'deletedNote'
    | 'deletedReason'
    | 'description'
    | 'name'
    | 'status'
    | 'updatedAt'
    | 'updatedBy'
    | 'uuid';

export type ReasonLog = {
    name: string;
    description?: string;
    createdBy?: string;
    updatedBy?: string;
    status: string;
    deletedAt?: Date;
    deletedBy?: string;
    deleted?: boolean;
    deletedReason?: string;
    deletedNote?: string;
    uuid: string;
    createdAt: string;
    updatedAt: string;
};

export type ReasonLogList = {
    reasonLogs: ReasonLog[];
    hasMore: boolean;
};

export type ReasonLogResponse = {
    reasonLogList: ReasonLogList;
};

export interface ActivityLog {
    activityId: string;
    activityReason?: string;
    createdAt: string;
    createdBy: string;
    deleted: boolean;
    description: string;
    name: string;
    note: string;
    status: Status;
    type: string;
    updatedAt: string;
    updatedBy: string;
    uuid: string;
    track: TrackProduct;
}

export interface ActivityLogList {
    activityLogs: ActivityLog[];
    hasMore: boolean;
}

export interface ActivityLogListResponse {
    activityLogList: ActivityLogList;
}

export type ProductInfo = {
    name: string;
    fromLocation: string;
    toLocation: string;
    quantity: number;
    serialized: boolean;
    adjusted: boolean;
};

export type AdjustmentReason = {
    reason: string;
    uuid: string;
};

export type NewAdjustmentProps = {
    warehouseInfo?: string;
    productInfo?: ProductInfo;
    activityId?: string;
    note?: string;
    reason?: AdjustmentReason;
};

export type LocationProductQueryFields = 'location' | 'product';

export type LocationProductFilters = {
    location: string;
    product: string;
};

export type LocationProduct = {
    quantity: number;
    uuid: string;
};

export type LocationProductUpdate = {
    uuid: string;
    product: Product;
    location: Location;
    quantity: number;
    lastChecked: string;
    expirationDate: string;
    comments: string;
    batchNumber: string;
    receivedDate: string;
    createdBy: string;
    deletedAt: string;
    deletedBy: string;
    deleted: boolean;
    deletedReason: string;
    deletedNote: string;
    updatedBy: string;
    status: Status;
    createdAt: string;
    updatedAt: string;
};

export type LocationProductList = {
    locationProducts: LocationProductUpdate[];
    hasMore: boolean;
};

export type LocationProductListResponse = {
    locationProductList: LocationProductList;
};

export type SerializedProductList = {
    serializedProducts: SerializedProduct[];
    hasMore: boolean;
};
