import { baseTheme } from '@/styles/theme';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    ClickAwayListener,
    Paper,
    TextField,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

import Filter from '../Filter/Filter';
import { type DataTableProps } from './model';

const DataTable: React.FC<DataTableProps> = ({
    columns,
    rows,
    checkboxSelection,
    endSlot,
    isLoading = false,
    isError = false,
}) => {
    const [searchText, setSearchText] = React.useState('');
    const [filteredRows, setFilteredRows] = React.useState(rows);
    const [filters, setFilters] = React.useState<Map<string, string[]>>(
        new Map(),
    );
    const [showFilter, setShowFilter] = React.useState(false);

    const filterGroups = React.useMemo(() => {
        const groups = new Map<string, Set<string>>();

        rows.forEach((row) => {
            Object.entries(row).forEach(([key, value]) => {
                if (key !== 'id') {
                    if (!groups.has(key)) {
                        groups.set(key, new Set());
                    }

                    groups.get(key)?.add(value?.toString());
                }
            });
        });

        return Array.from(groups).map(([groupName, options]) => ({
            groupName,
            options: Array.from(options).map((option) => ({
                label: option,
                checked: filters.get(groupName)?.includes(option) ?? false,
                onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                    const option = event.target.name;
                    const checked = event.target.checked;

                    setFilters((prevFilters) => {
                        const newFilters = new Map(prevFilters); // Create a copy of the previous Map
                        if (checked) {
                            const currentFilters =
                                newFilters.get(groupName) ?? [];
                            newFilters.set(groupName, [
                                ...currentFilters,
                                option,
                            ]);
                        } else {
                            const filteredOptions =
                                newFilters
                                    .get(groupName)
                                    ?.filter((o) => o !== option) ?? [];
                            newFilters.set(groupName, filteredOptions);
                        }
                        return newFilters;
                    });
                },
            })),
            onClear: () =>
                setFilters((prev) => {
                    const newFilters = new Map(prev);
                    newFilters.delete(groupName);
                    return newFilters;
                }),
        }));
    }, [rows, filters]);

    const renderEndSlot = () => {
        if (typeof endSlot === 'function') {
            return endSlot();
        }
        return endSlot;
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        const searchLowercase = event.target.value.toLowerCase();
        const newFilteredRows = rows.filter((row) => {
            return Object.keys(row).some((field) => {
                return (
                    row[field] != null &&
                    row[field]
                        .toString()
                        .toLowerCase()
                        .includes(searchLowercase)
                );
            });
        });
        setFilteredRows(newFilteredRows);
    };

    const customizedColumns = columns.map((column) => ({
        ...column,
        width: column.width ? column.width : 200, // Set default or custom width
    }));

    React.useMemo(() => {
        const newFilteredRows = rows.filter((row) =>
            Array.from(filters).every(([key, filterValues]) => {
                if (!filterValues || filterValues.length === 0) return true;
                return filterValues.includes(row[key].toString());
            }),
        );
        setFilteredRows(newFilteredRows);
    }, [rows, filters]);

    const handleClickAway = () => {
        setShowFilter(false);
    };

    return (
        <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    paddingLeft: '0rem',
                    backgroundColor: '#fff',
                }}
            >
                <TextField
                    variant='outlined'
                    size='small'
                    placeholder='Search items'
                    value={searchText}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: <SearchIcon />,
                    }}
                />
                <Button
                    variant='outlined'
                    startIcon={<FilterListIcon />}
                    sx={{ textTransform: 'none' }}
                    onClick={() => setShowFilter(!showFilter)}
                >
                    Filter
                </Button>
                {endSlot && (
                    <Box flex='1' display='flex' justifyContent='flex-end'>
                        {renderEndSlot()}
                    </Box>
                )}
            </Box>
            {showFilter && (
                <ClickAwayListener onClickAway={handleClickAway}>
                    <Paper
                        sx={{
                            position: 'absolute',
                            top: 48, // Adjust this to position the overlay below the button
                            right: 0,
                            left: '100px',
                            zIndex: baseTheme.zIndex.modal,
                            maxHeight: 'calc(100% - 48px)',
                            width: '25%',
                            overflow: 'auto',
                            backgroundColor: 'white',
                            boxShadow: baseTheme.shadows[5],
                            p: 2,
                            mt: 2,
                            borderRadius: '4px',
                        }}
                    >
                        <Filter filterGroups={filterGroups} />
                    </Paper>
                </ClickAwayListener>
            )}
            <Box sx={{ width: '100%', height: 'calc(100% - 100px)' }}>
                {isLoading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : isError ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <Alert severity='error'>
                            An error occurred while loading data.
                        </Alert>
                    </Box>
                ) : (
                    <DataGrid
                        rows={filteredRows}
                        columns={customizedColumns}
                        rowHeight={60}
                        checkboxSelection={checkboxSelection}
                        sx={{
                            '& .MuiDataGrid-root': {
                                color: 'text.primary',
                            },
                            '.MuiDataGrid-cell': {
                                display: 'flex',
                                alignItems: 'center',
                            },
                            '.MuiDataGrid-columnHeader': {
                                backgroundColor: '#F9FAFB',
                                fontSize: 13,
                            },
                            '.MuiDataGrid-columnHeaderTitle': {
                                fontWeight: 400,
                            },
                        }}
                    />
                )}
            </Box>
        </Box>
    );
};

export default DataTable;
