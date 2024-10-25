'use client';

import {
    Box,
    Checkbox,
    LinearProgress,
    Radio,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, {
    tooltipClasses,
    type TooltipProps,
} from '@mui/material/Tooltip';
import * as React from 'react';

import useInfiniteScroll from '../../hooks/useInfiniteScroll';

export interface DataTableProps<T extends Record<V, any>, V extends keyof T> {
    isSelect: boolean;
    rows: T[];
    headCells: {
        id: string;
        label: string;
        minWidth: number;
        maxWidth?: number;
    }[];
    setSelectedRows: React.Dispatch<React.SetStateAction<(number | string)[]>>;
    singleRowSelect: boolean;
    isLoading: boolean;
    isError: boolean;
    handleFetchData: (page: number) => Promise<void>;
    uniqueKey: V;
    tableHeight?: string;
    errorElement: React.ReactNode;
    noDataElement: React.ReactNode;
    isMoreData: boolean;
    navigateOnRowClick?: boolean;
    onClick?: (row: T) => Promise<void>; // New prop to enable row navigation
    tableRef?: React.RefObject<HTMLDivElement>;
}

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[2],
        fontSize: 14,
        BorderAllRounded: '8px',
    },
}));

export const DataTable = <T extends Record<V, any>, V extends keyof T>({
    isSelect,
    rows,
    headCells,
    setSelectedRows,
    singleRowSelect,
    isLoading,
    isError,
    handleFetchData,
    uniqueKey,
    tableHeight,
    errorElement,
    noDataElement,
    isMoreData,
    navigateOnRowClick, // New prop
    onClick,
    tableRef,
}: DataTableProps<T, V>) => {
    const { page, loading } = useInfiniteScroll(
        handleFetchData,
        tableRef as React.RefObject<HTMLDivElement>,
    );

    const [selected, internalSetSelected] = React.useState<(number | string)[]>(
        [],
    );

    const [columnWidths, setColumnWidths] = React.useState<
        Record<string, number>
    >(
        headCells.reduce(
            (acc, headCell) => {
                acc[headCell.id] = headCell.minWidth;
                return acc;
            },
            {} as Record<string, number>,
        ),
    );

    const [resizingColumn, setResizingColumn] = React.useState<string | null>(
        null,
    );
    const startX = React.useRef<number | null>(null);
    const isSelected = (id: number | string) => selected.indexOf(id) !== -1;
    const handleSelectRows = (
        event: React.MouseEvent<unknown>,
        id: number | string,
    ) => {
        if (!isSelect) return; // Prevent row selection if isSelect is false

        const checkbox = event.target as HTMLInputElement;
        if (checkbox.type === 'checkbox' || checkbox.type === 'radio') {
            if (singleRowSelect) {
                internalSetSelected([id]);
                setSelectedRows([id]);
                return;
            } else {
                const selectedIndex = selected.indexOf(id);
                let newSelected: (number | string)[] = [];
                if (selectedIndex === -1) {
                    newSelected = [...selected, id];
                } else if (selectedIndex === 0) {
                    newSelected = selected.slice(1);
                } else if (selectedIndex === selected.length - 1) {
                    newSelected = selected.slice(0, -1);
                } else if (selectedIndex > 0) {
                    newSelected = [
                        ...selected.slice(0, selectedIndex),
                        ...selected.slice(selectedIndex + 1),
                    ];
                }
                internalSetSelected(newSelected);
                setSelectedRows(newSelected);
            }
        }
    };
    const handleMouseDown = (
        columnId: string,
        event: React.MouseEvent<HTMLDivElement>,
    ) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('indicator')) {
            setResizingColumn(columnId);
            startX.current = event.pageX;
        }
    };
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (resizingColumn !== null && startX.current !== null) {
            const offsetX = event.pageX - startX.current;
            const newWidth =
                (columnWidths[resizingColumn] ||
                    headCells.find((column) => column.id === resizingColumn)
                        ?.minWidth ||
                    100) + offsetX;
            const maxWidth = headCells.find(
                (column) => column.id === resizingColumn,
            )?.maxWidth;
            const minWidth = headCells.find(
                (column) => column.id === resizingColumn,
            )?.minWidth;
            if (
                !maxWidth ||
                (newWidth >= (minWidth || 100) && newWidth <= maxWidth)
            ) {
                setColumnWidths((prevWidths) => ({
                    ...prevWidths,
                    [resizingColumn]: newWidth,
                }));
                startX.current = event.pageX;
            }
        }
    };
    const handleMouseUp = () => {
        setResizingColumn(null);
    };

    if (isError && errorElement) {
        return (
            <TableContainer
                sx={{
                    maxHeight: tableHeight,
                    border: '1px solid #d0d5dd',
                    borderRadius: '8px',
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {headCells.map((headCell) => (
                                <TableCell key={headCell.id} align='left'>
                                    {headCell.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell
                                colSpan={headCells.length}
                                align='center'
                            >
                                {errorElement}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
    return (
        <Box
            // ref={tableRef}
            sx={{
                width: '100%',
                border: '1px solid #D0D5DD',
                borderRadius: '8px',
                overflowX: 'auto',
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {isLoading && (
                <Box sx={{ width: '100%' }} color='secondary'>
                    <LinearProgress
                        color='secondary'
                        sx={{ borderTopLeftRadius: '8px', height: '4px' }}
                    />
                </Box>
            )}

            <TableContainer
                // ref={tableScrollDivRef}
                ref={tableRef}
                sx={{
                    // minHeight: tableHeight,
                    height: tableHeight,
                    padding: '0px',
                    border: '0px',
                }}
            >
                <Table
                    stickyHeader
                    sx={{
                        tableLayout: 'fixed',
                        width: '100%',
                    }}
                >
                    <TableHead>
                        <TableRow>
                            {isSelect && (
                                <TableCell
                                    padding='checkbox'
                                    sx={{ backgroundColor: '#F9FAFB' }}
                                >
                                    {!singleRowSelect ? (
                                        <Checkbox
                                            sx={{
                                                color: '#D0D5DD',
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: 28, // Custom size
                                                },
                                            }}
                                            color='secondary'
                                            indeterminate={
                                                selected.length > 0 &&
                                                selected.length < rows.length
                                            }
                                            checked={
                                                rows.length > 0 &&
                                                selected.length === rows.length
                                            }
                                            onChange={() => {
                                                if (
                                                    selected.length ===
                                                    rows.length
                                                ) {
                                                    internalSetSelected([]);
                                                    setSelectedRows([]);
                                                } else {
                                                    internalSetSelected(
                                                        rows.map(
                                                            (row) =>
                                                                row[uniqueKey],
                                                        ),
                                                    );
                                                    setSelectedRows(
                                                        rows.map(
                                                            (row) =>
                                                                row[uniqueKey],
                                                        ),
                                                    );
                                                }
                                            }}
                                        />
                                    ) : null}
                                </TableCell>
                            )}
                            {headCells.map((headCell) => (
                                <TableCell
                                    key={headCell.id}
                                    sx={{ backgroundColor: '#F9FAFB' }}
                                    style={{
                                        width:
                                            columnWidths[headCell.id] || 'auto',
                                    }}
                                    align='left'
                                >
                                    <div
                                        className='header'
                                        onMouseDown={(e) =>
                                            handleMouseDown(headCell.id, e)
                                        }
                                        style={{ position: 'relative' }}
                                    >
                                        {headCell.label}
                                        <div
                                            className='indicator'
                                            style={{
                                                position: 'absolute',
                                                right: 0,
                                                top: 0,
                                                bottom: 0,
                                                width: '3px',
                                                cursor: 'col-resize',
                                                background:
                                                    'rgba(0, 0, 0, 0.1)',
                                            }}
                                        />
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    {rows.length === 0 && !isLoading && (
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    colSpan={headCells.length + 1}
                                    align='center'
                                >
                                    {noDataElement}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                sx={{ cursor: 'pointer' }}
                                key={row[uniqueKey]}
                                hover // Only enable hover if isSelect is true
                                onClick={() => onClick && onClick(row)}
                                role='checkbox'
                                selected={
                                    isSelect && isSelected(row[uniqueKey])
                                } // Only show selection if isSelect is true
                            >
                                {isSelect && (
                                    <TableCell padding='checkbox'>
                                        {!singleRowSelect ? (
                                            <Checkbox
                                                sx={{
                                                    color: '#D0D5DD',
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 28, // Custom size
                                                    },
                                                }}
                                                color='secondary'
                                                checked={isSelected(
                                                    row[uniqueKey],
                                                )}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleSelectRows(
                                                        event,
                                                        row[uniqueKey],
                                                    );
                                                }}
                                            />
                                        ) : (
                                            <Radio
                                                color='secondary'
                                                checked={isSelected(
                                                    row[uniqueKey],
                                                )}
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleSelectRows(
                                                        event,
                                                        row[uniqueKey],
                                                    );
                                                }}
                                            />
                                        )}
                                    </TableCell>
                                )}
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        sx={{
                                            width:
                                                columnWidths[headCell.id] ||
                                                'auto',
                                        }}
                                        align='left'
                                    >
                                        {typeof (row as Record<string, any>)[
                                            headCell.id
                                        ] === 'string' ? (
                                            <LightTooltip
                                                arrow
                                                title={
                                                    (
                                                        row as Record<
                                                            string,
                                                            any
                                                        >
                                                    )[headCell.id]
                                                }
                                                enterDelay={500}
                                            >
                                                <div
                                                    style={{
                                                        minWidth:
                                                            columnWidths[
                                                                headCell.id
                                                            ] - 32,
                                                        overflow: 'hidden',
                                                        textOverflow:
                                                            'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    {
                                                        (
                                                            row as Record<
                                                                string,
                                                                any
                                                            >
                                                        )[headCell.id]
                                                    }
                                                </div>
                                            </LightTooltip>
                                        ) : (
                                            (row as Record<string, any>)[
                                                headCell.id
                                            ]
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};
export default DataTable;
