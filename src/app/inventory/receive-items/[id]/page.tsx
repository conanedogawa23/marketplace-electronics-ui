'use client';

import { ActivityLogType } from '@/common/status';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';

import { useGetProductListQuery } from '@/lib/redux/products/getProducts';
import type { UpdateSequenceInput } from '@/lib/redux/products/types';
import { useUpdateProductSequenceMutation } from '@/lib/redux/products/updateProductSequence';

import ConfirmationModal from './components/confirmation-modal';
import Details from './components/details';
import Filters from './components/filters';
import Header from './components/header';
import Table from './components/table';
import { type ReceiveItemTableDataType } from './components/table/types';

const ReceiveItemDynamicPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productIds = searchParams.get('productIds');

    const [receivingOrderId, setReceiveOrderId] = useState('');
    const [note, setNote] = useState('');

    const [selectedWarehouse, setSelectedWarehouse] = useState('none');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    const [errors, setErrors] = useState<
        Record<string, Partial<Record<keyof ReceiveItemTableDataType, string>>>
    >({});

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

    const [productsToAdjust, setProductsToAdjust] = useState<
        ReceiveItemTableDataType[]
    >([]);

    const [updateProductSequence, { isLoading: isUpdatingProductSequence }] =
        useUpdateProductSequenceMutation();

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
        const payload = productsToAdjust.map((adjustedProducts) => {
            // quantity can be zero or negative

            return {
                deleteSerialNumbers: false,
                fromLocation: '',
                quantity: adjustedProducts.toReceive,
                serialNumbers: adjustedProducts.serialsToAdd,
                toLocation: adjustedProducts.subLocation,
                uuid: adjustedProducts.uuid,
                serialized: !!adjustedProducts.serialized,
            };
        });

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
        <Box component='main' flexGrow={1} overflow='scroll'>
            <Header
                isSubmitting={isUpdatingProductSequence}
                onCancel={() => {
                    router.push('/inventory/receive-items');
                }}
                onSubmit={() => {
                    if (validatePayload()) {
                        setShowConfirmationModal(true);
                    } else {
                        toast.error(
                            `Please fill all the required fields and don't forget to click save button`,
                        );
                    }
                }}
            />

            <Divider />

            <Details
                note={note}
                setNote={setNote}
                receivingOrderId={receivingOrderId}
                setReceivingOrderId={setReceiveOrderId}
                productsData={productsToAdjust}
            />

            <Divider />

            <Filters
                selectedWarehouse={selectedWarehouse}
                setSelectedWarehouse={setSelectedWarehouse}
            />

            {selectedWarehouse !== 'none' ? (
                <Table
                    data={productsToAdjust}
                    setData={setProductsToAdjust}
                    selectedWarehouse={selectedWarehouse}
                    errors={errors}
                />
            ) : null}

            <ConfirmationModal
                firstProductName={productsToAdjust[0]?.name}
                open={showConfirmationModal}
                count={productsToAdjust.length}
                handleConfirm={onSubmit}
                handleClose={() => {
                    setShowConfirmationModal(false);
                }}
            />
        </Box>
    );
};

export default ReceiveItemDynamicPage;
