// FilePath: /stories/DataTable.stories.tsx
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { type GridRowsProp } from '@mui/x-data-grid';
import { type Meta, type StoryFn } from '@storybook/react';
import { useState } from 'react';

import DataTable from './Datatable';
import { RenderTags } from './Rendertag';

export default {
    title: 'Components/DataTable',
    component: DataTable,
    argTypes: {
        rows: {
            control: 'object',
        },
        checkboxSelection: {
            control: 'boolean',
        },
    },
} as Meta<typeof DataTable>;

const Template: StoryFn<typeof DataTable> = (args) => {
    const addButtonEndSlot = (
        <Button
            variant='contained'
            startIcon={<AddIcon />}
            sx={{
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: '#a748b9', // Darken color slightly on hover, customize as needed
                },
                backgroundColor: '#C255D9',
                // Add additional styling here to match your screenshot
            }}
        >
            Add
        </Button>
    );
    const [rows, setRows] = useState<GridRowsProp>(args.rows);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataTable {...args} rows={rows} endSlot={addButtonEndSlot} />
        </div>
    );
};

export const Default = Template.bind({});
Default.args = {
    columns: [
        { field: 'model', headerName: 'Model', width: 130 },
        { field: 'description', headerName: 'Description', width: 180 },
        { field: 'manufacturer', headerName: 'Manufacturer', width: 130 },
        { field: 'source', headerName: 'Source', width: 130 },
        { field: 'variant', headerName: 'Variant', width: 100 },
        { field: 'category', headerName: 'Category', width: 100 },
        // The tags column might need a custom renderer to display colored tags.
        {
            field: 'tags',
            headerName: 'Tags',
            width: 160,
            renderCell: (params) => <RenderTags tags={params.value} />,
        },
        { field: 'onHand', headerName: 'On Hand', type: 'number', width: 100 },
        {
            field: 'onOrder',
            headerName: 'On Order',
            type: 'number',
            width: 100,
        },
        {
            field: 'allocated',
            headerName: 'Allocated',
            type: 'number',
            width: 100,
        },
        {
            field: 'available',
            headerName: 'Available',
            type: 'number',
            width: 100,
        },
    ],
    rows: [
        {
            id: 1,
            model: 'B3515-10-0',
            description: 'ABSENICON3.0 C138',
            manufacturer: 'Absen',
            source: 'ETC Inc.',
            variant: 'Gray',
            category: 'Display',
            tags: [
                { label: 'Wired', color: 'blue' },
                { label: 'LED', color: 'red' },
                { label: 'Subwoofers', color: 'green' },
            ],
            onHand: 3,
            onOrder: 2,
            allocated: 1,
            available: 2,
        },
        // ... Additional rows with tags including a color property
        {
            id: 2,
            model: 'B3515-10-1',
            description: 'ABSENICON3.1 C138',
            manufacturer: 'Absen',
            source: 'ETC Inc.',
            variant: 'Black',
            category: 'Display',
            tags: [
                { label: 'Wireless', color: 'orange' },
                { label: 'LCD', color: 'purple' },
            ],
            onHand: 5,
            onOrder: 1,
            allocated: 0,
            available: 5,
        },
        {
            id: 3,
            model: 'B3515-10-2',
            description: 'ABSENICON3.2 C139',
            manufacturer: 'Absen',
            source: 'ETC Inc.',
            variant: 'White',
            category: 'Display',
            tags: [
                { label: 'Bluetooth', color: 'grey' },
                { label: 'OLED', color: 'pink' },
            ],
            onHand: 4,
            onOrder: 3,
            allocated: 2,
            available: 2,
        },
        // Add more rows as needed
    ],
    checkboxSelection: true,
};
