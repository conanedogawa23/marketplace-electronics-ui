import { type GridColDef, type GridRowsProp } from '@mui/x-data-grid';

export interface DataTableProps {
    columns: GridColDef[];
    rows: GridRowsProp;
    checkboxSelection: boolean;
    endSlot?: React.ReactNode | (() => React.ReactNode);
    isLoading?: boolean;
    isError?: boolean;
}
