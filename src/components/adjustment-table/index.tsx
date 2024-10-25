import {
    Table as MuiTable,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import {
    type ColumnDef,
    type ColumnOrderState,
    type ColumnSizingState,
    type ExpandedState,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    type OnChangeFn,
    type PaginationState,
    type Row,
    type RowData,
    type RowSelectionState,
    type SortingState,
    type Table,
    type TableMeta,
    useReactTable,
} from '@tanstack/react-table';
import { Fragment, useMemo, useState } from 'react';

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        adjustmentTable?: {
            errors?: Record<string, Partial<Record<keyof TData, string>>>;
            updateData: (
                rowIndex: number,
                columnId: keyof TData, // number | string | symbol,
                value: unknown,
            ) => void;
            deleteRow?: (rowId: string) => void;
        };
    }
}

export interface AdjustmentTableProps<T> {
    meta?: TableMeta<T>;
    /**  The data to display in the table */
    data?: T[];
    count?: number;

    /** An array of column definitions that describe how to display the data. */
    columns: ColumnDef<T, any>[];

    isFetching?: boolean;

    // custom empty text
    emptyText?: string;

    // sorting state
    sorting?: SortingState;
    setSorting?: React.Dispatch<React.SetStateAction<SortingState>>;

    page?: {
        pageSize: number;
        pageIndex: number;
        setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
    };

    showFooter?: boolean;

    // column order state
    columnOrder?: ColumnOrderState | undefined;
    setColumnOrder?: React.Dispatch<
        React.SetStateAction<ColumnOrderState | undefined>
    >;

    columnVisibility?: Record<string, boolean>;

    selectedRows?: RowSelectionState;
    setSelectedRows?: React.Dispatch<React.SetStateAction<RowSelectionState>>;

    // use columnSizing and setColumnSizing to control column sizing, use them together
    columnSizing?: ColumnSizingState;
    setColumnSizing?: React.Dispatch<React.SetStateAction<ColumnSizingState>>;

    expandableView: React.FC<{
        row: Row<T>;
        table: Table<T>;
    }>;

    autoResetPageIndex: boolean;
}

export function AdjustmentTable<T extends Record<string, any>>({
    data = [],
    meta,
    count = 1,
    columns,
    sorting,
    setSorting,
    page,
    columnSizing,
    setColumnSizing,
    columnOrder,
    setColumnOrder,
    columnVisibility,
    selectedRows,
    setSelectedRows,
    autoResetPageIndex,
    expandableView: ExpandableView,
}: React.PropsWithChildren<AdjustmentTableProps<T>>) {
    const [expanded, setExpanded] = useState<ExpandedState>({});

    const { pagination, pageCount } = useMemo(() => {
        const pagination = page
            ? {
                  pageIndex: page.pageIndex,
                  pageSize: page.pageSize,
              }
            : undefined;

        const pageCount = count || 1;
        return { pagination, pageCount };
    }, [count, page]);

    const table = useReactTable({
        data,
        columns,
        getRowCanExpand: () => true,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        onExpandedChange: setExpanded,
        autoResetPageIndex,
        autoResetExpanded: true,

        state: {
            expanded,
            sorting: sorting,
            pagination,

            ...(columnVisibility
                ? {
                      columnVisibility,
                  }
                : {}),

            ...(columnSizing ? { columnSizing } : {}),
            ...(columnOrder ? { columnOrder: columnOrder } : {}),
            ...(selectedRows ? { rowSelection: selectedRows } : {}),
        },
        ...(setColumnOrder
            ? {
                  onColumnOrderChange:
                      setColumnOrder as OnChangeFn<ColumnOrderState>,
              }
            : {}),
        ...(setColumnSizing ? { onColumnSizingChange: setColumnSizing } : {}),

        ...(setSelectedRows ? { enableRowSelection: true } : {}),
        ...(setSelectedRows ? { onRowSelectionChange: setSelectedRows } : {}),

        columnResizeMode: 'onChange',

        manualSorting: true,
        enableSortingRemoval: false,
        onSortingChange: setSorting,

        manualPagination: true,
        ...(page ? { pageCount } : {}),
        onPaginationChange: page?.setPagination,

        meta,
    });

    return (
        <MuiTable
            stickyHeader
            sx={{
                borderCollapse: 'separate',
                borderSpacing: '0 10px',
            }}
        >
            <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                        key={headerGroup.id}
                        sx={(theme) => ({
                            backgroundColor:
                                theme.customColors?.background.bg_secondary
                                    .light,
                            borderRadius: '4px',
                            height: '44px',
                            th: {
                                padding: 0,
                                paddingInline: 4,
                                height: '44px',
                                borderColor:
                                    theme.customColors?.border.secondary.light,
                                borderWidth: '1px 0 1px 0',
                                borderStyle: 'solid',
                            },
                            '& > th:first-of-type': {
                                borderTopLeftRadius: '4px',
                                borderBottomLeftRadius: '4px',
                                borderWidth: '1px 0px 1px 1px',
                            },
                            '& > th:last-child': {
                                borderTopRightRadius: '4px',
                                borderBottomRightRadius: '4px',
                                borderWidth: '1px 1px 1px 0px',
                            },
                        })}
                    >
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableCell
                                    key={header.id}
                                    colSpan={header.colSpan}
                                >
                                    {header.isPlaceholder ? null : (
                                        <>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                        </>
                                    )}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                ))}
            </TableHead>
            <TableBody
                sx={(theme) => ({
                    tr: {
                        backgroundColor:
                            theme.customColors?.background.bg_primary.light,
                        border: `1px solid ${
                            theme.customColors?.border.primary.light ?? ''
                        }`,
                        borderRadius: '4px',
                        height: '72px',
                        td: {
                            height: '72px',
                            padding: 0,
                            paddingInline: 4,
                            borderColor:
                                theme.customColors?.border.secondary.light,
                            borderWidth: '1px 0 1px 0',
                            borderStyle: 'solid',
                            borderTopWidth: '1px',
                            borderBottomWidth: '1px',
                        },
                        '& > td:first-of-type': {
                            borderTopLeftRadius: '4px',
                            borderBottomLeftRadius: '4px',
                            borderLeftWidth: '1px',
                        },
                        '& > td:last-child': {
                            borderTopRightRadius: '4px',
                            borderBottomRightRadius: '4px',
                            borderRightWidth: '1px',
                        },
                    },
                })}
            >
                {table.getRowModel().rows.map((row) => {
                    return (
                        <Fragment key={row.id}>
                            <TableRow>
                                {/* first row is a normal row */}
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                            {row.getIsExpanded() && (
                                <TableRow>
                                    {/* 2nd row is a custom 1 cell row */}
                                    <TableCell
                                        colSpan={row.getVisibleCells().length}
                                    >
                                        <ExpandableView
                                            row={row}
                                            table={table}
                                        />
                                    </TableCell>
                                </TableRow>
                            )}
                        </Fragment>
                    );
                })}
            </TableBody>
        </MuiTable>
    );
}

export default AdjustmentTable;
