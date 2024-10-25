'use client';

import { ActivityLogType, DefaultAvitivityIdGenerator } from '@/common/status';
import { Box, Divider, type SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { StockAdjustmentTable } from '@/app/inventory/adjust-stocks/components/table/index';
import AdjustItemConfirmModal from '@/app/inventory/components/StocksConfirmationModal';

import { useLazyGetLocationsForWarehouseQuery } from '@/lib/redux/locations/getLocations';
import { useGetProductListQuery } from '@/lib/redux/products/getProducts';
import type { UpdateSequenceInput } from '@/lib/redux/products/types';
import {
    useGetReasonLogListQuery,
    useUpdateProductSequenceMutation,
} from '@/lib/redux/products/updateProductSequence';
import { useGetWarehouseListQuery } from '@/lib/redux/warehouse/getWarehouses';

import { HeaderSection } from '../components/HeaderSection';
import { ProductSection } from '../components/ProductSection';
import { ReasonSection } from '../components/ReasonSection';
import type { AdjustmentTableDataType } from '../components/table/types';
import { WarehouseSection } from '../components/WarehouseSection';

const NewAdjustment = () => {
    const router = useRouter();

    const [warehouses, setWarehouses] = useState(['']);
    const [productsToAdjust, setProductsToAdjust] = useState<
        AdjustmentTableDataType[]
    >([]);

    const [query, setQuery] = useState('');

    const {
        data: warehouseList = [],
        isLoading: isLoadingWarehouses,
        isError,
    } = useGetWarehouseListQuery();

    const { data: products = [], isLoading: isLoadingProducts } =
        useGetProductListQuery({
            filters: {
                ...(query && { name: query }),
            },
        });
    const [productList, setProductList] = useState(products);
    const [openAdjustItemConfirmModal, setOpenAdjustItemConfirmModal] =
        useState(false);

    const [reason, setReason] = useState({
        label: '',
        value: '',
    });
    const [adjustmentId, setAdjustmentId] = useState(
        DefaultAvitivityIdGenerator(),
    );
    const [adjustmentNote, setAdjustmentNote] = useState('');

    const [warehouse, setWarehouse] = useState('');
    const [warehouseUuid, setWarehouseUuid] = useState('');
    const [updateProductPayload, setUpdateProductPayload] = useState([]) as any;

    const [
        updateProductSequence,
        {
            data: updateProductSequenceData,
            isLoading: isLoadingUpdateProductSequence,
            isError: isErrorUpdateProductSequence,
        },
    ] = useUpdateProductSequenceMutation();

    const { data: reasonLogList = [], refetch } = useGetReasonLogListQuery();

    const [
        getLocationsForWarehouse,
        { data: warehouseLocations, isLoading: isLoadingWarehouseLocations },
    ] = useLazyGetLocationsForWarehouseQuery();

    const handleWarehouseSelect = (event: SelectChangeEvent) =>
        setWarehouse(event.target.value);

    useEffect(() => {
        if (isLoadingWarehouses) return;

        if (isError) return;

        if (!warehouseList?.length) return;

        const parsedWarehouses = warehouseList?.map(
            (warehouse) => warehouse?.name,
        );
        setWarehouse(parsedWarehouses[0]);
        setWarehouses(parsedWarehouses);
    }, [warehouseList, isLoadingWarehouses, isError]);

    useEffect(() => {
        if (isLoadingProducts) return;
        if (products?.length > 0) {
            setProductList(products);
        }
    }, [isLoadingProducts, products]);

    useEffect(() => {
        setProductsToAdjust((prev) => {
            return prev.map((product) => {
                return {
                    ...product,
                    locations: warehouseLocations || [],
                };
            });
        });
    }, [warehouseLocations]);

    useEffect(() => {
        if (!warehouseUuid) return;
        getLocationsForWarehouse({ warehouse: warehouseUuid });
    }, [warehouseUuid]);

    useEffect(() => {
        if (warehouseList?.length === 0) return;
        if (!warehouse) return;
        const warehouseIndex = warehouses.indexOf(warehouse);
        if (warehouseIndex === -1) return;
        setWarehouseUuid(warehouseList[warehouseIndex]?.uuid);
    }, [warehouse]);

    useEffect(() => {
        if (!updateProductPayload) return;
        if (isLoadingUpdateProductSequence) return;
        if (isErrorUpdateProductSequence) return;
        const triggerUpdateSequence = async () => {
            if (updateProductPayload && updateProductPayload?.length > 0) {
                const requestPayload: UpdateSequenceInput = {
                    products: updateProductPayload,
                    activityId: adjustmentId,
                    description:
                        'Stock Adjustment for warehouse ' +
                        warehouse +
                        ' with notes ' +
                        adjustmentNote,
                    type: ActivityLogType.ADJUST_STOCK,
                    activityReason: reason?.value,
                    status: 'active',
                    note: adjustmentNote,
                    warehouse: warehouseUuid,
                };
                console.log('Request Payload :::', requestPayload);
                await updateProductSequence(requestPayload);
            }
        };
        triggerUpdateSequence();
    }, [updateProductPayload]);

    useEffect(() => {
        if (!updateProductSequenceData) return;
        if (isLoadingUpdateProductSequence) return;
        if (isErrorUpdateProductSequence) {
            toast.error('Error while updating product sequence');
            return;
        }
        toast.success('StockAdjusted successfully');
        router.push('/inventory/adjust-stocks');
    }, [
        updateProductSequenceData,
        isLoadingUpdateProductSequence,
        isErrorUpdateProductSequence,
    ]);

    return (
        <>
            <Box>
                <HeaderSection
                    onCancel={() => {
                        router.back();
                    }}
                    products={productsToAdjust}
                    onDone={() => {
                        setOpenAdjustItemConfirmModal(true);
                    }}
                />
                <ReasonSection
                    setReason={setReason}
                    setAdjustmentNote={setAdjustmentNote}
                    setAdjustmentId={setAdjustmentId}
                    reasons={reasonLogList}
                    fetchReasonTrigger={refetch}
                />
                <Divider />
                <WarehouseSection
                    warehouse={warehouse}
                    handleWarehouseSelect={handleWarehouseSelect}
                    warehouses={warehouses}
                />
                {productList && productList?.length > 0 && (
                    <ProductSection
                        isLoadingProducts={isLoadingProducts}
                        productData={[...productList]}
                        warehouseLocations={warehouseLocations}
                        setProductsToAdjust={setProductsToAdjust}
                        setQuery={setQuery}
                    />
                )}

                {warehouseUuid && warehouseUuid?.length > 0 && (
                    <StockAdjustmentTable
                        data={productsToAdjust}
                        setData={setProductsToAdjust}
                    />
                )}
            </Box>

            <AdjustItemConfirmModal
                open={openAdjustItemConfirmModal}
                setUpdateProductPayload={setUpdateProductPayload}
                products={productsToAdjust}
                setWarehouse={setWarehouse}
                setOpen={setOpenAdjustItemConfirmModal}
                itemDescription={'Adjust Absen A3 Pro, JBL Bass Boost Qty?'}
                questionText='Do you want to make the changes?'
            />
        </>
    );
};

export default NewAdjustment;
