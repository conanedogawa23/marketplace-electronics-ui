import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { type CellContext } from '@tanstack/react-table';

export interface Coll07CellProps<T> {
    info: CellContext<T, unknown>;
    idSelector: (row: T) => string;
}

export function Coll07Cell<T>(props: Coll07CellProps<T>) {
    const { row, table } = props.info;
    const deleteRow = table.options.meta?.adjustmentTable?.deleteRow;
    return (
        <IconButton
            aria-label='delete'
            onClick={() => {
                const id = props.idSelector?.(row.original);
                id && deleteRow?.(id);
            }}
        >
            <Delete />
        </IconButton>
    );
}

export default Coll07Cell;
