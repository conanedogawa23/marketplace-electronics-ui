import { type Product } from '@/lib/redux/products/types';

export interface ReceiveItemTableDataType extends Product {
    serialsToAdd: string[];
    serialsToRemove: string[];

    subLocation: string;

    ordered: number;
    received: number;
    toReceive: number;
}

export interface PrintQrModalData {
    printQrProducts: PrintQrProduct[];
}
export interface PrintQrProduct {
    name: string;
    sku: string;
    uuid: string;
    serialized: boolean;
    serializedProducts: SerializedProduct[];
}
export interface SerializedProduct {
    number: string;
    uuid: string;
}
