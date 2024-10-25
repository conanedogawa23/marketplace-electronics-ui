import { useDebounce } from '@/hooks/useDebounce';
import { DevTool } from '@hookform/devtools';
import { Box, Button, Stack, Typography } from '@mui/material';
import { type Row, type Table } from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { type SerializedProduct } from '@/lib/redux/products/types';

import SerialNoSearchBar from './search-bar';
import { SelectedSerialChips } from './selected-serial-chips';
import SerialNoList from './serial-list';
import { type ExpandableViewFormState } from './types';

export type ExpandableView2Props<T> = {
    row: Row<T>;
    table: Table<T>;

    serialsToRemoveAccessor: keyof T;
    changedAccessor: keyof T;
    deleteSerialNumbers: boolean;
};

export function ExpandableView2<T>({
    row,
    table,
    changedAccessor,
    serialsToRemoveAccessor,
}: Readonly<ExpandableView2Props<T>>) {
    const initiallySelectedSerials = row.original[
        serialsToRemoveAccessor
    ] as string[];

    const updateData = table.options.meta?.adjustmentTable?.updateData;

    // Initialize state
    const [serialNumbers] = useState(
        () =>
            ((row?.original as any)?.['serializedProducts']?.map(
                (serialProduct: SerializedProduct) => serialProduct?.number,
            ) as string[]) ?? [],
    );
    const [query, setQuery] = useState('');

    // Debounce the query to optimize search performance
    const [debouncedQuery] = useDebounce(query, 500);

    // React Hook Form setup
    const form = useForm<ExpandableViewFormState>({
        defaultValues: {
            serials: initiallySelectedSerials,
        },
    });

    const { handleSubmit, control, watch } = form;

    // Filter serial numbers based on debounced query
    const filteredSerialNumbers = useMemo(() => {
        return serialNumbers.filter((serial) =>
            serial.toLowerCase().includes(debouncedQuery.toLowerCase()),
        );
    }, [debouncedQuery, serialNumbers]);

    // Watch selected serials
    const selectedSerials = watch('serials');

    // Handle form submission
    const onSubmit = (data: ExpandableViewFormState) => {
        console.log(data);

        if (data.serials.length === 0) return;

        updateData?.(row.index, serialsToRemoveAccessor, data.serials);
        updateData?.(row.index, changedAccessor, -data.serials.length);
    };

    useEffect(() => {
        if (!selectedSerials) return;
        if (Array.isArray(selectedSerials) && selectedSerials.length > 0) {
            updateData?.(row.index, serialsToRemoveAccessor, selectedSerials);
            updateData?.(row.index, changedAccessor, -selectedSerials?.length);
        }
    }, [selectedSerials]);

    return (
        <Stack p={4} gap={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction='row' justifyContent='space-between' mb={5}>
                    <Typography variant='body2' fontWeight={500}>
                        Select Serial Numbers to remove
                    </Typography>
                    <Button
                        size='small'
                        variant='contained'
                        color='secondary'
                        disabled={selectedSerials.length === 0}
                        type='submit'
                    >
                        Save
                    </Button>
                </Stack>
                <Box mb={3}>
                    <SelectedSerialChips
                        control={control}
                        selectedSerials={selectedSerials}
                    />
                </Box>
                <SerialNoSearchBar query={query} setQuery={setQuery} />
                <SerialNoList
                    control={control}
                    filteredSerialNumbers={filteredSerialNumbers}
                />
            </form>
            <DevTool control={control} />
        </Stack>
    );
}

export default ExpandableView2;
