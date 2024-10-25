import { useRef, useState } from 'react';

import AutocompleteNew from '@/components/AutocompleteNew';
import DataTable from '@/components/Table/Table';

const Inventory = () => {
    const [search, setSearch] = useState('');
    const tableRef = useRef<HTMLDivElement>(null);

    const rows = [
        {
            id: 1,
            stockLocation: 'Warehouse-5/ Floor1/ Rack9/ Shelf-01/ Bin5',
            allocatedTo: 'Central City College',
            quantity: 1,
            po: 'Manually added',
            notes: 'In the school auditorium',
        },
        {
            id: 2,
            stockLocation: 'Warehouse-5/ Floor1/ Rack9/ Shelf-01/ Bin5',
            allocatedTo: 'Saints Joseph School',
            quantity: 1,
            po: 'Manually added',
            notes: 'Conference Room',
        },
        {
            id: 3,
            stockLocation: 'Warehouse-5/ Floor1/ Rack9/ Shelf-01/ Bin5',
            allocatedTo: 'Victoria Museum',
            quantity: 1,
            po: 'Manually added',
            notes: 'School Auditorium',
        },
        {
            id: 4,
            stockLocation: 'Warehouse-5/ Floor1/ Rack9/ Shelf-01/ Bin5',
            allocatedTo: 'Central City Food Bank',
            quantity: 1,
            po: 'Manually added',
            notes: 'Theatre',
        },
        {
            id: 5,
            stockLocation: 'Warehouse-5/ Floor1/ Rack9/ Shelf-01/ Bin5',
            allocatedTo: 'Central City College',
            quantity: 1,
            po: 'Manually added',
            notes: 'Conference Room',
        },
        {
            id: 6,
            stockLocation: 'Warehouse-5/ Floor1/ Rack9/ Shelf-01/ Bin5',
            allocatedTo: 'Saints Joseph School',
            quantity: 1,
            po: 'Manually added',
            notes: 'Conference Room',
        },
        // Add more rows as needed
    ];

    const headCells = [
        { id: 'stockLocation', label: 'Stock Location', minWidth: 300 },
        { id: 'allocatedTo', label: 'Allocated To', minWidth: 200 },
        { id: 'quantity', label: 'Quantity', minWidth: 100 },
        { id: 'po', label: 'PO', minWidth: 150 },
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
            <AutocompleteNew
                width='100%'
                options={['Ordered', 'Partially Received', 'Received']}
                placeholder='Search Inventory'
            />
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

export default Inventory;
