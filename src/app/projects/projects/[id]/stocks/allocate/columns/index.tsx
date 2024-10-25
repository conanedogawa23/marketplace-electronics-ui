import { Typography } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';

import { Header } from '@/components/adjustment-table/headers';

import { type AllocationAdjustmentTableData } from '../../../../types';
import { Col00Cell } from './col-00-cell';
import { Col01Cell } from './col-01-cell';
import { Col02Cell } from './col-02-cell';
import { Col03Cell } from './col-03-cell';
import { Coll06Cell } from './col-06-cell';

const columnHelper = createColumnHelper<AllocationAdjustmentTableData>();

export const columns = [
    columnHelper.display({
        id: 'expand',
        header: () => '',
        cell: (info) => {
            const isEnabled = !!info.row.original.product.serialized;
            return <Col00Cell info={info} isEnabled={isEnabled} />;
        },
    }),
    columnHelper.accessor('product.serialized', {
        header: (info) => <Header info={info}>Track Serial</Header>,
        cell: (info) => {
            return (
                <Col01Cell
                    info={info}
                    changeQuantityAccessor='changedQuantity'
                    serialsToAddArrayAccessor='addSerialNo'
                    serialsToRemoveArrayAccessor='removeSerialNo'
                    serialized={
                        info?.row?.original?.product?.serialized ?? false
                    }
                />
            );
        },
    }),

    columnHelper.accessor('product', {
        header: (info) => <Header info={info}>Product</Header>,
        cell: (info) => <Col02Cell info={info} />,
    }),
    columnHelper.accessor('fromsubLocation', {
        header: (info) => <Header info={info}>From Sub Location</Header>,
        cell: (info) => <Col03Cell info={info} />,
    }),
    columnHelper.accessor('projectQuantity', {
        header: (info) => <Header info={info}>Project Qty</Header>,
        cell: (info) => (
            <Typography variant='body1'>{info.getValue()}</Typography>
        ),
    }),
    columnHelper.accessor('allocated', {
        header: (info) => <Header info={info}>Allocated</Header>,
        cell: (info) => (
            <Typography variant='body1'>{info.getValue()}</Typography>
        ),
    }),
    columnHelper.accessor('quantityNeeded', {
        header: (info) => <Header info={info}>Qty Needed</Header>,
        cell: (info) => (
            <Typography variant='body1'>{info.getValue()}</Typography>
        ),
    }),
    columnHelper.accessor('available', {
        header: (info) => <Header info={info}>Available</Header>,
        cell: (info) => {
            const fromsubLocation = info.row.original.fromsubLocation;
            // filter out the available quantity for the selected sublocation
            const available = info.row.original.subLocationList.find(
                (item) => item.convertedArray.subLocation === fromsubLocation
            );
            return <Typography variant='body1'>{available ? available.quantity - available.onUsed : info.getValue()}</Typography>
        },
    }),

    // columnHelper.accessor('allocate', {
    //     header: (info) => <Header info={info}>Allocate</Header>,
    //     cell: (info) => (
    //         <Typography variant='body1'>{info.getValue()}</Typography>
    //     ),
    // }),
    columnHelper.accessor('changedQuantity', {
        header: (info) => <Header info={info}>Allocate</Header>,
        cell: (info) => <Coll06Cell info={info} />,
    }),

    // columnHelper.display({
    //     id: 'delete',
    //     header: () => '',
    //     cell: (info) => <Coll07Cell info={info} />,
    // }),
];
