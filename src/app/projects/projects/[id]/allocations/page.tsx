'use client';

import { ActivityLogType } from '@/common/status';
// import { AddCircleOutline, ViewWeekOutlined } from '@mui/icons-material';
import {
    Box,
    Button,
    ButtonGroup,
    Stack,
    styled,
    Typography,
} from '@mui/material';
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

const headCells: HeadCellProps[] = [
    { id: 'id', label: 'ID', minWidth: 150 },
    { id: 'note', label: 'Note', minWidth: 200 },
    { id: 'date', label: 'Date', minWidth: 100, maxWidth: 200 },
    { id: 'creator', label: 'Creator', minWidth: 150 },
];

interface AllocationLog {
    id: string;
    allocationId: string;
    note: string;
    date: string;
    creator: string;
}

interface HeadCellProps {
    id: string;
    label: string;
    minWidth: number;
    maxWidth?: number;
}
const StyledButton = styled(Button)(({ theme }) => ({
    fontWeight: 600,
    border: '1px solid #D0D5DD',
    fontSize: '14px',
    textTransform: 'none',
    height: '35px',
}));

const AllocationDetailsPage = () => {
    const [pageCount, setPageCount] = useState(0);
    const [allocationsSearchQuery, setAllocationsSearchQuery] = useState('');
    const [SelectAutocompleteValue, setSelectAutocompleteValue] =
        useState<AutocompleteOptionType>({
            label: '',
            value: '',
        });
    const [receiveAutocompleteOptions, setReceiveAutocompleteOptions] =
        useState<AutocompleteOptionType[]>([]);
    const previousPageCount = useRef(pageCount);
    const previousFilter = useRef(SelectAutocompleteValue?.value);
    const [activeButton, setActiveButton] = useState<
        'ALLOCATE_STOCK' | 'DEALLOCATE_STOCK'
    >('ALLOCATE_STOCK');
    const { data, isLoading, isError, isFetching } = useGetActivityLogListQuery(
        {
            filters: {
                type: ActivityLogType[activeButton],
                ...(SelectAutocompleteValue?.value && {
                    activityId: SelectAutocompleteValue.value,
                }),
            },
            after: 30,
            first: 30,
            page: pageCount,
        },
    );
    console.log('data', data);
    const { data: receiveItemOptionsData } =
        useGetActivityLogListForAutocompleteOptionsQuery({
            filters: {
                type: ActivityLogType[activeButton],
                ...(allocationsSearchQuery && {
                    activityId: allocationsSearchQuery,
                }),
            },
        });
    console.log('receiveItemOptions', receiveItemOptionsData);
    const handleFetchData = async (page: number) => {
        if (data?.hasMore) {
            setPageCount(page);
        }
    };

    const [dataRows, setDataRows] = useState<AllocationLog[]>([]);

    const router = useRouter();

    const [_selected, setSelectedRows] = useState<(number | string)[]>([]);

    const handleChooseAllocateOrDeallocate = (
        type: 'ALLOCATE_STOCK' | 'DEALLOCATE_STOCK',
    ) => {
        setActiveButton(type);
        setPageCount(0);
        setSelectAutocompleteValue({ label: '', value: '' });
        setDataRows([]);
    };

    useEffect(() => {
        if (isLoading) return;
        if (isError) return;
        if (data?.activityLogs) {
            const { activityLogs } = data;
            const processedActivityLogs: AllocationLog[] = activityLogs?.map(
                (activityLog: ActivityLog) => {
                    const date = new Date(parseInt(activityLog.createdAt));
                    return {
                        id: activityLog.activityId,
                        allocationId: activityLog.activityId,
                        note: activityLog.note,
                        date: date?.toISOString()?.split('T')[0],
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
            setReceiveAutocompleteOptions(
                activityLogs.map((activityLog: any) => ({
                    label: activityLog.activityId,
                    value: activityLog.activityId,
                })),
            );
        }
    }, [data, receiveItemOptionsData]);

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
                        Allocations Logs
                    </Typography>
                </Stack>
            </Stack>

            {/* Search */}
            {/* TODO: replace with Autocomplete */}
            <Stack direction={'row'} mt={8} gap={2}>
                <AutocompleteSelectAndSearchOption
                    placeholder='Search by Activity ID'
                    shouldRenderAddNewOption={false}
                    setSearchQuery={setAllocationsSearchQuery}
                    setFieldValue={setSelectAutocompleteValue}
                    fieldValue={SelectAutocompleteValue}
                    width='25%'
                    autoCompleteOptions={receiveAutocompleteOptions}
                />
                {/* <StocksFilter /> */}
                {/* buttons */}
                <ButtonGroup aria-label='Medium-sized button group'>
                    <StyledButton
                        variant='contained'
                        sx={{
                            backgroundColor:
                                activeButton === 'ALLOCATE_STOCK'
                                    ? '#C255D9'
                                    : 'transparent',
                            color:
                                activeButton === 'ALLOCATE_STOCK'
                                    ? 'white'
                                    : '#000',
                            border:
                                activeButton === 'ALLOCATE_STOCK'
                                    ? 'none'
                                    : 'initial',
                        }}
                        onClick={() =>
                            handleChooseAllocateOrDeallocate('ALLOCATE_STOCK')
                        }
                    >
                        Allocations
                    </StyledButton>
                    <StyledButton
                        variant='contained'
                        sx={{
                            backgroundColor:
                                activeButton === 'DEALLOCATE_STOCK'
                                    ? '#C255D9'
                                    : 'transparent',
                            color:
                                activeButton === 'DEALLOCATE_STOCK'
                                    ? 'white'
                                    : '#000',
                            border:
                                activeButton === 'DEALLOCATE_STOCK'
                                    ? 'none'
                                    : 'initial',
                        }}
                        onClick={() =>
                            handleChooseAllocateOrDeallocate('DEALLOCATE_STOCK')
                        }
                    >
                        Deallocations
                    </StyledButton>
                </ButtonGroup>
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

export default AllocationDetailsPage;
