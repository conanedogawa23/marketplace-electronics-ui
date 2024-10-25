import { type Product } from '../products/types';

export interface VendorListResponse {
    vendorList: VendorList;
}

interface VendorList {
    vendors: Vendor[];
    hasMore: boolean;
}

export interface VendorInputs {
    name: string;
    email: string;
    source?: string;
}

export interface Vendor {
    _id: string;
    uuid: string;
    name: string;
    email: string;
    source: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    deletedBy: string;
    deletedAt: string;
    deletedReason: string;
    deletedNote: string;
}

export interface VendorResponse {
    vendor: Vendor;
}

export interface VendorProductListResponse {
    vendorProductList: VendorProductList;
}

interface VendorProductList {
    vendorProducts: VendorProduct[];
    hasMore: boolean;
}

export interface VendorProductInputs {
    vendor?: string;
    product?: string;
    price?: number;
    currency?: string;
}

export interface VendorProduct {
    _id: string;
    uuid: string;
    vendor: Vendor;
    product: Product;
    price: number;
    currency: string;
    createdBy: string;
    updatedBy: string;
    deletedAt: string;
    deletedBy: string;
    deleted: boolean;
    deletedReason: string;
    deletedNote: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}
