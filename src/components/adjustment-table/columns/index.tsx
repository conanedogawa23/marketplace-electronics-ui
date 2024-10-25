import { Typography } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';

import { type AdjustmentTableDataType } from '@/components/adjustment-table/types';

import {
    Col00Cell,
    Col01Cell,
    Col02Cell,
    Col03Cell,
    Coll06Cell,
    Coll07Cell,
} from '../cells';
import { Header } from '../headers';

const columnHelper = createColumnHelper<AdjustmentTableDataType>();

export const columns = [
    columnHelper.display({
        id: 'expand',
        header: () => '',
        cell: (info) => {
            const isEnabled = !!info.row.original.serialized;
            return <Col00Cell info={info} isEnabled={isEnabled} />;
        },
    }),
    columnHelper.accessor('serialized', {
        header: (info) => <Header info={info}>Track Serial</Header>,
        cell: (info) => {
            return (
                <Col01Cell
                    info={info}
                    changeQuantityAccessor='changed'
                    serialsToAddArrayAccessor='serialsToAdd'
                    serialsToRemoveArrayAccessor='serialsToRemove'
                />
            );
        },
    }),
    columnHelper.display({
        id: 'product',
        header: (info) => <Header info={info}>Product</Header>,
        cell: (info) => (
            <Col02Cell
                id={info.row.original.uuid}
                name={info.row.original.name}
            />
        ),
    }),
    columnHelper.accessor('subLocation', {
        header: (info) => <Header info={info}>Sub Location</Header>,
        cell: (info) => <Col03Cell info={info} />,
    }),
    columnHelper.accessor('initial', {
        header: (info) => <Header info={info}>Ordered</Header>,
        cell: (info) => (
            <Typography variant='body1'>{info.getValue()}</Typography>
        ),
    }),
    columnHelper.accessor('final', {
        header: (info) => <Header info={info}>Received</Header>,
        cell: (info) => (
            <Typography variant='body1'>{info.getValue()}</Typography>
        ),
    }),
    columnHelper.accessor('changed', {
        header: (info) => <Header info={info}>To Receive</Header>,
        cell: (info) => (
            <Coll06Cell
                info={info}
                finalQuantityAccessor='final'
                serialNumbersToAddArrayAccessor='serialsToAdd'
                isEnabled={!!info.row.original.serialized}
                currentQuantity={info.row.original.quantity}
            />
        ),
    }),
    columnHelper.display({
        id: 'delete',
        header: () => '',
        cell: (info) => <Coll07Cell info={info} idSelector={(d) => d.uuid} />,
    }),
];
