import { type Product } from '@/lib/redux/products/types';

export type AdjustmentTableDataType = Product & {
    serialsToAdd: string[];
    deleteSerialNumbers: boolean;
    serialsToRemove: string[];

    subLocation: string;

    initial: number;
    changed: number;
    final: number;
};
