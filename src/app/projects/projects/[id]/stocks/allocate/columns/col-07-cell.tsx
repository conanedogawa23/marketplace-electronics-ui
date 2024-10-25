import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { type CellContext } from '@tanstack/react-table';

import { type AllocationAdjustmentTableData } from '../../../../types';

export const Coll07Cell: React.FC<{
    info: CellContext<AllocationAdjustmentTableData, unknown>;
}> = ({ info }) => {
    const { row, table } = info;
    const deleteRow = table.options.meta?.adjustmentTable?.deleteRow;
    return (
        <IconButton
            aria-label='delete'
            onClick={() => {
                const productId = row.original?.product.uuid;
                productId && deleteRow?.(productId);
            }}
        >
            <Delete />
        </IconButton>
    );
};

export default Coll07Cell;
