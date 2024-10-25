'use client';

import { Box, Button, Chip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { type AutocompleteOptionType } from '@/components/AutocompleteSelectAndSearchOption/types';
import DataTable from '@/components/Table/Table';

import {
    useGetProjectDetailsUsingUuidQuery,
    useGetProjectItemAutcompleteOptionsQuery,
    useGetProjectItemListQuery,
} from '@/lib/redux/project/getProjects';

import AvatarIcon from '../../../../../../public/assets/Avatar-blue.png';
import AutocompleteSelectAndSearchOption from '../../../../../components/AutocompleteSelectAndSearchOption';

// INTERFACES
interface RowDataProps {
    id: number;
    uuid: string;
    name: string;
    description: string;
    qty: number;
    status: string;
}
interface HeadCellProps {
    id: string;
    label: string;
    minWidth: number;
    maxWidth?: number;
}

// STYLES
const StyledTypography600 = styled(Typography)(() => ({
    fontWeight: 600,
}));
const StyledTypography500 = styled(Typography)(() => ({
    fontWeight: 500,
}));
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
}));
const StyledPurpleButton100px = styled(Button)(() => ({
    backgroundColor: '#C255D9',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 600,
    width: '100px',
    borderRadius: '8px',
    padding: '6px',
}));

const StocksPage: React.FC = () => {
    const tableRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { id } = useParams();
    const pathName = usePathname();
    const [rows, setRows] = useState<RowDataProps[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [projectItemSearchQuery, setProjectItemSearchQuery] =
        useState<string>('');
    const [SelectAutocompleteValue, setSelectAutocompleteValue] =
        useState<AutocompleteOptionType>({
            label: '',
            value: '',
        });
    const previousPageCount = useRef(pageCount);
    const previousFilter = useRef(SelectAutocompleteValue?.value);
    console.log('selectAutocompletevalue ', SelectAutocompleteValue);
    const [
        projectStocksAutocompleteOptions,
        setProjectStocksAutocompleteOptions,
    ] = useState<AutocompleteOptionType[]>([]);
    const { data: projectStocksAutocompleteOptionsData } =
        useGetProjectItemAutcompleteOptionsQuery({
            projectId: id as string,
            ...(projectItemSearchQuery && {
                filters: { name: projectItemSearchQuery },
            }),
        });
    console.log(
        'Project Stocks Autocomplete Options',
        projectStocksAutocompleteOptionsData,
    );
    const {
        data: ProjectItemListData,
        isFetching: ProjectItemListDataLoading,
    } = useGetProjectItemListQuery({
        projectId: id as string,
        page: pageCount,
        ...(SelectAutocompleteValue?.value && {
            filters: { name: SelectAutocompleteValue?.value },
        }),
    });
    const { data: ProjectDetailsData } = useGetProjectDetailsUsingUuidQuery({
        uuid: id as string,
    });
    console.log('Project Details', ProjectDetailsData);
    const handleFetchData = async (page: number) => {
        if (ProjectItemListData?.hasMore) {
            console.log('Page number', page);
            setPageCount(page);
        }
    };
    const [selectedRows, setSelectedRows] = useState<(number | string)[]>([]);
    const [buttonsEnabled, setButtonsEnabled] = useState<boolean>(false);
    const NavbarBoxContent = [
        {
            label: 'DUE DATE :',
            value: '09/02/2024',
        },
        {
            label: 'BUDGET :',
            value: `$${ProjectDetailsData?.budget || 'N/A'}`,
        },
        {
            label: 'OWNER :',
            value: `${ProjectDetailsData?.owner?.firstName || 'N/A'}`,
        },
    ];

    const headCells: HeadCellProps[] = [
        {
            id: 'name',
            label: 'Name',
            minWidth: 170,
        },
        {
            id: 'description',
            label: 'Description',
            minWidth: 170,
        },

        {
            id: 'qty',
            label: 'Quantity',
            minWidth: 170,
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 170,
        },
    ];

    const handleAllocate = () => {
        const selectedUuids = selectedRows.join(',');
        router.push(`${pathName}/allocate?ids=${selectedUuids}&action=allocate`);
    };

    const handleDeAllocate = () => {
        const selectedUuids = selectedRows.join(',');
        router.push(`${pathName}/allocate?ids=${selectedUuids}&action=deallocate`);
    };
    
    useEffect(() => {
        if (ProjectItemListData?.projectItems) {
            const projectItems = ProjectItemListData.projectItems;
            const mappedRowData: RowDataProps[] = projectItems.map(
                (item: any) => ({
                    id: item.id,
                    uuid: item.uuid,
                    name: item.name,
                    description: item.description,
                    qty: item.quantity,
                    status: item.status,
                }),
            );
            if (
                pageCount === 0 ||
                SelectAutocompleteValue.value !== previousFilter.current
            ) {
                setRows(mappedRowData);
                previousFilter.current = SelectAutocompleteValue?.value;
            } else {
                setRows((prevRows) => [...prevRows, ...mappedRowData]);
            }

            previousPageCount.current = pageCount;
        }
        if (projectStocksAutocompleteOptionsData) {
            setProjectStocksAutocompleteOptions(
                projectStocksAutocompleteOptionsData.map((project: any) => ({
                    label: project?.name,
                    value: project?.name,
                })),
            );
        }
    }, [ProjectItemListData, projectStocksAutocompleteOptionsData]);
    useEffect(() => {
        if (selectedRows.length > 0) {
            setButtonsEnabled(true);
        } else {
            setButtonsEnabled(false);
        }
    }, [selectedRows]);
    return (
        <>
            <Box sx={{ p: 3, width: '100%' }}>
                <StyledNavbarBox
                    sx={{
                        width: '100%',
                        justifyContent: 'space-between',
                        mb: 3,
                    }}
                >
                    <StyledNavbarBox>
                        <Image src={AvatarIcon} alt='Avatar' width={40} />
                        <Typography variant='h5' sx={{ fontWeight: '600' }}>
                            {ProjectDetailsData?.name}
                        </Typography>
                    </StyledNavbarBox>
                    <StyledNavbarBox
                        sx={{
                            width: '50%',
                            justifyContent: 'space-between',
                        }}
                    >
                        {NavbarBoxContent.map((item, index) => (
                            <StyledNavbarBox key={index}>
                                <StyledTypography600 variant='subtitle2'>
                                    {item.label}
                                </StyledTypography600>
                                <StyledTypography500 variant='subtitle2'>
                                    {item.value}
                                </StyledTypography500>
                            </StyledNavbarBox>
                        ))}
                        <StyledNavbarBox>
                            <StyledTypography600 variant='subtitle2'>
                                STAGE
                            </StyledTypography600>
                            <Chip
                                size='small'
                                label={ProjectDetailsData?.stage}
                                color='primary'
                                variant='outlined'
                            />
                        </StyledNavbarBox>
                    </StyledNavbarBox>
                </StyledNavbarBox>
                <StyledNavbarBox
                    sx={{ width: '100%', justifyContent: 'space-between' }}
                >
                    <StyledNavbarBox sx={{ width: '60%' }}>
                        <AutocompleteSelectAndSearchOption
                            placeholder='Search project items'
                            shouldRenderAddNewOption={false}
                            setSearchQuery={setProjectItemSearchQuery}
                            autoCompleteOptions={
                                projectStocksAutocompleteOptions
                            }
                            setFieldValue={setSelectAutocompleteValue}
                            fieldValue={SelectAutocompleteValue}
                            width='40%'
                        />
                    </StyledNavbarBox>
                    <StyledNavbarBox>
                        {buttonsEnabled ? (
                            <>
                                <StyledPurpleButton100px
                                    variant='contained'
                                    onClick={handleAllocate}
                                >
                                    Allocate
                                </StyledPurpleButton100px>
                                <StyledPurpleButton100px 
                                    variant='contained'
                                    onClick={handleDeAllocate}
                                >
                                    De-allocate
                                </StyledPurpleButton100px>
                            </>
                        ) : (
                            <>
                                <StyledWhiteButton100px disabled>
                                    Allocate
                                </StyledWhiteButton100px>
                                <StyledWhiteButton100px disabled>
                                    De-allocate
                                </StyledWhiteButton100px>
                            </>
                        )}
                    </StyledNavbarBox>
                </StyledNavbarBox>
                <Box sx={{ width: '100%', mt: 3 }}>
                    <DataTable
                        isSelect={true}
                        rows={rows}
                        headCells={headCells}
                        setSelectedRows={setSelectedRows}
                        singleRowSelect={false}
                        isLoading={ProjectItemListDataLoading}
                        isError={false}
                        handleFetchData={handleFetchData}
                        uniqueKey='uuid'
                        tableHeight='85vh'
                        errorElement={
                            <>
                                <div>Error</div>
                            </>
                        }
                        noDataElement={
                            <>
                                <div>No Data</div>
                            </>
                        }
                        isMoreData={true}
                        navigateOnRowClick={false}
                        tableRef={tableRef}
                    />
                </Box>
            </Box>
        </>
    );
};
export default StocksPage;
