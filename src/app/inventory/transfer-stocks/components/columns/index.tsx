import { Typography } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';

import { Header } from '@/components/adjustment-table/headers';

import {
    Col00Cell,
    Col01Cell,
    Col02Cell,
    Col03Cell,
    Col04Cell,
    Coll06Cell,
    Coll07Cell,
} from '../cells';
import { type TransferStocksTableData } from '../table/types';

const columnHelper = createColumnHelper<TransferStocksTableData>();

export const columns = [
    columnHelper.display({
        id: 'expand',
        header: () => '',
        cell: (info) => (
            <Col00Cell info={info} isEnabled={!!info.row.original.serialized} />
        ),
    }),
    columnHelper.accessor('serialized', {
        header: (info) => <Header info={info}>Track Serial</Header>,
        cell: (info) => (
            <Col01Cell
                disabled
                info={info}
                serialsToAddArrayAccessor='serialsToAdd'
                serialsToRemoveArrayAccessor='serialsToRemove'
                changeQuantityAccessor='transferQuantity'
            />
        ),
    }),
    columnHelper.display({
        id: 'product',
        header: (info) => <Header info={info}>Product</Header>,
        cell: (info) => (
            <Col02Cell
                name={info.row.original.name}
                id={info.row.original.uuid}
            />
        ),
    }),
    columnHelper.accessor('fromSubLocation', {
        header: (info) => <Header info={info}>From Sub Location</Header>,
        cell: (info) => <Col03Cell info={info} />,
    }),
    columnHelper.accessor('onHandQuantity', {
        header: (info) => <Header info={info}>On Hand</Header>,
        cell: (info) => (
            <Typography variant='body1'>{info.getValue()}</Typography>
        ),
    }),
    columnHelper.accessor('projectLocation', {
        header: (info) => <Header info={info}>Project Location</Header>,
        cell: (info) => <Col04Cell info={info} />,
    }),
    columnHelper.accessor('transferQuantity', {
        header: (info) => <Header info={info}>Transfer</Header>,
        cell: (info) => (
            <Coll06Cell
                info={info}
                serialNumbersToAddArrayAccessor='serialsToAdd'
                isEnabled={!!info.row.original.serialized}
                currentQuantity={info.row.original.onHandQuantity}
            />
        ),
    }),

    columnHelper.display({
        id: 'delete',
        header: () => '',
        cell: (info) => <Coll07Cell info={info} idSelector={(d) => d.uuid} />,
    }),
];
