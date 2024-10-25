'use client';

import {
    Box,
    Button,
    Container,
    Divider,
    TextField,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useRef, useState } from 'react';

import DataTable from '@/components/Table/Table';

import { useParams } from 'next/navigation';

import { useGetActivityLogDetailsQuery } from "../../../../../../../lib/redux/activity/getActivity";

const StyledNavbarBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
}));
const StyledWhiteButton100px = styled(Button)(() => ({
    backgroundColor: 'white',
    color: '#344054',
    textTransform: 'none',
    borderRadius: '8px',
    fontWeight: 600,
    border: '1px solid #D0D5DD',
    width: '100px',
    padding: '5px',
    opacity: 0.8,
}));
const StyledPurpleButton100px = styled(Button)(() => ({
    backgroundColor: '#C255D9',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 600,
    width: '150px',
    borderRadius: '8px',
    padding: '6px',
}));
const StyledTypoGraphyHeader = styled(Typography)(() => ({
    fontWeight: '600',
    fontSize: '16px',
}));
const StyledTypography = styled(Typography)(() => ({
    fontWeight: '500',
    color: '#344054',
    marginBottom: '4px',
}));
const StyledTextField = styled(TextField)(() => ({
    '& .MuiOutlinedInput-root': {
        padding: '0px',
        borderRadius: '8px',
    },
    '& .MuiInputBase-input': {
        padding: '8px 10px',
        borderRadius: '8px',
    },
}));
const StyledTableTopBox = styled(Box)(() => ({
    borderTop: '1px solid #D0D5DD',
    borderRight: '1px solid #D0D5DD',
    borderLeft: '1px solid #D0D5DD',
    padding: '20px',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
}));
const StyledTableBottomBox = styled(Box)(() => ({
    borderBottom: '1px solid #D0D5DD',
    borderRight: '1px solid #D0D5DD',
    borderLeft: '1px solid #D0D5DD',
    padding: '20px',
    borderBottomLeftRadius: '8px',
    borderBottomRightRadius: '8px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
}));
interface RowDataProps {
    id: string;
    item: string;
    source: string;
    projectQty: number;
    allocated: number;
    qtyNeeded: number;
    available: number;
    toOrder: number;
}

interface HeadCellsProps {
    id: string;
    label: string;
    minWidth: number;
    maxWidth?: number;
}
const AllocateIdPage: React.FC = () => {
    const tableRef = useRef<HTMLDivElement>(null);
    const [selected, setSelectedRows] = useState<(number | string)[]>([]);
    const handleFetchData = async (page: number) => {
        console.log('fetching data', page);
    };

    const [activityLogsTableData, setActivityLogsTableData] = useState<RowDataProps[]>([]);

    const params = useParams();

    const [activityUuid, setActivityUuid] = useState<string>('');
    const [activityId, setActivityId] = useState<string>('');

    useEffect(() => {
        if (params.slug) {
            setActivityUuid(params.slug as string);
        }
    }, [params.slug]);

    const { data: activityLogData, isLoading: isActivityLogDataLoading } = useGetActivityLogDetailsQuery(
        { uuid: activityUuid },
        { skip: activityUuid === '' }
    )
    
    
    const headcells: HeadCellsProps[] = [
        { id: 'item', label: 'Item', minWidth: 200 },
        { id: 'source', label: 'Source', minWidth: 100 },
        { id: 'projectQty', label: 'Project Qty', minWidth: 100 },
        { id: 'allocated', label: 'Allocated', minWidth: 100 },
        { id: 'qtyNeeded', label: 'Qty Needed', minWidth: 100 },
        { id: 'available', label: 'Available', minWidth: 100 },
        { id: 'toOrder', label: 'To Order', minWidth: 100 },
    ];
    
    useEffect(() => {
        if (activityLogData) {
            console.log(activityLogData);
            setActivityId(activityLogData.activityId);
            // activityLogData is an object
            const mappedData: RowDataProps[] = activityLogData.track.map((track) => {
                // use loadash to find the product id from the activityLogData.products array
                const product = activityLogData.products.find((product) => product.uuid === track.product);
                const project = activityLogData.projectProducts.find((product) => product.product.uuid  === track.product);

                const quantityNeeded = project?.quantity && project?.allocated ? project?.quantity - project?.allocated : 0;
                const available = product?.quantity && product?.onUsed ? product?.quantity - product?.onUsed : 0;

                return {
                    id: track.product,
                    item: product?.name || '',
                    source: '',
                    projectQty: project?.quantity || 0,
                    allocated: project?.allocated || 0,
                    qtyNeeded: quantityNeeded,
                    available: available,
                    toOrder: available > quantityNeeded ? 0 : quantityNeeded - available,
                };
            })

            console.log(mappedData);
            setActivityLogsTableData(mappedData);
            
        }
    }, [activityLogData])

    return (
        <Box sx={{ p: 3, width: '100%', height: '100vh', overflow: 'scroll' }}>
            <StyledNavbarBox
                sx={{
                    justifyContent: 'space-between',
                    mb: 3,
                }}
                >
                <StyledTypoGraphyHeader>ShortFall Terms</StyledTypoGraphyHeader>
                <StyledNavbarBox>
                    <StyledWhiteButton100px variant='outlined'>
                        Cancel
                    </StyledWhiteButton100px>
                    <StyledPurpleButton100px variant='contained'>
                        Download CSV
                    </StyledPurpleButton100px>
                </StyledNavbarBox>
            </StyledNavbarBox>
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    gap: '20px',
                    padding: '20px 30px ',
                }}
            >
                <Box>
                    <StyledTypography variant='subtitle2'>
                        {activityLogData?.type === "allocate_stock" ? "Allocation" : "Deallocation"} ID
                    </StyledTypography>
                    <StyledTextField placeholder='A-1256' value={activityId} />
                </Box>
                <Box>
                    <StyledTypography variant='subtitle2'>
                        Add Note
                    </StyledTypography>
                    <StyledTextField placeholder='Type something here...' />
                </Box>
                <Box>
                    <StyledTypography variant='subtitle2'>
                        Date
                    </StyledTypography>
                    <StyledTextField placeholder='Enter the date' 
                        value={activityLogData?.createdAt}
                    />
                </Box>
            </Box>
            <Divider />
            <Container sx={{ mt: 5 }}>
                <StyledTableTopBox>
                    <Typography variant='h4' sx={{ fontWeight: '500' }}>
                        {activityLogData?.projectProducts[0].project.name}
                    </Typography>
                </StyledTableTopBox>

                <DataTable
                    isSelect={true}
                    rows={activityLogsTableData}
                    headCells={headcells}
                    setSelectedRows={setSelectedRows}
                    singleRowSelect={false}
                    isLoading={false}
                    isError={false}
                    handleFetchData={handleFetchData}
                    uniqueKey='id'
                    tableHeight='50vh'
                    errorElement={<div>Error</div>}
                    noDataElement={<div>No Data</div>}
                    isMoreData={false}
                    tableRef={tableRef}
                    navigateOnRowClick={false}
                />
                <StyledTableBottomBox>
                    <StyledWhiteButton100px>Create PO</StyledWhiteButton100px>
                </StyledTableBottomBox>
            </Container>
        </Box>
    );
};
export default AllocateIdPage;
