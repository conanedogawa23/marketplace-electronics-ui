import { type Product } from '@/lib/redux/products/types';

export interface TransferStocksTableData extends Product {
    serialsToAdd: string[];
    serialsToRemove: string[];

    fromSubLocation: SubLocationType[];
    projectLocation: SubLocationType[];

    onHandQuantity: number;
    transferQuantity: number;
}
export interface SubLocationType {
    label: string;
    value: string;
}
