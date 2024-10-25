import { type Location } from '../locations/types';
import { type Product } from '../products/types';
import { type Status } from '../types';

export interface LocationProductListResponse {
    locationProductList: LocationProductList;
}

interface LocationProductList {
    locationProducts: LocationProduct[];
    hasMore: boolean;
}

export interface LocationProductInputs {
    product?: string;
    location?: string;
    quantity?: number;
    lastChecked?: string;
    expirationDate?: string;
    comments?: string;
    batchNumber?: string;
    receivedDate?: string;
    status?: string;
    uuid?: string;
}

export interface LocationProduct {
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
}
