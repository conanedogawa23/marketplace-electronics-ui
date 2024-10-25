import Box from '@mui/material/Box';
import { useRef, useState } from 'react';

import AutocompleteNew from '@/components/AutocompleteNew';
import DataTable from '@/components/Table/Table';
import { MovementHistoryProps } from '../item/[id]/details/page';

type MovementHistoryTableProps = {
    movementHistoryTableData: MovementHistoryProps[]
}

const MovementHistory = (
    props: MovementHistoryTableProps,
) => {
    const [search, setSearch] = useState('');
    const tableRef = useRef<HTMLDivElement>(null);

    const rows = [
        {
            id: 1,
            movementType: 'Stock Adjustment',
            movementDate: 'May 12 2024; 17:00:06',
            from: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            to: 'City Centre High School, California',
            quantity: 1,
            notes: 'In the school auditorium',
        },
        {
            id: 2,
            movementType: 'Purchase Order Received',
            movementDate: 'May 12 2024; 17:00:06',
            from: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            to: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            quantity: 1,
            notes: 'Conference Room',
        },
        {
            id: 3,
            movementType: 'Stock Transfer',
            movementDate: 'May 12 2024; 17:00:06',
            from: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            to: 'City Church',
            quantity: 1,
            notes: '',
        },
        {
            id: 4,
            movementType: 'Purchase Order Received',
            movementDate: 'May 12 2024; 17:00:06',
            from: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            to: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            quantity: 1,
            notes: 'School Auditorium',
        },
        {
            id: 5,
            movementType: 'Stock Adjustment',
            movementDate: 'May 12 2024; 17:00:06',
            from: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            to: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            quantity: 1,
            notes: '',
        },
        {
            id: 6,
            movementType: 'Stock Adjustment',
            movementDate: 'May 12 2024; 17:00:06',
            from: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            to: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            quantity: 1,
            notes: '',
        },
        {
            id: 7,
            movementType: 'Stock Transfer',
            movementDate: 'May 12 2024; 17:00:06',
            from: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            to: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            quantity: 1,
            notes: '',
        },
        {
            id: 8,
            movementType: 'Purchase Order Received',
            movementDate: 'May 12 2024; 17:00:06',
            from: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            to: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            quantity: 1,
            notes: 'Conference Room',
        },
        {
            id: 9,
            movementType: 'Stock Adjustment',
            movementDate: 'May 12 2024; 17:00:06',
            from: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            to: 'Warehouse-2/ Floor1/ Rack9/ Shelf-01/ Bin5',
            quantity: 1,
            notes: 'Conference Room',
        },
    ];

    const headCells = [
        { id: 'movementType', label: 'Movement Type', minWidth: 150 },
        { id: 'movementDate', label: 'Movement Date', minWidth: 200 },
        { id: 'from', label: 'From', minWidth: 300 },
        { id: 'to', label: 'To', minWidth: 300 },
        { id: 'quantity', label: 'Quantity', minWidth: 100 },
        { id: 'notes', label: 'Notes', minWidth: 200 },
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
                    placeholder='Search Movement History'
                />
            </Box>
            <DataTable
                rows={props.movementHistoryTableData}
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

export default MovementHistory;
