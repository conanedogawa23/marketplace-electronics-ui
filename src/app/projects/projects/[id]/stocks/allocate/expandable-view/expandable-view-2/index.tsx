import { useDebounce } from '@/hooks/useDebounce';
import { faker } from '@faker-js/faker';
import { DevTool } from '@hookform/devtools';
import { Box, Button, Stack, Typography } from '@mui/material';
import { type Row, type Table } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { type AllocationAdjustmentTableData } from '../../../../../types';
import { type SerializedProduct } from '../../page';
import SerialNoSearchBar from './search-bar';
import { SelectedSerialChips } from './selected-serial-chips';
import SerialNoList from './serial-list';
import { type ExpandableViewFormState } from './types';

// Mock function to simulate fetching serial numbers from an API
const getSerialNumbers = (length = 10) => {
    const array = Array.from({ length }, () => faker.string.alphanumeric(10));
    array.push('1234567890', '0987654321');
    return array;
};

export type ExpandableView2Props = {
    row: Row<AllocationAdjustmentTableData>;
    table: Table<AllocationAdjustmentTableData>;
};

const initialSerialNumbers = getSerialNumbers();

export const ExpandableView2: React.FC<ExpandableView2Props> = ({
    row,
    table,
}) => {
    console.log('row: ', row);

    const [serialNumberList, setSerialNumberList] = useState<
        SerializedProduct[]
    >(row.original.serializedProducts);

    const initiallySelectedSerials = row.original.removeSerialNo;
    const updateData = table.options.meta?.adjustmentTable?.updateData;

    // Initialize state
    const [serialNumbers] = useState(() => initialSerialNumbers);
    const [query, setQuery] = useState('');

    // Debounce the query to optimize search performance
    const [debouncedQuery] = useDebounce(query, 500);

    // React Hook Form setup
    const form = useForm<ExpandableViewFormState>({});

    const { handleSubmit, control, watch } = form;

    // Filter serial numbers based on debounced query
    const filteredSerialNumbers = useMemo(() => {
        return serialNumberList.filter((serial) =>
            serial.number.toLowerCase().includes(debouncedQuery.toLowerCase()),
        );
    }, [debouncedQuery, serialNumberList]);

    // Watch selected serials
    const selectedSerials = watch('serials');
    console.log('selectedSerials: ', selectedSerials);

    // Handle form submission
    const onSubmit = (data: ExpandableViewFormState) => {
        console.log('data new: ', data);

        if (data.serials.length === 0) return;

        updateData?.(
            row.index,
            'addSerialNo',
            data.serials.map((s) => s.uuid),
        );
        // updateData?.(row.index, 'removeSerialNo', data.serials);
        // updateData?.(row.index, 'changedQuantity', -data.serials.length);
    };

    return (
        <Stack p={4} gap={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction='row' justifyContent='space-between' mb={5}>
                    <Typography variant='body2' fontWeight={500}>
                        Select Serial Numbers to {row.original.action === 'allocate' ? 'Allocate' : 'Deallocate'}
                    </Typography>
                    <Button
                        size='small'
                        variant='contained'
                        color='secondary'
                        disabled={selectedSerials?.length === 0}
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
                    maxSelections={row.original.changedQuantity}
                />
            </form>
            <DevTool control={control} />
        </Stack>
    );
};

export default ExpandableView2;
