import { type Product } from '@/lib/redux/products/types';

export interface AdjustmentTableDataType extends Product {
    serialsToAdd: string[];
    serialsToRemove: string[];
    locations?: any[];
    deleteSerialNumbers: boolean;
    subLocation: string;
    initialQuantity: number;
    finalQuantity: number;
    changedQuantity: number;
}
