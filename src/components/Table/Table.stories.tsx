import { type Meta, type StoryFn } from '@storybook/react';
import React from 'react';

import { DataTable } from '@/components/Table/Table';

export default {
    title: 'Components/Dynamic-Table',
    component: DataTable,
    argTypes: {
        handleFetchData: { action: 'fetchData' },
        setSelectedRows: { action: 'setSelectedRows' },
    },
} as Meta<typeof DataTable>;
const Template: StoryFn<typeof DataTable> = (args) => <DataTable {...args} />;
const reactElement = React.createElement('div');
export const Default = Template.bind({});
Default.args = {
    rows: [
        {
            id: 1,
            location: 'New York',
            project: 'Project A',
            quantity: 10,
            description: 'Description A',
        },
        {
            id: 2,
            location: 'Los Angeles',
            project: 'Project B',
            quantity: 20,
            description: 'Description B',
        },
        {
            id: 3,
            location: 'Chicago',
            project: 'Project C',
            quantity: 30,
            description: 'Description C',
        },
        {
            id: 4,
            location: 'Houston',
            project: 'Project D',
            quantity: 40,
            description: 'Description D',
        },
        {
            id: 5,
            location: 'Phoenix',
            project: 'Project E',
            quantity: 50,
            description: 'Description E',
        },
        {
            id: 6,
            location: 'Philadelphia',
            project: 'Project F',
            quantity: 60,
            description: 'Description F',
        },
        {
            id: 7,
            location: 'San Antonio',
            project: 'Project G',
            quantity: 70,
            description: 'Description G',
        },
        {
            id: 8,
            location: 'San Diego',
            project: 'Project H',
            quantity: 80,
            description: 'Description H',
        },
        {
            id: 9,
            location: 'Dallas',
            project: 'Project I',
            quantity: 90,
            description: 'Description I',
        },
        {
            id: 10,
            location: 'San Jose',
            project: 'Project J',
            quantity: 100,
            description: 'Description J',
        },
        {
            id: 11,
            location: 'Austin',
            project: 'Project K',
            quantity: 110,
            description: 'Description K',
        },
        {
            id: 12,
            location: 'Jacksonville',
            project: 'Project L',
            quantity: 120,
            description: 'Description L',
        },
        {
            id: 13,
            location: 'Fort Worth',
            project: 'Project M',
            quantity: 130,
            description: 'Description M',
        },
        {
            id: 14,
            location: 'Columbus',
            project: 'Project N',
            quantity: 140,
            description: 'Description N',
        },
        {
            id: 15,
            location: 'San Francisco',
            project: 'Project O',
            quantity: 150,
            description: 'Description O',
        },
    ],
    headCells: [
        { id: 'location', label: 'Location', minWidth: 100 },
        { id: 'project', label: 'Project', minWidth: 100 },
        { id: 'quantity', label: 'Quantity', minWidth: 100 },
        { id: 'description', label: 'Description', minWidth: 100 },
    ],
    singleRowSelect: false,
    isLoading: false,
    isError: false,
    uniqueKey: 'id',
    tableHeight: '700px',
    errorElement: <div>There was error loading data</div>,
    noDataElement: <div>No data available</div>,
};
export const Loading = Template.bind({});
Loading.args = {
    ...Default.args,
    isLoading: true,
};
export const WithError = Template.bind({});
WithError.args = {
    ...Default.args,
    isError: true,
};
export const NoData = Template.bind({});
NoData.args = {
    ...Default.args,
    rows: [],
};
