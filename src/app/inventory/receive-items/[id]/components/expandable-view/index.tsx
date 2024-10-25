import { type Row, type Table } from '@tanstack/react-table';

import { ExpandableView1 } from '@/components/adjustment-table/expandable-view/expandable-view-1';

import { type ReceiveItemTableDataType } from '../table/types';

export const ExpandableView: React.FC<{
    row: Row<ReceiveItemTableDataType>;
    table: Table<ReceiveItemTableDataType>;
}> = ({ row, table }) => {
    return (
        <ExpandableView1
            row={row}
            table={table}
            serialsToAddArrayAccessor='serialsToAdd'
        />
    );
};

export default ExpandableView;
