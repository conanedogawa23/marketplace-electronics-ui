'use client';

import { AddCircleOutline } from '@mui/icons-material';
import {
    Box,
    Button,
    CircularProgress,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import Link from 'next/link';
import { useState, useRef } from 'react';

import CustomTabPanel from '@/components/CustomTabPanel';
import { DataTable } from '@/components/Table/Table';
import { useGetUserListQuery } from '@/lib/redux/user/getUsers';


function a11yProps(index: number) {
    return {
        id: `user-tab-${index}`,
        'aria-controls': `user-tabpanel-${index}`,
    };
}

interface UsersColumnDataProps {
    id: string;
    label: string;
    minWidth: number;
    maxWidth?: number;
}

const Users = () => {
    const [value, setValue] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const { data: adminData, isLoading: isLoadingAdminUsers } = useGetUserListQuery({
        page: pageCount,
        filter: { admin: true }
    });
    const { data: userData, isLoading: isLoadingUsers } = useGetUserListQuery({
        page: pageCount,
        filter: { admin: false }
    });

    const usersHeadCells: UsersColumnDataProps[] = [
        { id: 'firstName', label: 'Name', minWidth: 100 },
        { id: 'email', label: 'Contact', minWidth: 300 },
        { id: 'employeeId', label: 'Employee ID', minWidth: 200 },
        { id: 'employmentStatus', label: 'Status', minWidth: 100 },
    ];

    const adminAPIRef =  useRef<HTMLDivElement>(null);
    const usersAPIRef =  useRef<HTMLDivElement>(null);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleFetchData = async (page: number) => {
        if (adminData?.hasMore) {
            setPageCount(page);
        }
        if (userData?.hasMore) {
            setPageCount(page);
        }
    };

    const Loading = (
        <Box
            sx={{
                height: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress color='secondary' />
        </Box>
    );

    return (
        <>
            <Box
                mt={8}
                px={6}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                sx={{
                    flexShrink: 0,
                }}
            >
                <Box>
                    <Box
                        display={'flex'}
                        alignItems={'center'}
                        sx={{
                            height: '38px',
                        }}
                    >
                        <Typography
                            mr={'4px'}
                            variant='h4'
                            fontSize={'30px'}
                            fontWeight={600}
                        >
                            Users
                        </Typography>
                    </Box>
                    <Typography
                        variant='subtitle1'
                        mt={'4px'}
                        ml={'1px'}
                        // color={'GrayText'}
                        height={'24px'}
                        sx={{
                            color: 'hsla(216, 18%, 34%, 1)',
                            flexShrink: 0,
                        }}
                    >
                        Manage your team members and their account permissions
                        here.
                    </Typography>
                </Box>
                <Box>
                    <Button
                        LinkComponent={Link}
                        href='/settings/user/add'
                        variant='contained'
                        color='secondary'
                        startIcon={<AddCircleOutline />}
                    >
                        Add User
                    </Button>
                </Box>
            </Box>
            <Box
                mt={8}
                px={6}
                sx={{
                    flexShrink: 0,
                    height: '32px',
                }}
            >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label='User Tabs'
                    indicatorColor='secondary'
                    textColor='inherit'
                    sx={{
                        '& .MuiTabs-flexContainer': {
                            gap: '12px',
                        },
                        borderBottom: 1,
                        borderColor: 'divider',
                    }}
                >
                    <Tab label='Super Admins' {...a11yProps(0)} sx={{ p: 0 }} />
                    <Tab label='Users' {...a11yProps(1)} sx={{ p: 0 }} />
                </Tabs>
            </Box>
            <Box mt={8} sx={{ flexGrow: 1, overflowX: 'auto', px: 6 }}>
                {/* Admins Table */}
                <CustomTabPanel value={value} index={0}>
                    <Box
                        sx={{
                            border: '1px solid hsla(220, 17%, 93%, 1)',
                            borderRadius: '6px',
                            // height: '280px',
                        }}
                    >
                        <Box
                            height={'68px'}
                            display={'flex'}
                            borderBottom={'1px solid hsla(220, 17%, 93%, 1)'}
                            alignItems={'center'}
                        >
                            <Typography
                                variant='body1'
                                fontWeight={600}
                                fontSize={'18px'}
                                lineHeight={'28px'}
                                ml={4}
                                mr={'4px'}
                            >
                                Admins
                            </Typography>
                        </Box>
                        <Box height={440}>
                            {isLoadingAdminUsers ? (
                                Loading
                            ) : (
                                <DataTable
                                    isSelect={true}
                                    rows={adminData?.users ?? []}
                                    headCells={usersHeadCells}
                                    isLoading={isLoadingAdminUsers}
                                    handleFetchData={handleFetchData}
                                    uniqueKey='uuid'
                                    tableHeight='85vh'
                                    errorElement={<div>Error</div>}
                                    noDataElement={<div>No Data</div>}
                                    isMoreData={true}
                                    navigateOnRowClick={false}
                                    tableRef={adminAPIRef}
                                    setSelectedRows={() => {/* empty function  */}}
                                    singleRowSelect={false}
                                    isError={false}
                                />
                            )}
                        </Box>
                    </Box>
                </CustomTabPanel>
                {/* Users Table */}
                <CustomTabPanel value={value} index={1}>
                    <Box
                        sx={{
                            border: '1px solid hsla(220, 17%, 93%, 1)',
                            borderRadius: '6px',
                        }}
                    >
                        <Box
                            height={'68px'}
                            display={'flex'}
                            borderBottom={'1px solid hsla(220, 17%, 93%, 1)'}
                            alignItems={'center'}
                        >
                            <Typography
                                variant='body1'
                                fontWeight={600}
                                fontSize={'18px'}
                                lineHeight={'28px'}
                                ml={4}
                                mr={'4px'}
                            >
                                Users
                            </Typography>
                        </Box>
                        <Box height={440}>
                            {isLoadingUsers ? (
                                Loading
                            ) : (
                                <DataTable
                                    isSelect={true}
                                    rows={userData?.users ?? []}
                                    headCells={usersHeadCells}
                                    isLoading={isLoadingUsers}
                                    handleFetchData={handleFetchData}
                                    uniqueKey='uuid'
                                    tableHeight='85vh'
                                    errorElement={<div>Error</div>}
                                    noDataElement={<div>No Data</div>}
                                    isMoreData={true}
                                    navigateOnRowClick={false}
                                    tableRef={usersAPIRef}
                                    setSelectedRows={() => {/* empty function  */}}
                                    singleRowSelect={false}
                                    isError={false}
                                />
                            )}
                        </Box>
                    </Box>
                </CustomTabPanel>
            </Box>
        </>
    );
};

export default Users;
