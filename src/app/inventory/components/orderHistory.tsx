import Box from '@mui/material/Box';
import { useRef, useState } from 'react';

import AutocompleteNew from '@/components/AutocompleteNew';
import DataTable from '@/components/Table/Table';

const OrderHistory = () => {
    const [search, setSearch] = useState('');
    const tableRef = useRef<HTMLDivElement>(null);

    const rows = [
        {
            id: 1,
            order: 'PO-000292',
            movementDate: 'May 12 2024; 17:00:06',
            stockLocation: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            status: 'Ordered',
            quantity: 1,
            subtotal: '$59.90',
        },
        {
            id: 2,
            order: 'PO-000292',
            movementDate: 'May 12 2024; 17:00:06',
            stockLocation: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            status: 'Partially Received',
            quantity: 1,
            subtotal: '$59.90',
        },
        {
            id: 3,
            order: 'PO-000292',
            movementDate: 'May 12 2024; 17:00:06',
            stockLocation: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            status: 'Ordered',
            quantity: 2,
            subtotal: '$59.90',
        },
        {
            id: 4,
            order: 'PO-000292',
            movementDate: 'May 12 2024; 17:00:06',
            stockLocation: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            status: 'Received',
            quantity: 1,
            subtotal: '$59.90',
        },
        {
            id: 5,
            order: 'PO-000292',
            movementDate: 'May 12 2024; 17:00:06',
            stockLocation: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            status: 'Ordered',
            quantity: 1,
            subtotal: '$59.90',
        },
        {
            id: 6,
            order: 'PO-000292',
            movementDate: 'May 12 2024; 17:00:06',
            stockLocation: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            status: 'Received',
            quantity: 1,
            subtotal: '$59.90',
        },
        {
            id: 7,
            order: 'PO-000292',
            movementDate: 'May 12 2024; 17:00:06',
            stockLocation: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            status: 'Partially Received',
            quantity: 1,
            subtotal: '$59.90',
        },
        {
            id: 8,
            order: 'PO-000292',
            movementDate: 'May 12 2024; 17:00:06',
            stockLocation: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            status: 'Partially Received',
            quantity: 1,
            subtotal: '$59.90',
        },
        {
            id: 9,
            order: 'PO-000292',
            movementDate: 'May 12 2024; 17:00:06',
            stockLocation: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            status: 'Received',
            quantity: 2,
            subtotal: '$59.90',
        },
        {
            id: 10,
            order: 'PO-000292',
            movementDate: 'May 12 2024; 17:00:06',
            stockLocation: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            status: 'Ordered',
            quantity: 1,
            subtotal: '$59.90',
        },
        // Adding 5 more rows
        {
            id: 11,
            order: 'PO-000293',
            movementDate: 'May 13 2024; 17:00:06',
            stockLocation: 'Warehouse-3/ Floor2/ Rack10/ Shelf-02/ Bin6',
            status: 'Ordered',
            quantity: 3,
            subtotal: '$179.70',
        },
        {
            id: 12,
            order: 'PO-000294',
            movementDate: 'May 14 2024; 17:00:06',
            stockLocation: 'Warehouse-4/ Floor3/ Rack11/ Shelf-03/ Bin7',
            status: 'Partially Received',
            quantity: 4,
            subtotal: '$239.60',
        },
        {
            id: 13,
            order: 'PO-000295',
            movementDate: 'May 15 2024; 17:00:06',
            stockLocation: 'Warehouse-5/ Floor4/ Rack12/ Shelf-04/ Bin8',
            status: 'Ordered',
            quantity: 5,
            subtotal: '$299.50',
        },
        {
            id: 14,
            order: 'PO-000296',
            movementDate: 'May 16 2024; 17:00:06',
            stockLocation: 'Warehouse-6/ Floor5/ Rack13/ Shelf-05/ Bin9',
            status: 'Received',
            quantity: 6,
            subtotal: '$359.40',
        },
        {
            id: 15,
            order: 'PO-000297',
            movementDate: 'May 17 2024; 17:00:06',
            stockLocation: 'Warehouse-7/ Floor6/ Rack14/ Shelf-06/ Bin10',
            status: 'Ordered',
            quantity: 7,
            subtotal: '$419.30',
        },
    ];

    const headCells = [
        { id: 'order', label: 'Order', minWidth: 150 },
        { id: 'movementDate', label: 'Movement Date', minWidth: 200 },
        { id: 'stockLocation', label: 'Stock Location', minWidth: 300 },
        { id: 'status', label: 'Status', minWidth: 150 },
        { id: 'quantity', label: 'Quantity', minWidth: 100 },
        { id: 'subtotal', label: 'Subtotal', minWidth: 100 },
    ];

    const handleFetchData = async (page_number: number) => {
        console.log(page_number);
    };

    const filteredRows = rows.filter((row) =>
        headCells.some((cell) => {
            // @ts-expect-error @ts-ignore
            return String(row[cell.id])
                .toLowerCase()
                .includes(search.toLowerCase());
        }),
    );

    return (
        <div style={{ padding: '20px', margin: '20px' }}>
            <Box sx={{ mb: 2 }}>
                <AutocompleteNew
                    width='100%'
                    options={['Ordered', 'Partially Received', 'Received']}
                    placeholder='Search order history'
                />
            </Box>

            <DataTable
                rows={filteredRows}
                headCells={headCells}
                singleRowSelect={false}
                isLoading={false}
                isError={false}
                uniqueKey='id'
                tableHeight='600px'
                handleFetchData={handleFetchData}
                errorElement={<div>There was an error loading data</div>}
                noDataElement={<div>No data available</div>}
                isMoreData={true}
                setSelectedRows={() => {
                    console.log('hello world');
                }}
                isSelect={false}
                navigateOnRowClick={false}
                tableRef={tableRef}
            />
        </div>
    );
};

export default OrderHistory;
