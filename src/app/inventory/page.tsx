'use client';

import { Box, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import AutocompleteSelectAndSearchOption from '@/components/AutocompleteSelectAndSearchOption';

import { withAuth } from '@/lib/redux/auth/withAuth';
import {
    useGetInventoryAutocompleteListQuery,
    useGetInventoryListNewQuery,
} from '@/lib/redux/inventory';

import { DataTable } from '../../components/Table/Table';
import { EndSlot } from './components/EndSlot';

interface StocksRowDataProps {
    id: string;
    uuid: string;
    name: string;
    description: string;
    price: {
        msrp: string;
        mapp: string;
        cost: string;
        sell: string;
        shippingCost: string;
        shippingSell: string;
    };
    quantity: number;
    category: { name: string | null };
    manufacturer: { name: string | null };
    // uom: string;
    // vendors: { name: string | null }[];
    // attachments: string | null;
    // width: number;
    // height: number;
    // weight: number;
    tags: JSX.Element;
    // status: string;
    sku: string;
}
interface OptionType {
    label: string;
    value: string;
}

interface StocksColumnDataProps {
    id: string;
    label: string;
    minWidth: number;
    maxWidth?: number;
}

const HomePage: React.FC = () => {
    const userData = useSelector((state: any) => state.userApi);
    const router = useRouter();
    const tableRef = useRef<HTMLDivElement>(null);
    const [pageCount, setPageCount] = useState(0);
    const [
        selectInventoryAutocompleteValue,
        setSelectInventoryAutocompleteValue,
    ] = useState<OptionType>({
        label: '',
        value: '',
    });
    const [inventoryAutocompleteOptions, setInventoryAutocompleteOptions] =
        useState<OptionType[]>([]);
    const [inventorySearchQuery, setInventorySearchQuery] =
        useState<string>('');
    const previousFilter = useRef(selectInventoryAutocompleteValue?.value);
    const previousPageCount = useRef(pageCount);
    const [rows, setRows] = useState<StocksRowDataProps[]>([]);
    const [selected, setSelectedRows] = React.useState<(number | string)[]>([]);

    // DATA FETCHING
    const { data: inventoryAutocompleteOptionsData } =
        useGetInventoryAutocompleteListQuery(
            inventorySearchQuery
                ? {
                      filters: { name: inventorySearchQuery },
                  }
                : {},
        );
    console.log(
        'inventoryAutocompleteOptionsData',
        inventoryAutocompleteOptionsData,
    );
    const {
        data: inventornyListData,
        isFetching: inventoryListIsFetching,
        isError,
    } = useGetInventoryListNewQuery({
        page: pageCount,
        ...(selectInventoryAutocompleteValue?.value
            ? { filters: { name: selectInventoryAutocompleteValue.value } }
            : {}),
    });

    const onClick = async (row: any) => {
        const rowUuid = row.uuid;
        router.push(`/inventory/item/${rowUuid}/details`);
    };
    const stockHeacCells: StocksColumnDataProps[] = [
        { id: 'name', label: 'Name', minWidth: 200 },
        { id: 'description', label: 'Description', minWidth: 200 },
        { id: 'price', label: 'Price', minWidth: 100 },
        { id: 'quantity', label: 'Quantity', minWidth: 100 },
        { id: 'category', label: 'Category', minWidth: 100 },
        { id: 'manufacturer', label: 'Manufacturer', minWidth: 200 },
        // { id: 'uow', label: 'UOW', minWidth: 100 },
        // { id: 'vendors', label: 'Vendors', minWidth: 200 },
        // { id: 'width', label: 'Width', minWidth: 100 },
        // { id: 'height', label: 'Height', minWidth: 100 },
        // { id: 'weight', label: 'Weight', minWidth: 100 },
        { id: 'tags', label: 'Tags', minWidth: 200 },
        // { id: 'status', label: 'Status', minWidth: 100 },
        { id: 'sku', label: 'SKU', minWidth: 200 },
    ];
    const handleFetchData = async (page: number) => {
        if (inventornyListData?.hasMore) {
            console.log('Page number', page);
            setPageCount(page);
        }
    };
    useEffect(() => {
        if (inventornyListData?.products) {
            const products = inventornyListData.products;
            const mappedRowData: StocksRowDataProps[] = products.map(
                (item: any) => ({
                    id: item._id,
                    uuid: item.uuid,
                    name: item.name,
                    description: item.description,
                    price: item.price.sell,
                    quantity: item.quantity,
                    category: item.category?.name,
                    manufacturer: item.manufacturer?.name,
                    tags: (
                        <>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '3px',
                                }}
                            >
                                {item.tags?.map(
                                    (tag: string, index: number) => (
                                        <Chip
                                            key={index}
                                            label={tag}
                                            color='success'
                                            size='small'
                                        />
                                    ),
                                )}
                            </Box>
                        </>
                    ),
                    sku: item.sku,
                }),
            );
            if (
                pageCount === 0 ||
                selectInventoryAutocompleteValue?.value !==
                    previousFilter.current
            ) {
                setRows(mappedRowData);
                previousFilter.current =
                    selectInventoryAutocompleteValue?.value;
                setPageCount(0);
            } else {
                setRows((prevRows) => [...prevRows, ...mappedRowData]);
            }
            previousPageCount.current = pageCount;
        }
        if (inventoryAutocompleteOptionsData?.products) {
            const products = inventoryAutocompleteOptionsData.products;
            const mappedAutocompleteData: OptionType[] = products.map(
                (product: any) => ({
                    label: product.name,
                    value: product.name,
                }),
            );
            setInventoryAutocompleteOptions(mappedAutocompleteData);
        }
    }, [inventornyListData, inventoryAutocompleteOptionsData]);
    console.log('inventoryAutocompleteOptions', inventoryAutocompleteOptions);
    return (
        <Box
            component='main'
            sx={{ flexGrow: 1, padding: 3, overflow: 'hidden' }}
        >
            <Typography variant='h6' gutterBottom>
                Inventory Management
            </Typography>
            <Box
                sx={{
                    width: '100%',
                    mb: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <AutocompleteSelectAndSearchOption
                    placeholder='Search Items'
                    width='25%'
                    shouldRenderAddNewOption={false}
                    autoCompleteOptions={inventoryAutocompleteOptions}
                    setSearchQuery={setInventorySearchQuery}
                    setFieldValue={setSelectInventoryAutocompleteValue}
                    fieldValue={selectInventoryAutocompleteValue}
                />
                <EndSlot />
            </Box>
            <Box>
                <DataTable
                    isSelect={true}
                    rows={rows}
                    headCells={stockHeacCells}
                    setSelectedRows={setSelectedRows}
                    singleRowSelect={false}
                    isLoading={inventoryListIsFetching}
                    isError={isError}
                    handleFetchData={handleFetchData}
                    uniqueKey='uuid'
                    tableHeight='85vh'
                    errorElement={<div>Error</div>}
                    noDataElement={<div>No Data</div>}
                    isMoreData={inventornyListData?.hasMore}
                    navigateOnRowClick={false}
                    onClick={onClick}
                    tableRef={tableRef}
                />
            </Box>
        </Box>
    );
};

export default withAuth(HomePage);
