import { Typography } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';

import {
    Col00Cell,
    Col01Cell,
    Col02Cell,
    Coll07Cell,
} from '@/components/adjustment-table/cells';
import { Header } from '@/components/adjustment-table/headers';

import { type ReceiveItemTableDataType } from '../table/types';
import { Col03Cell } from './col-03-cell';
import { Coll06Cell } from './col-06-cell';

const columnHelper = createColumnHelper<ReceiveItemTableDataType>();

export const useReceiveItemColumns = (warehouseId: string) => {
    const columns = useMemo(
        () => [
            columnHelper.display({
                id: 'expand',
                header: () => '',
                cell: (info) => (
                    <Col00Cell
                        info={info}
                        isEnabled={!!info.row.original.serialized}
                    />
                ),
            }),

            columnHelper.accessor('serialized', {
                header: (info) => <Header info={info}>Track Serial</Header>,
                cell: (info) => (
                    <Col01Cell
                        disabled={
                            info.row.original.adjusted === true
                            // && info.row.original.serialized === false
                        }
                        serialized={!!info.row.original.serialized}
                        adjusted={info.row.original.adjusted}
                        info={info}
                        serialsToAddArrayAccessor='serialsToAdd'
                        changeQuantityAccessor='toReceive'
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
                cell: (info) => (
                    <Col03Cell info={info} warehouseId={warehouseId} />
                ),
            }),

            columnHelper.accessor('ordered', {
                header: (info) => <Header info={info}>Ordered</Header>,
                cell: (info) => (
                    <Typography variant='body1'>{info.getValue()}</Typography>
                ),
            }),
            columnHelper.accessor('received', {
                header: (info) => <Header info={info}>Received</Header>,
                cell: (info) => (
                    <Typography variant='body1'>{info.getValue()}</Typography>
                ),
            }),
            columnHelper.accessor('toReceive', {
                header: (info) => <Header info={info}>Final</Header>,
                cell: (info) => (
                    <Coll06Cell
                        info={info}
                        isEnabled={!!info.row.original.serialized}
                        currentQuantity={info.row.original.ordered}
                        serialNumbersToAddArrayAccessor='serialsToAdd'
                    />
                ),
            }),

            columnHelper.display({
                id: 'delete',
                header: () => '',
                cell: (info) => (
                    <Coll07Cell info={info} idSelector={(d) => d.uuid} />
                ),
            }),
        ],
        [warehouseId],
    );

    return columns;
};
