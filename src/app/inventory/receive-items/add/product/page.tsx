'use client';

import { ActivityLogType } from '@/common/status';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { Box, Divider, Stack } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';

import { StyledPurpleOutlinedButton } from '@/app/inventory/adjust-stocks/components/styles';
import Details from '@/app/inventory/receive-items/[id]/components/details';
import Filters from '@/app/inventory/receive-items/[id]/components/filters';
import Header from '@/app/inventory/receive-items/[id]/components/header';
import {
    type PrintQrProduct,
    type ReceiveItemTableDataType,
} from '@/app/inventory/receive-items/[id]/components/table/types';

import { useGetProductListQuery } from '@/lib/redux/products/getProducts';
import { type UpdateSequenceInput } from '@/lib/redux/products/types';
import { useUpdateProductSequenceMutation } from '@/lib/redux/products/updateProductSequence';

import ConfirmationModal from '../../[id]/components/confirmation-modal';
import Table from '../../[id]/components/table';
import ProductSearchBar from './components/product-search-bar';

const ReceiveProductPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productIds = searchParams.get('productIds');

    const [selectedWarehouse, setSelectedWarehouse] = useState('none');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const [receivingOrderId, setReceiveOrderId] = useState('');
    const [note, setNote] = useState('');

    const [errors, setErrors] = useState<
        Record<string, Partial<Record<keyof ReceiveItemTableDataType, string>>>
    >({});

    const [productsToAdjust, setProductsToAdjust] = useState<
        ReceiveItemTableDataType[]
    >([]);
    const [printQrModalData, setPrintQrModalData] = useState<PrintQrProduct[]>(
        [],
    );

    const { data } = useGetProductListQuery(
        {
            filters: {
                uuid: productIds ?? '',
            },
        },
        {
            skip: !productIds,
        },
    );

    useEffect(() => {
        if (data) {
            const products = data.map((product) => {
                return {
                    ...product,
                    ordered: 0,
                    received: 0,
                    toReceive: 0,
                    subLocation: '',
                    serialized: !!product.serialized,
                    serialsToAdd: [],
                    serialsToRemove: [],
                };
            });

            setProductsToAdjust(products);
        }
    }, [data]);
    console.log('productsToAdjust', productsToAdjust);
    useEffect(() => {
        if (productsToAdjust) {
            const mappedPrintQrProducts: PrintQrProduct[] =
                productsToAdjust.map((product: any) => {
                    return {
                        name: product.name || '',
                        sku: product.sku || '',
                        uuid: product.uuid,
                        serialized: product.serialized,
                        serializedProducts: product.serialsToAdd || [],
                    };
                });
            setPrintQrModalData(mappedPrintQrProducts);
        }
    }, [productsToAdjust]);

    const [updateProductSequence, { isLoading: isUpdatingProductSequence }] =
        useUpdateProductSequenceMutation();

    function validatePayload() {
        const allErrors: Record<
            string,
            Partial<Record<keyof ReceiveItemTableDataType, string>>
        > = {};

        for (const product of productsToAdjust) {
            const productErrors: Partial<
                Record<keyof ReceiveItemTableDataType, string>
            > = {};

            // Validation for subLocation
            if (!product.subLocation) {
                productErrors.subLocation = 'Location is required';
            }

            // Validation for toReceive
            if (product.toReceive <= 0) {
                productErrors.toReceive = 'Quantity must be greater than zero';
            }

            // Validation for serialsToAdd
            if (product.serialized && product.toReceive > 0) {
                if (product.serialsToAdd.length !== product.toReceive) {
                    productErrors.serialsToAdd =
                        'Serials are required for each item';
                } else {
                    const uniqueSerials = new Set(product.serialsToAdd);
                    if (uniqueSerials.size !== product.toReceive) {
                        productErrors.serialsToAdd = 'Serials must be unique';
                    } else if (
                        product.serialsToAdd.some((serial) => !serial.trim())
                    ) {
                        productErrors.serialsToAdd = 'Serials cannot be empty';
                    }
                }
            }

            if (Object.keys(productErrors).length > 0) {
                allErrors[product.uuid] = productErrors;
            }
        }

        // Set errors state
        setErrors(allErrors);

        // Determine overall validation status
        return Object.keys(allErrors).length === 0;
    }

    const onSubmit = async () => {
        const payload = productsToAdjust.map((adjustedProducts) => ({
            deleteSerialNumbers: false,
            fromLocation: '',
            quantity: adjustedProducts.toReceive,
            serialNumbers: adjustedProducts.serialsToAdd,
            toLocation: adjustedProducts.subLocation,
            uuid: adjustedProducts.uuid,
            serialized: !!adjustedProducts.serialized,
        }));

        try {
            const requestPayload: UpdateSequenceInput = {
                activityId: receivingOrderId || `REC-${v4().split('-')[0]}`,
                note,
                products: payload,
                type: ActivityLogType.RECEIVE_STOCK,
                warehouse: selectedWarehouse,
            };
            const response =
                await updateProductSequence(requestPayload).unwrap();
            console.log('fulfilled', response);
            toast.success('Product sequence updated successfully');
            router.push('/inventory/receive-items');
        } catch (error) {
            console.error('rejected', error);
            toast.error('Failed to update product sequence');
        } finally {
            setShowConfirmationModal(false);
        }
    };

    return (
        <Box component='main' flexGrow={1} overflow='auto'>
            <Header
                isSubmitting={false}
                onCancel={() => {
                    router.push('/inventory/receive-items');
                }}
                onSubmit={() => {
                    if (validatePayload()) {
                        setShowConfirmationModal(true);
                    } else {
                        toast.error('Please fill all the required fields');
                    }
                }}
            />

            <Divider />

            <Details
                note={note}
                setNote={setNote}
                receivingOrderId={receivingOrderId}
                setReceivingOrderId={setReceiveOrderId}
                productsData={printQrModalData}
            />

            <Divider />

            <Filters
                selectedWarehouse={selectedWarehouse}
                setSelectedWarehouse={setSelectedWarehouse}
            />
            {selectedWarehouse !== 'none' ? (
                <>
                    <Stack
                        width={'100%'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Stack width={'80%'} direction={'row'} gap={2}>
                            <ProductSearchBar
                                setProductsToReceive={setProductsToAdjust}
                            />

                            <StyledPurpleOutlinedButton
                                startIcon={
                                    <QrCodeScannerIcon
                                        sx={{ color: '#AB41C2' }}
                                    />
                                }
                            >
                                Scan
                            </StyledPurpleOutlinedButton>
                        </Stack>
                    </Stack>

                    <Table
                        errors={errors}
                        data={productsToAdjust}
                        setData={setProductsToAdjust}
                        selectedWarehouse={selectedWarehouse}
                    />
                </>
            ) : null}

            <ConfirmationModal
                open={showConfirmationModal}
                count={productsToAdjust.length}
                handleConfirm={onSubmit}
                firstProductName={productsToAdjust[0]?.name}
                handleClose={() => {
                    setShowConfirmationModal(false);
                }}
            />
        </Box>
    );
};

export default ReceiveProductPage;
