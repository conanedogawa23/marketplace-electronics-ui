'use client';

import { ActivityLogType } from '@/common/status';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import { ButtonGroup } from '@mui/material';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import type { ActivityLog } from '@/lib/redux/products/types';

import Autocomplete from '../../../components/AutocompleteNew';
import StocksFilter from '../../../components/FilterV2/Filter';
import { DataTable } from '../../../components/Table/Table';
import { useGetActivityLogListQuery } from '../../../lib/redux/products/updateProductSequence';
import {
    StyledButton,
    StyledPurpleButton,
    StyledTypoGraphyHeader,
    StyledWhiteButton,
} from './components/styles';

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

const StocksTransferNavButtons = [
    <StyledButton key='two'>All</StyledButton>,
    <StyledButton key='three'>Assigned to you</StyledButton>,
];

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
];

const StocksAdjustMentPage: React.FC = () => {
    const router = useRouter();
    const tableRef = useRef<HTMLDivElement>(null);
    const [pageCount, setPageCount] = useState(0);
    const { data, isLoading, isError } = useGetActivityLogListQuery({
        filters: {
            type: ActivityLogType.TRANSFER_STOCK,
        },
        after: 30,
        first: 30,
        page: pageCount,
    });
    const [selectedFilter, setSelectedFilter] = useState<any>('activityId');

    const filterGroups = [
        {
            groupName: 'ID',
            groupValue: 'activityId',
            options: [],
        },
        {
            groupName: 'Note',
            groupValue: 'note',
            options: [],
        },
        {
            groupName: 'Received At',
            groupValue: 'updatedAt',
            options: [],
        },
        {
            groupName: 'Creator',
            groupValue: 'updatedBy',
            options: [],
        },
]

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
            const processedActivityLogs: RowDataProps[] = activityLogs?.map(
                (activityLog: ActivityLog) => {
                    const date = new Date(parseInt(activityLog.createdAt));
                    return {
                        id: activityLog.uuid,
                        adjustmentId: activityLog.activityId,
                        note: activityLog.note,
                        adjustmentDate: date?.toISOString()?.split('T')[0],
                        creator: activityLog.createdBy,
                    };
                },
            );
            setDataRows(processedActivityLogs);
        }
    }, [isLoading, isError]);

    const rows: RowDataProps[] = dataRows;

    return (
        <>
            {/* ADJUST STOCKS TABLE CONTENT */}
            <Box
                sx={{
                    position: 'relative',
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
                            Stock Transfer
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
                            onClick={() => {
                                router.push(
                                    '/inventory/transfer-stocks/new-transfer',
                                );
                            }}
                        >
                            New Transfer
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
                    <Autocomplete
                        width='25%'
                        options={['Option 1', 'Option 2', 'Option 3']}
                    />
                    <StocksFilter 
                        isGlobalSearchEnabled={false} 
                        isExpandable={false}
                        filterGroups={filterGroups}
                        handleSelectedFilter={setSelectedFilter}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            border: '1px solid #E0E0E0',
                            borderRadius: '8px',
                        }}
                    >
                        <ButtonGroup aria-label='Medium-sized button group'>
                            {StocksTransferNavButtons}
                        </ButtonGroup>
                    </Box>
                </Box>

                <DataTable
                    isSelect={true}
                    rows={rows}
                    headCells={headCells}
                    setSelectedRows={setSelectedRows}
                    singleRowSelect={false}
                    isLoading={false}
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
