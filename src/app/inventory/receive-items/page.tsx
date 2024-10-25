'use client';

import { ActivityLogType } from '@/common/status';
import { AddCircleOutline, ViewWeekOutlined } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import AutocompleteSelectAndSearchOption from '@/components/AutocompleteSelectAndSearchOption';
import { type AutocompleteOptionType } from '@/components/AutocompleteSelectAndSearchOption/types';
import { DataTable } from '@/components/Table/Table';

import type { ActivityLog } from '@/lib/redux/products/types';
import {
    useGetActivityLogListForAutocompleteOptionsQuery,
    useGetActivityLogListQuery,
} from '@/lib/redux/products/updateProductSequence';

import FilterV3 from '../../../components/FilterV3/index';

const headCells: HeadCellProps[] = [
    { id: 'id', label: 'ID', minWidth: 150 },
    { id: 'note', label: 'Note', minWidth: 400 },
    { id: 'receivedAt', label: 'Receive At', minWidth: 100, maxWidth: 200 },
    // { id: 'date', label: 'Date', minWidth: 150 },
    { id: 'creator', label: 'Creator', minWidth: 150 },
];

interface ReceiveItemLog {
    id: string;
    note: string;
    receivedAt: string; // location
    // date: string; // date or timestamp
    creator: string; // user
}

interface HeadCellProps {
    id: string;
    label: string;
    minWidth: number;
    maxWidth?: number;
}

