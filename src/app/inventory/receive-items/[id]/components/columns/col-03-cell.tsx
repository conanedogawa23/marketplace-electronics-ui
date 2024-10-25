import { useDebounce } from '@/hooks/useDebounce';
import { FormControl, MenuItem, Select } from '@mui/material';
import { type CellContext } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { useGetLocationsForWarehouseQuery } from '@/lib/redux/locations/getLocations';
import { type Location } from '@/lib/redux/locations/types';

export interface Col03CellProps<T> {
    info: CellContext<T, string>;
    warehouseId: string;
}

export function Col03Cell<T>(props: Readonly<Col03CellProps<T>>) {
    const { row, column, getValue, table } = props.info;
    const update = table.options.meta?.adjustmentTable?.updateData;

    const productID = ((row.original as any)?.uuid as string) ?? null;
    const rowErrors = productID
        ? table.options.meta?.adjustmentTable?.errors?.[productID] ?? null
        : null;

    const { data: subLocations } = useGetLocationsForWarehouseQuery(
        {
            warehouse: props.warehouseId,
        },
        {
            skip: !props.warehouseId,
        },
    );

    const [value, setValue] = useState('');

    // useDebounce to limit the number of updates
    const [debouncedValue] = useDebounce(value, 500);

    // effect to handle updates based on the debounced value
    useEffect(() => {
        if (debouncedValue === getValue()) return;
        update?.(row.index, column.id as keyof T, debouncedValue);
    }, [column.id, debouncedValue, getValue, props, row.index, update]);

    return (
        <FormControl sx={{ minWidth: 120 }} size='small'>
            <Select
                color='secondary'
                inputProps={{ 'aria-label': 'Without label' }}
                value={value}
                key={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                error={!!rowErrors?.[column.id as keyof T]}
            >
                <MenuItem value='' key='none'>
                    <em>None</em>
                </MenuItem>
                {(subLocations ?? (row?.original as any)?.locations ?? []).map(
                    (option: Location) => (
                        <MenuItem key={option?.uuid} value={option?.uuid}>
                            {option?.name || 'NAME NOT FOUND'}
                        </MenuItem>
                    ),
                )}
            </Select>
        </FormControl>
    );
}
