import { type Row, type Table } from '@tanstack/react-table';

import { type AdjustmentTableDataType } from '../types';
import { ExpandableView1 } from './expandable-view-1';
import { ExpandableView2 } from './expandable-view-2';

export const ExpandableView: React.FC<{
    row: Row<AdjustmentTableDataType>;
    table: Table<AdjustmentTableDataType>;
}> = ({ row, table }) => {
    const changeCount = row.original.changed ?? 0;

    if (changeCount < 0) {
        return (
            <ExpandableView2
                row={row}
                table={table}
                serialsToRemoveAccessor='serialsToRemove'
                deleteSerialNumbers={true}
                changedAccessor='changed'
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
