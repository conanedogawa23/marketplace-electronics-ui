import { type Row, type Table } from '@tanstack/react-table';

import { type AdjustmentTableDataType } from '@/app/inventory/adjust-stocks/components/table/types';

import { ExpandableView1 } from '@/components/adjustment-table/expandable-view/expandable-view-1';
import { ExpandableView2 } from '@/components/adjustment-table/expandable-view/expandable-view-2';

export const ExpandableView: React.FC<{
    row: Row<AdjustmentTableDataType>;
    table: Table<AdjustmentTableDataType>;
}> = ({ row, table }) => {
    const changeCount = row.original.changedQuantity;

    if (changeCount < 0) {
        return (
            <ExpandableView2
                deleteSerialNumbers={true}
                row={row}
                table={table}
                serialsToRemoveAccessor='serialsToRemove'
                changedAccessor='changedQuantity'
            />
        );
    }

    return (
        <ExpandableView1
            row={row}
            table={table}
            serialsToAddArrayAccessor='serialsToAdd'
        />
    );
};

export default ExpandableView;