const ReceiveItemsPage = () => {
    // const rows = RECEIVE_LOG_DATA;
    const [selectedFilter, setSelectedFilter] = useState<any>('activityId');
    const [pageCount, setPageCount] = useState(0);
    const [receiveItemSearchQuery, setReceiveItemSearchQuery] = useState('');
    const [SelectAutocompleteValue, setSelectAutocompleteValue] =
        useState<AutocompleteOptionType>({
            label: '',
            value: '',
        });
    const [receiveAutocompleteOptions, setReceiveAutocompleteOptions] =
        useState<AutocompleteOptionType[]>([]);
    const previousPageCount = useRef(pageCount);
    const previousFilter = useRef(SelectAutocompleteValue?.value);
    const { data, isLoading, isError, isFetching } = useGetActivityLogListQuery(
        {
            filters: {
                type: ActivityLogType.RECEIVE_STOCK,
                ...(SelectAutocompleteValue?.value && {
                    [selectedFilter]: SelectAutocompleteValue.value,
                }),
            },
            after: 30,
            first: 30,
            page: pageCount,
        },
    );
    const { data: receiveItemOptionsData } =
        useGetActivityLogListForAutocompleteOptionsQuery({
            filters: {
                type: ActivityLogType.RECEIVE_STOCK,
                ...(receiveItemSearchQuery && {
                    [selectedFilter]: receiveItemSearchQuery,
                }),
            },
        });
    console.log('receiveItemOptions', receiveItemOptionsData);
    const handleFetchData = async (page: number) => {
        if (data?.hasMore) {
            setPageCount(page);
        }
    };

    const [dataRows, setDataRows] = useState<ReceiveItemLog[]>([]);

    const router = useRouter();

    const [_selected, setSelectedRows] = useState<(number | string)[]>([]);

    // const filterGroups = [
    //     {
    //         groupName: 'ID',
    //         groupValue: 'activityId',
    //         options: [],
    //     },
    //     {
    //         groupName: 'Note',
    //         groupValue: 'note',
    //         options: [],
    //     },
    //     {
    //         groupName: 'Received At',
    //         groupValue: 'updatedAt',
    //         options: [],
    //     },
    //     {
    //         groupName: 'Creator',
    //         groupValue: 'updatedBy',
    //         options: [],
    //     },
    // ];

    useEffect(() => {
        if (isLoading) return;
        if (isError) return;
        if (data?.activityLogs) {
            const { activityLogs } = data;
            const processedActivityLogs: ReceiveItemLog[] = activityLogs?.map(
                (activityLog: ActivityLog) => {
                    const date = new Date(parseInt(activityLog.createdAt));
                    return {
                        id: activityLog.activityId,
                        adjustmentId: activityLog.activityId,
                        note: activityLog.note,
                        // date: date?.toISOString()?.split('T')[0],
                        receivedAt: date?.toISOString()?.split('T')[0],
                        creator: activityLog.createdBy,
                    };
                },
            );
            if (
                pageCount === 0 ||
                SelectAutocompleteValue?.value !== previousFilter.current
            ) {
                setDataRows(processedActivityLogs);
                previousFilter.current = SelectAutocompleteValue?.value;
            } else {
                setDataRows((prevRows) => [
                    ...prevRows,
                    ...processedActivityLogs,
                ]);
            }
            previousPageCount.current = pageCount;
        }
        if (receiveItemOptionsData) {
            const activityLogs = receiveItemOptionsData.activityLogs;
            console.log('activityLogs', activityLogs);
            setReceiveAutocompleteOptions(
                activityLogs.map((activityLog: any) => ({
                    label: activityLog[selectedFilter],
                    value: activityLog[selectedFilter],
                })),
            );
        }
    }, [data, receiveItemOptionsData, selectedFilter]);

    console.log('selectedFilter', selectedFilter);

    return (
        <Box p={8} component='main' sx={{ flexGrow: 1, overflow: 'hidden' }}>
            {/* Header */}
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Stack direction={'row'} alignItems={'center'} gap={2}>
                    <Typography
                        component={'h1'}
                        fontWeight={'600'}
                        fontSize={16}
                    >
                        Receive Items
                    </Typography>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} gap={3}>
                    <Button
                        size='small'
                        color='secondary'
                        variant='contained'
                        startIcon={<AddCircleOutline />}
                        sx={{
                            color: 'white',
                            fontWeight: 600,
                            textTransform: 'none',
                        }}
                        onClick={() =>
                            router.push('/inventory/receive-items/add')
                        }
                    >
                        Receive Item
                    </Button>
                    <Button
                        size='small'
                        variant='outlined'
                        color='inherit'
                        sx={(theme) => ({
                            // padding: 0,
                            minWidth: 0,
                            borderColor:
                                theme.customColors?.border.primary.light,
                        })}
                    >
                        <ViewWeekOutlined />
                    </Button>
                </Stack>
            </Stack>

            {/* Search */}
            {/* TODO: replace with Autocomplete */}
            <Stack direction={'row'} mt={8} gap={2}>
                <AutocompleteSelectAndSearchOption
                    placeholder='Search by Activity ID'
                    shouldRenderAddNewOption={false}
                    setSearchQuery={setReceiveItemSearchQuery}
                    setFieldValue={setSelectAutocompleteValue}
                    fieldValue={SelectAutocompleteValue}
                    width='25%'
                    autoCompleteOptions={receiveAutocompleteOptions}
                />
                {/* <StocksFilter /> */}
                <Stack direction={'row'}>
                    {/* <StocksFilter
                        isGlobalSearchEnabled={false}
                        isExpandable={false}
                        filterGroups={filterGroups}
                        handleSelectedFilter={setSelectedFilter}
                    /> */}
                    <FilterV3 />
                </Stack>
            </Stack>

            {/* Table */}
            <Box mt={8}>
                <DataTable
                    isSelect={true}
                    rows={dataRows}
                    headCells={headCells}
                    setSelectedRows={setSelectedRows}
                    singleRowSelect={false}
                    isLoading={isFetching}
                    isError={false}
                    handleFetchData={handleFetchData}
                    uniqueKey='id'
                    tableHeight='80vh'
                    errorElement={<div>Error</div>}
                    noDataElement={<div>No Data element</div>}
                    isMoreData={true}
                    navigateOnRowClick={false}
                />
            </Box>
        </Box>
    );
};

export default ReceiveItemsPage;
