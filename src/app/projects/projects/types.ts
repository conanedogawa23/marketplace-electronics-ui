import { type Product } from '@/lib/redux/products/types';
import { type ConvertedLocationArray, type SerializedProduct } from './[id]/stocks/allocate/page';

export type TrackData = {
    product: Product;
    fromsubLocation: string;
    serialNumbers: string[];
};

export type AllocationAdjustmentTableData = {
    track: TrackData[];
    action: string;
    product: Product;
    addSerialNo: string[];
    removeSerialNo: string[];
    fromsubLocation: string;
    subLocationList: ConvertedLocationArray[];
    serializedProducts: SerializedProduct[];

    productId: string;
    projectQuantity: number;
    allocated: number;
    quantityNeeded: number;
    available: number;
    allocate: number;
    changedQuantity: number;
    maxChangedQuantity: number;
};
