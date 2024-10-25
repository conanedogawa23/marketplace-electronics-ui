'use client';

import { Box, Divider, type SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';

import AdjustItemConfirmModal from '@/app/inventory/components/StocksConfirmationModal';
import { StockAdjustmentTable } from '@/app/inventory/transfer-stocks/components/table/index';

import {
    useGetProductsByLocationUUIDQuery,
    useGetSingleProductInLocationDetailsQuery,
} from '@/lib/redux/inventory/index';
import { useGetLocationsForWarehouseQuery } from '@/lib/redux/locations/getLocations';
import { type Product } from '@/lib/redux/products/types';

import { useGetWarehouseListQuery } from '../../../../lib/redux/warehouse/getWarehouses';
import DetailsSection from '../components/DetailsSection';
import HeaderSection from '../components/HeaderSection';
import LocationSection from '../components/LocationSection';
import ProductSection from '../components/ProductSection';
import { type TransferStocksTableData } from '../components/table/types';

interface LocationOption {
    label: string;
    value: string;
}
interface SubLocation {
    label: string;
    value: string;
}

const NewTransfer = () => {
    const [initialWarehouseOptions, setInitialWarehouseOptions] = useState<
        LocationOption[] | []
    >([]);
    const [finalWarehouseOptions, setFinalWarehouseOptions] = useState<
        LocationOption[] | []
    >([]);
    const [initialLocationSelect, setInitialLocationSelect] =
        useState<LocationOption>({
            label: '',
            value: '',
        });
    const [finalLocationSelect, setFinalLocationSelect] =
        useState<LocationOption>({
            label: '',
            value: '',
        });
    const [toSubLocations, setToSubLocations] = useState<SubLocation[] | []>(
        [],
    );
    const [
        productsSearchAutocompleteValue,
        setProductsSearchAutocompleteValue,
    ] = useState<LocationOption>({
        label: '',
        value: '',
    });
    const [singleProductDetails, setSingleProductDetails] = useState<Product>();

    const { data: warehouseLocationData } = useGetLocationsForWarehouseQuery({
        warehouse: finalLocationSelect.value,
    });

    const { data: productsByLocationData } = useGetProductsByLocationUUIDQuery(
        initialLocationSelect.value
            ? { filters: { location: initialLocationSelect.value } }
            : {},
    );
    const { data: singleProductInLocationDetailsData } =
        useGetSingleProductInLocationDetailsQuery({
            filters: {
                location: initialLocationSelect.value,
                product: productsSearchAutocompleteValue?.value,
            },
        });
    console.log('singleProductDetails', singleProductDetails);
    console.log('productsByLocationData', productsByLocationData);
    console.log('warehouseLocationData', warehouseLocationData);
    useEffect(() => {
        if (warehouseLocationData) {
            const validLocations = warehouseLocationData.filter(
                (location) =>
                    location.area &&
                    location.rack &&
                    location.shelf &&
                    location.bin,
            );
            const subLocations = validLocations.map((location) => ({
                label: `${location.area}-${location.rack}-${location.shelf}-${location.bin}`,
                value: location.uuid,
            }));
            setToSubLocations(subLocations);
        }
    }, [warehouseLocationData]);
    console.log('toSubLocations', toSubLocations);

    const [productsToTransfer, setProductsToTransfer] = useState<
        TransferStocksTableData[]
    >([]);
    const [query, setQuery] = useState('');
    const [openAdjustItemConfirmModal, setOpenAdjustItemConfirmModal] =
        useState(false);

    const handleInitialLocationSelect = (event: SelectChangeEvent<string>) => {
        const selectedValue = event.target.value;
        const selectedOption = initialWarehouseOptions.find(
            (option) => option.value === selectedValue,
        );
        setInitialLocationSelect(selectedOption || { label: '', value: '' });
    };

    const handleFinalLocationSelect = (event: SelectChangeEvent<string>) => {
        const selectedValue = event.target.value;
        const selectedOption = finalWarehouseOptions.find(
            (option) => option.value === selectedValue,
        );
        setFinalLocationSelect(selectedOption || { label: '', value: '' });
    };

    const { data: warehouseListData } = useGetWarehouseListQuery();

    useEffect(() => {
        if (warehouseListData) {
            const warehouseOptions = warehouseListData.map((warehouse) => ({
                label: warehouse.name,
                value: warehouse.uuid,
            }));
            setInitialWarehouseOptions(warehouseOptions);
            setFinalWarehouseOptions(warehouseOptions);
        }
        if (singleProductInLocationDetailsData) {
            setSingleProductDetails(singleProductInLocationDetailsData);
        }
    }, [warehouseListData, singleProductInLocationDetailsData]);

    useEffect(() => {
        if (productsSearchAutocompleteValue?.value) {
            const newValue = productsSearchAutocompleteValue?.value;
            const newProduct: any = productsByLocationData.find(
                (product: any) => product.uuid === newValue,
            );
            console.log('newProduct', newProduct);
            console.log('newValue', newValue);
            setProductsToTransfer((prevProducts) => {
                return [
                    ...prevProducts,
                    {
                        ...(newProduct as Product),
                        onHandQuantity: newProduct?.quantity,
                        transferQuantity: 0,
                        fromSubLocation: [
                            {
                                label: `${newProduct?.location?.area || ''}-${newProduct?.location?.rack || ''}-${newProduct?.location?.shelf || ''}-${newProduct?.location?.bin || ''}`,
                                value: newProduct?.location?.uuid,
                            },
                        ],
                        serialsToAdd: [],
                        serialsToRemove: [],
                        projectLocation: toSubLocations,
                    },
                ] as TransferStocksTableData[];
            });
        }
    }, [productsSearchAutocompleteValue]);

    useEffect(() => {
        if (toSubLocations) {
            productsToTransfer.forEach((product) => {
                product.projectLocation = toSubLocations;
            });
            // console.log('productsToTransfer', productsToTransfer);
            setProductsToTransfer([...productsToTransfer]);
        }
    }, [toSubLocations]);

    console.log('productsToTransfer', productsToTransfer);
    console.log('initialLocationSelect', initialLocationSelect);
    console.log('setSearchValue', productsSearchAutocompleteValue);
    return (
        <>
            <Box>
                <HeaderSection
                    onCancel={() => null}
                    onTransfer={() => {
                        setOpenAdjustItemConfirmModal(true);
                        console.log('productsToTransfer', productsToTransfer);
                    }}
                />
                <Divider />
                <DetailsSection />
                <Divider />
                <LocationSection
                    initialLocation={initialLocationSelect}
                    finalLocation={finalLocationSelect}
                    handleInitialLocationChange={handleInitialLocationSelect}
                    handleFinalLocationChange={handleFinalLocationSelect}
                    initialLocationOptions={initialWarehouseOptions}
                    finalLocationOptions={finalWarehouseOptions}
                />
                <ProductSection
                    // isLoading={isLoadingProducts}
                    products={productsByLocationData}
                    setProductsToTransfer={setProductsToTransfer}
                    setQuery={setQuery}
                    setFiedlValue={setProductsSearchAutocompleteValue}
                    fieldValue={productsSearchAutocompleteValue}
                />
                <StockAdjustmentTable
                    data={productsToTransfer}
                    setData={setProductsToTransfer}
                />
            </Box>
            <AdjustItemConfirmModal
                open={openAdjustItemConfirmModal}
                setOpen={setOpenAdjustItemConfirmModal}
                itemDescription='Adjust Absent A3 Pro, JBL Bass Boost Qty?'
                questionText='Do you want to make the changes?'
            />
        </>
    );
};

export default NewTransfer;
