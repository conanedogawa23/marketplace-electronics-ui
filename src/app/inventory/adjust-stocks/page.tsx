'use client';

import { ActivityLogType } from '@/common/status';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import AutocompleteSelectAndSearchOption from '@/components/AutocompleteSelectAndSearchOption';
import { type AutocompleteOptionType } from '@/components/AutocompleteSelectAndSearchOption/types';

import type { ActivityLog } from '@/lib/redux/products/types';

import { DataTable } from '../../../components/Table/Table';
import {
    useGetActivityLogListForAutocompleteOptionsQuery,
    useGetActivityLogListQuery,
} from '../../../lib/redux/products/updateProductSequence';

interface RowDataProps {
    id: string;
    adjustmentId: string;
    note: string;
    adjustmentDate: string;
    creator: string;
}
interface HeadCellProps {
    id: string;
    label: string;
    minWidth: number;
    maxWidth?: number;
}

// STYLES
const StyledPurpleButton = styled(Button)(() => ({
    backgroundColor: '#C255D9',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 600,
}));

const StyledWhiteButton = styled(Button)(() => ({
    backgroundColor: 'white',
    color: '#344054',
    textTransform: 'none',
    fontWeight: 600,
    border: '1px solid #D0D5DD',
    paddingX: '1.5rem',
}));

const StyledTypoGraphyHeader = styled(Typography)(() => ({
    fontWeight: '600',
    fontSize: '16px',
}));

const StocksAdjustMentPage: React.FC = () => {
    const tableRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [pageCount, setPageCount] = useState(0);
    const [adjustItemSearchQuery, setAdjustItemSearchQuery] = useState('');
    const [SelectAutocompleteValue, setSelectAutocompleteValue] =
        useState<AutocompleteOptionType>({
            label: '',
            value: '',
        });
    const previousPageCount = useRef(pageCount);
    const previousFilter = useRef(SelectAutocompleteValue?.value);
    const [adjustAutocompleteOptions, setAdjustAutocompleteOptions] = useState<
        AutocompleteOptionType[]
    >([]);

    const { data, isLoading, isError, isFetching } = useGetActivityLogListQuery(
        {
            filters: {
                type: ActivityLogType.ADJUST_STOCK,
                ...(SelectAutocompleteValue?.value && {
                    activityId: SelectAutocompleteValue.value,
                }),
            },
            after: 30,
            first: 30,
            page: pageCount,
        },
    );
    const { data: adjustItemOptionsData } =
        useGetActivityLogListForAutocompleteOptionsQuery({
            filters: {
                type: ActivityLogType.ADJUST_STOCK,
                ...(adjustItemSearchQuery && {
                    activityId: adjustItemSearchQuery,
                }),
            },
        });
    const handleFetchData = async (page: number) => {
        if (data?.hasMore) {
            setPageCount(page);
        }
    };

    const [_selected, setSelectedRows] = useState<(number | string)[]>([]);
    const [dataRows, setDataRows] = useState<RowDataProps[]>([]);

    useEffect(() => {
        if (isLoading) return;
        if (isError) return;
        if (data?.activityLogs) {
            const { activityLogs } = data;
            console.log('Activity Logs: ', data);
            const processedActivityLogs: RowDataProps[] = activityLogs?.map(
                (activityLog: ActivityLog) => {
                    const date = new Date(parseInt(activityLog.createdAt));
                    return {
                        id: activityLog.uuid,
                        adjustmentId: activityLog.activityId,
                        note: activityLog.note,
                        adjustmentDate: date?.toISOString()?.split('T')[0],
                        creator: activityLog.createdBy,
                        activityReason: activityLog?.activityReason,
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

        if (adjustItemOptionsData) {
            const activityLogs = adjustItemOptionsData.activityLogs;
            setAdjustAutocompleteOptions(
                activityLogs.map((activityLog: any) => ({
                    label: activityLog.activityId,
                    value: activityLog.activityId,
                })),
            );
        }
    }, [data, adjustItemOptionsData]);

    const rows: RowDataProps[] = dataRows;

    const headCells: HeadCellProps[] = [
        { id: 'adjustmentId', label: 'Adjustment ID', minWidth: 150 },
        { id: 'note', label: 'Note', minWidth: 300 },
        {
            id: 'adjustmentDate',
            label: 'Adjustment Date',
            minWidth: 150,
            maxWidth: 200,
        },
        { id: 'creator', label: 'Creator', minWidth: 150 },
        { id: 'activityReason', label: 'Reason', minWidth: 150 },
    ];

    return (
        <>
            {/* ADJUST STOCKS TABLE CONTENT */}
            <Box
                sx={{
                    height: '100%',
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '28px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}
                    >
                        <StyledTypoGraphyHeader>
                            Adjust Stocks
                        </StyledTypoGraphyHeader>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flex: '1',
                            justifyContent: 'flex-end',
                            gap: '1rem',
                        }}
                    >
                        <StyledPurpleButton
                            variant='contained'
                            startIcon={<AddCircleOutlineIcon />}
                            onClick={() =>
                                router.push('/inventory/adjust-stocks/new')
                            }
                        >
                            New Adjustment
                        </StyledPurpleButton>
                        <StyledWhiteButton variant='outlined'>
                            <ViewWeekOutlinedIcon
                                sx={{
                                    color: '#344054',
                                }}
                            />
                        </StyledWhiteButton>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        paddingLeft: '0rem',
                        backgroundColor: '#fff',
                        marginBottom: '28px',
                    }}
                >
                    <AutocompleteSelectAndSearchOption
                        placeholder='Search by Adjustment ID'
                        shouldRenderAddNewOption={false}
                        setSearchQuery={setAdjustItemSearchQuery}
                        setFieldValue={setSelectAutocompleteValue}
                        fieldValue={SelectAutocompleteValue}
                        width='25%'
                        autoCompleteOptions={adjustAutocompleteOptions}
                    />
                    {/* <FilterV2 /> */}
                </Box>

                <DataTable
                    isSelect={true}
                    rows={rows}
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
                    tableRef={tableRef}
                />
            </Box>
        </>
    );
};
export default StocksAdjustMentPage;
