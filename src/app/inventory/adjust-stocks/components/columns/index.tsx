import { Typography } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';

import {
    Col00Cell,
    Col01Cell,
    Col02Cell,
    Col03Cell,
    Coll06Cell,
    Coll07Cell,
} from '@/components/adjustment-table/cells';
import { Header } from '@/components/adjustment-table/headers';

import { type AdjustmentTableDataType } from '../table/types';

const columnHelper = createColumnHelper<AdjustmentTableDataType>();

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
                disabled={
                    info.row.original.adjusted === true &&
                    info.row.original.serialized === false
                }
                info={info}
                serialized={info.row.original.serialized as boolean}
                adjusted={info.row.original.adjusted}
                serialsToAddArrayAccessor='serialsToAdd'
                changeQuantityAccessor='changedQuantity'
                serialsToRemoveArrayAccessor='serialsToRemove'
            />
        ),
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

    columnHelper.accessor('initialQuantity', {
        header: (info) => <Header info={info}>On Hand</Header>,
        cell: (info) => (
            <Typography variant='body1'>{info.getValue()}</Typography>
        ),
    }),
    columnHelper.accessor('changedQuantity', {
        header: (info) => <Header info={info}>Final</Header>,
        cell: (info) => (
            <Coll06Cell
                info={info}
                isEnabled={!!info.row.original.serialized}
                currentQuantity={info.row.original.initialQuantity}
                finalQuantityAccessor='finalQuantity'
                serialNumbersToAddArrayAccessor='serialsToAdd'
            />
        ),
    }),

    columnHelper.accessor('finalQuantity', {
        header: (info) => <Header info={info}>Change</Header>,
        cell: (info) => (
            <Typography variant='body1'>{info.getValue()}</Typography>
        ),
    }),
    columnHelper.display({
        id: 'delete',
        header: () => '',
        cell: (info) => <Coll07Cell info={info} idSelector={(d) => d.uuid} />,
    }),
];
