import { type Row, type Table } from '@tanstack/react-table';

import { type AllocationAdjustmentTableData } from '../../../../types';
import ExpandableView2 from './expandable-view-2';

export const ExpandableView: React.FC<{
    row: Row<AllocationAdjustmentTableData>;
    table: Table<AllocationAdjustmentTableData>;
}> = ({ row, table }) => {
    const serialized = row.original.product.serialized;

    if (serialized) {
        return <ExpandableView2 row={row} table={table} />;
    }
};

export default ExpandableView;
