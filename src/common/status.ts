import { v4 } from 'uuid';

export enum ActivityLogType {
    ADJUST_STOCK = 'adjust_stock',
    RECEIVE_STOCK = 'receive_stock',
    TRANSFER_STOCK = 'transfer_stock',
    ALLOCATE_STOCK = 'allocate_stock',
    DEALLOCATE_STOCK = 'deallocate_stock',
}

export const DefaultAvitivityIdGenerator = () => {
    return v4()?.split('-')[0];
};
