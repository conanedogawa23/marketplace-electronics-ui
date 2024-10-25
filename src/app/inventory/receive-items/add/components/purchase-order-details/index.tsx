import { faker } from '@faker-js/faker';
import { Box } from '@mui/material';
import {
    DataGrid,
    type GridCallbackDetails,
    type GridColDef,
    type GridRowSelectionModel,
} from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Loading from '@/components/loading';

import { useGetPurchaseOrderDetailsQuery } from '@/lib/redux/purchase-order/getPurchaseOrderDetails';
import { useGetPurchaseOrderProductDetailsQuery } from '@/lib/redux/purchase-order/getPurchaseOrderProductDetails';

import { PODetailsHeader } from './po-details';
import { PODetailsFooter } from './po-details-footer';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Item' },
    { field: 'status', headerName: 'Status' },
    { field: 'source', headerName: 'Source' },
    { field: 'description', headerName: 'Description' },
    { field: 'ordered', headerName: 'Ordered' },
    { field: 'received', headerName: 'Received' },
];

const PO_ID = faker.string.uuid();

export type PurchaseOrderDetailsProps = {
    purchaseOrderId: string;
};
const PurchaseOrderDetails: React.FC<PurchaseOrderDetailsProps> = ({
    purchaseOrderId,
}) => {
    const router = useRouter();
    const [selected, setSelectedRows] = useState<GridRowSelectionModel>([]);

    const { data, isFetching } = useGetPurchaseOrderDetailsQuery({
        uuid: purchaseOrderId,
    });

    const { data: products = [], isFetching: isFetchingProducts } =
        useGetPurchaseOrderProductDetailsQuery({ purchaseOrderId });

    const productData = products.map(
        ({
            order_quantity,
            order_status,
            product,
            short_description,
            source,
        }) => ({
            description: short_description || '',
            id: product.uuid,
            name: product.name,
            ordered: order_quantity,
            received: 0,
            source: source?.name || '',
            status: order_status,
        }),
    );

    const handleRowSelection = (
        rowSelectionModel: GridRowSelectionModel,
        _details: GridCallbackDetails,
    ) => {
        setSelectedRows(rowSelectionModel);
    };

    const onNext = () => {
        if (selected.length === 0) {
            alert('Please select a row');
            return;
        }
        router.push(
            `/inventory/receive-items/${PO_ID}?productIds=${selected.join(',')}`,
        );
    };
    return (
        <Box mt={'30px'} borderRadius={'8px'} border={'1px solid #d0d5dd'}>
            {isFetching ? (
                <Loading />
            ) : (
                <>
                    <PODetailsHeader
                        name={
                            (data?.custom_id || '') +
                            (data?.purchasingSource.company_name || '')
                        }
                        projectName={data?.project.name || ''}
                        image={''}
                        notes={data?.notes || ''}
                    />

                    <Box height={450}>
                        {isFetchingProducts ? (
                            <Loading />
                        ) : (
                            <DataGrid
                                rows={productData}
                                columns={columns}
                                checkboxSelection
                                initialState={{
                                    columns: {
                                        columnVisibilityModel: {
                                            id: false,
                                        },
                                    },
                                }}
                                onRowSelectionModelChange={handleRowSelection}
                                getRowId={(row) => row.id}
                            />
                        )}
                    </Box>
                </>
            )}

            <PODetailsFooter onNext={onNext} />
        </Box>
    );
};

export default PurchaseOrderDetails;
