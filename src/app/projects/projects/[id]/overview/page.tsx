'use client';

// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Typography } from '@mui/material';
// import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useRef } from 'react';

import { useGetProjectDetailsUsingUuidQuery } from '@/lib/redux/project/getProjects';

import AvatarIcon from '../../../../../../public/assets/Avatar-blue.png';

// import { DataTable } from '../../../../../components/Table/Table';

// interface Row1Props {
//     id: number;
//     name: string;
//     budget: string;
//     total: string;
// }
// interface Row2Props {
//     id: number;
//     name: string;
//     budget: string;
// }
// interface HeadCellsProps {
//     id: string;
//     label: string;
//     minWidth: number;
//     maxWidth?: number;
// }

const ProjectViewPage: React.FC = () => {
    const tableRef = useRef<HTMLDivElement>(null);
    const { id } = useParams();
    // const rows1: Row1Props[] = [
    //     {
    //         id: 1,
    //         name: 'Central City College',
    //         budget: '$10941',
    //         total: '$10941',
    //     },
    //     {
    //         id: 2,
    //         name: 'Central City College',
    //         budget: '$10941',
    //         total: '$10941',
    //     },
    //     {
    //         id: 3,
    //         name: 'Central City College',
    //         budget: '$10941',
    //         total: '$10941',
    //     },
    //     {
    //         id: 4,
    //         name: 'Central City College',
    //         budget: '$10941',
    //         total: '$10941',
    //     },
    //     {
    //         id: 5,
    //         name: 'Central City College',
    //         budget: '$10941',
    //         total: '$10941',
    //     },
    // ];
    // const rows2: Row2Props[] = [
    //     {
    //         id: 1,
    //         name: 'Central City College',
    //         budget: '$10941',
    //     },
    //     {
    //         id: 2,
    //         name: 'Central City College',
    //         budget: '$10941',
    //     },
    //     {
    //         id: 3,
    //         name: 'Central City College',
    //         budget: '$10941',
    //     },
    //     {
    //         id: 4,
    //         name: 'Central City College',
    //         budget: '$10941',
    //     },
    //     {
    //         id: 5,
    //         name: 'Central City College',
    //         budget: '$10941',
    //     },
    // ];
    // const headCells1: HeadCellsProps[] = [
    //     {
    //         id: 'name',
    //         label: 'Name',
    //         minWidth: 170,
    //     },
    //     {
    //         id: 'budget',
    //         label: 'Budget',
    //         minWidth: 100,
    //     },
    //     {
    //         id: 'total',
    //         label: 'Total',
    //         minWidth: 100,
    //     },
    // ];
    // const headCells2: HeadCellsProps[] = [
    //     {
    //         id: 'name',
    //         label: 'Name',
    //         minWidth: 170,
    //     },
    //     {
    //         id: 'budget',
    //         label: 'Budget',
    //         minWidth: 100,
    //     },
    // ];
    const { data: ProjectDetailsData } = useGetProjectDetailsUsingUuidQuery({
        uuid: id as string,
    });
    console.log('Project Details', ProjectDetailsData);

    const [selected, setSelectedRows] = React.useState<(number | string)[]>([]);
    const handleFetchData = async (page: number) => {
        console.log('Page number', page);
    };

    return (
        <Box sx={{ width: '100%', paddingX: '28px', paddingY: '32px' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ display: 'flex', gap: '10px' }}>
                    <Image src={AvatarIcon} alt='Avatar' />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                        }}
                    >
                        <Box>
                            <Typography variant='h5' sx={{ fontWeight: '600' }}>
                                {ProjectDetailsData?.name}
                            </Typography>
                            <Typography
                                variant='subtitle2'
                                sx={{ fontWeight: '600' }}
                            >
                                AV Design and Build
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant='h5' sx={{ fontWeight: '600' }}>
                                Education
                            </Typography>
                            <Typography
                                variant='subtitle2'
                                sx={{ fontWeight: '400', opacity: '0.8' }}
                            >
                                {ProjectDetailsData?.address}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: '30px' }}>
                    <Box>
                        <Typography
                            variant='subtitle1'
                            sx={{ fontWeight: '600', marginBottom: '18px' }}
                        >
                            DUE DATE
                        </Typography>
                        <Typography
                            variant='subtitle2'
                            sx={{ fontWeight: '500' }}
                        >
                            12th Dec 2021
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant='subtitle1'
                            sx={{ fontWeight: '600', marginBottom: '18px' }}
                        >
                            BUDGET
                        </Typography>
                        <Typography
                            variant='subtitle2'
                            sx={{ fontWeight: '500' }}
                        >
                            ${ProjectDetailsData?.budget || 'N/A'}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography
                            variant='subtitle1'
                            sx={{ fontWeight: '600', marginBottom: '18px' }}
                        >
                            OWNER
                        </Typography>
                        <Typography
                            variant='subtitle2'
                            sx={{ fontWeight: '500' }}
                        >
                            {ProjectDetailsData?.owner?.firstName || 'N/A'}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant='subtitle1'
                            sx={{ fontWeight: '600', marginBottom: '18px' }}
                        >
                            STAGE
                        </Typography>
                        <Chip
                            size='small'
                            label={ProjectDetailsData?.stage}
                            color='primary'
                            variant='outlined'
                        />
                    </Box>
                </Box>
            </Box>
            <Divider sx={{ marginTop: '20px', marginBottom: '20px' }} />
            {/* <Box
                sx={{
                    marginTop: '26px',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        width: '60%',
                    }}
                >
                    <Box
                        sx={{
                            borderTop: '1px solid #d0d5dd',
                            borderRight: '1px solid #d0d5dd',
                            borderLeft: '1px solid #d0d5dd',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '20px',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: '600',
                                    fontSize: '16px',
                                }}
                            >
                                Rooms
                            </Typography>

                            <Typography
                                align='center'
                                sx={{
                                    borderRadius: '10px',
                                    border: '1px solid #F7D2FF',
                                    background: '#FDF4FF',
                                    fontSize: '12px',
                                    width: '30px',
                                    color: '#AB41C2',
                                }}
                            >
                                72
                            </Typography>
                        </Box>
                        <Button
                            startIcon={<AddCircleOutlineIcon />}
                            sx={{
                                color: '#AB41C2',
                                textTransform: 'none',
                                borderRadius: '8px',
                                background: '#fff',
                                border: '1px solid #F7D2FF',
                                fontWeight: '600',
                            }}
                        >
                            Add Rooms
                        </Button>
                    </Box>
                    <DataTable
                        isSelect={false}
                        rows={rows1}
                        headCells={headCells1}
                        setSelectedRows={setSelectedRows}
                        singleRowSelect={true}
                        isLoading={false}
                        isError={false}
                        handleFetchData={handleFetchData}
                        uniqueKey='id'
                        tableHeight='600px'
                        errorElement={<Box>Error</Box>}
                        noDataElement={<Box>No Data</Box>}
                        isMoreData={true}
                        navigateOnRowClick={false}
                        tableRef={tableRef}
                    />
                </Box>
                <Box
                    sx={{
                        width: '38%',
                    }}
                >
                    <Box
                        sx={{
                            borderTop: '1px solid #d0d5dd',
                            borderRight: '1px solid #d0d5dd',
                            borderLeft: '1px solid #d0d5dd',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '20px',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: '600',
                                    fontSize: '16px',
                                }}
                            >
                                Systems
                            </Typography>

                            <Typography
                                align='center'
                                sx={{
                                    borderRadius: '10px',
                                    border: '1px solid #F7D2FF',
                                    background: '#FDF4FF',
                                    fontSize: '12px',
                                    width: '30px',
                                    color: '#AB41C2',
                                }}
                            >
                                72
                            </Typography>
                        </Box>
                        <Button
                            startIcon={<AddCircleOutlineIcon />}
                            sx={{
                                color: '#AB41C2',
                                textTransform: 'none',
                                borderRadius: '8px',
                                background: '#fff',
                                border: '1px solid #F7D2FF',
                                fontWeight: '600',
                            }}
                        >
                            Add Systems
                        </Button>
                    </Box>
                    <DataTable
                        isSelect={false}
                        rows={rows2}
                        headCells={headCells2}
                        setSelectedRows={setSelectedRows}
                        singleRowSelect={true}
                        isLoading={false}
                        isError={false}
                        handleFetchData={handleFetchData}
                        uniqueKey='id'
                        tableHeight='600px'
                        errorElement={<Box>Error</Box>}
                        noDataElement={<Box>No Data</Box>}
                        isMoreData={true}
                        navigateOnRowClick={false}
                        tableRef={tableRef}
                    />
                </Box>
            </Box> */}
        </Box>
    );
};
export default ProjectViewPage;
