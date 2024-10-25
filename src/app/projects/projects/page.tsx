'use client';

import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import AutocompleteSelectAndSearchOption from '@/components/AutocompleteSelectAndSearchOption';
import { type AutocompleteOptionType } from '@/components/AutocompleteSelectAndSearchOption/types';

import {
    useGetProjectAutcompleteOptionsQuery,
    useGetProjectListQuery,
} from '@/lib/redux/project/getProjects';

import { DataTable } from '../../../components/Table/Table';

interface RowDataProps {
    id: number;
    client: React.ReactElement | string;
    project: string;
    stage: React.ReactElement | string;
    owner: string;
    budget: string;
}
interface HeadCellProps {
    id: string;
    label: string;
    minWidth: number;
    maxWidth?: number;
}
const ProjectPage: React.FC = () => {
    const [pageCount, setPageCount] = useState(0);
    const previousPageCount = useRef(pageCount);
    const [projectSearchQuery, setProjectSearchQuery] = useState<string>('');
    const [SelectAutocompleteValue, setSelectAutocompleteValue] =
        useState<AutocompleteOptionType>({
            label: '',
            value: '',
        });
    const previousFilter = useRef(SelectAutocompleteValue?.value);
    const [projectAutocompleteOptions, setProjectAutocompleteOptions] =
        useState<AutocompleteOptionType[]>([]);
    const {
        data: ProjectAutocompleteOptions,
        isLoading: ProjectAutocompleteOptionsLoading,
    } = useGetProjectAutcompleteOptionsQuery(
        projectSearchQuery
            ? {
                  filters: { name: projectSearchQuery },
              }
            : {},
    );
    const { data: ProjectListData, isFetching: ProjectListDataLoading } =
        useGetProjectListQuery({
            page: pageCount,
            ...(SelectAutocompleteValue?.value
                ? { filters: { name: SelectAutocompleteValue.value } }
                : {}),
        });
    const [rows, setRows] = React.useState<RowDataProps[]>([]);
    useEffect(() => {
        if (ProjectListData) {
            console.log('ProjectListData', ProjectListData);
            const projects = ProjectListData.projects;
            const mappedRowData: RowDataProps[] = projects.map(
                (project: any) => ({
                    id: project?.uuid,
                    client: project?.client?.name,
                    project: project?.name,
                    stage: project?.stage,
                    owner: `${project?.owner?.firstName || ''} ${project?.owner?.lastName || ''}`,
                    budget: project?.budget,
                }),
            );
            if (
                pageCount === 0 ||
                SelectAutocompleteValue?.value !== previousFilter.current
            ) {
                setRows(mappedRowData);
                previousFilter.current = SelectAutocompleteValue?.value;
                setPageCount(0);
            } else {
                setRows((prevRows) => [...prevRows, ...mappedRowData]);
            }

            previousPageCount.current = pageCount;
        }
        if (ProjectAutocompleteOptions) {
            setProjectAutocompleteOptions(
                ProjectAutocompleteOptions.map((project: any) => ({
                    label: project?.name,
                    value: project?.name,
                })),
            );
        }
    }, [ProjectListData, ProjectAutocompleteOptions]);

    const router = useRouter();
    const tableRef = useRef<HTMLDivElement>(null);
    const handleFetchData = async (page: number) => {
        if (ProjectListData?.hasMore) {
            console.log('Page number', page);
            setPageCount(page);
        }
    };
    const onClickNavigate = async (row: any) => {
        const rowId = row.id;
        router.push(`/projects/projects/${rowId}/stocks`);
    };
    const [selected, setSelectedRows] = React.useState<(number | string)[]>([]);
    const headCells: HeadCellProps[] = [
        { id: 'client', label: 'Client', minWidth: 150 },
        { id: 'project', label: 'Project', minWidth: 150 },
        { id: 'stage', label: 'Stage', minWidth: 100 },
        { id: 'owner', label: 'Owner', minWidth: 100 },
        { id: 'budget', label: 'Budget', minWidth: 100 },
    ];

    return (
        <Box sx={{ width: '100%', padding: 3 }}>
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
                    <Typography
                        sx={{
                            fontWeight: '600',
                            fontSize: '16px',
                        }}
                    >
                        Projects
                    </Typography>

                    {/* <Typography
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
                    </Typography> */}
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1',
                        justifyContent: 'flex-end',
                        gap: '1rem',
                    }}
                >
                    <Button
                        variant='outlined'
                        sx={{
                            border: '1px solid #D0D5DD',
                            paddingY: '4px',
                        }}
                    >
                        <ViewWeekOutlinedIcon
                            sx={{
                                color: '#344054',
                            }}
                        />
                    </Button>
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
                    placeholder='Search by Project Name'
                    shouldRenderAddNewOption={false}
                    autoCompleteOptions={projectAutocompleteOptions}
                    setSearchQuery={setProjectSearchQuery}
                    setFieldValue={setSelectAutocompleteValue}
                    fieldValue={SelectAutocompleteValue}
                    width='25%'
                />
            </Box>
            <DataTable
                isSelect={false}
                rows={rows}
                headCells={headCells}
                setSelectedRows={setSelectedRows}
                singleRowSelect={false}
                isLoading={ProjectListDataLoading}
                isError={false}
                handleFetchData={handleFetchData}
                uniqueKey='id'
                tableHeight='80vh'
                errorElement={<div>Error</div>}
                noDataElement={<div>No Data element</div>}
                isMoreData={true}
                navigateOnRowClick={false}
                tableRef={tableRef}
                onClick={onClickNavigate}
            />
        </Box>
    );
};

export default ProjectPage;
