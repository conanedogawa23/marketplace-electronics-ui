import { type Row, type Table } from '@tanstack/react-table';

import ExpandableView2 from '@/components/adjustment-table/expandable-view/expandable-view-2';

import { type TransferStocksTableData } from '../table/types';

export const ExpandableView: React.FC<{
    row: Row<TransferStocksTableData>;
    table: Table<TransferStocksTableData>;
}> = ({ row, table }) => {
    return (
        <ExpandableView2
            deleteSerialNumbers={true}
            row={row}
            table={table}
            serialsToRemoveAccessor='serialsToRemove'
            changedAccessor='transferQuantity'
        />
    );
};

export default ExpandableView;
