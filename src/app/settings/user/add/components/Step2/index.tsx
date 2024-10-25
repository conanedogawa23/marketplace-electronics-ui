'use client';

import {
    Box,
    Button,
    CircularProgress,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { type UseFormReturn } from 'react-hook-form';

import { STEP_FIELDS } from '@/app/settings/user/add/utils/constants';

import { useGetPermissionListQuery } from '@/lib/redux/permission/getPermissions';

import { type Step2Module, type UserForm } from '../../utils';
import ModuleBox from './ModuleBox';
import { TabPanel } from './TabPanel';

const filterFn = (item: UserForm['modules'][0]): item is Step2Module =>
    typeof item.name === 'string';

export type Step2Props = {
    activeStep: number;
    handleNext: () => void;
    handleBack: () => void;
    form: UseFormReturn<UserForm>;
};

export const Step2: React.FC<Step2Props> = ({
    handleNext,
    handleBack,
    form,
}) => {
    const { data, isFetching, isError } = useGetPermissionListQuery();

    const [selectedTab, setSelectedTab] = useState<number>(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    const next = async () => {
        const fields = STEP_FIELDS[1].fields;
        const output = await form.trigger(fields, {
            shouldFocus: true,
        });

        if (!output) return;

        handleNext();
    };

    const selectedModules = form.watch('modules');

    const isSelectedTabActive = !selectedModules?.[selectedTab]?.name;
    const firstAvailableTabIndex = selectedModules?.findIndex(filterFn);

    // Set selectedTab to first available tab if the selected tab is not available
    useEffect(() => {
        if (isSelectedTabActive && firstAvailableTabIndex !== -1) {
            setSelectedTab(firstAvailableTabIndex);
        }
    }, [isSelectedTabActive, firstAvailableTabIndex]);

    const loading = (
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
        <Box
            p={8}
            mt={16}
            sx={(theme) => ({
                border: `1px solid ${theme.customColors?.border.secondary.light}`,
                borderRadius: 2,
            })}
        >
            <Typography variant='h5'>Company Permissions</Typography>
            <Box
                mt={8}
                display={'flex'}
                flexDirection={'column'}
                sx={{
                    gap: '12px',
                    maxHeight: '400px',
                    overflowY: 'auto',
                }}
            >
                {isError ? (
                    <Typography variant='h6'>
                        Error fetching permissions
                    </Typography>
                ) : null}
                {!isError && isFetching
                    ? loading
                    : data?.modules.map((module, idx) => (
                          <ModuleBox
                              key={module}
                              index={idx}
                              module={module}
                              form={form}
                          />
                      ))}
            </Box>

            {data?.modules.length && selectedModules?.some(filterFn) ? (
                <>
                    <Typography variant='h5' mt={8}>
                        More
                    </Typography>
                    <Box
                        mt={8}
                        sx={{
                            flexShrink: 0,
                            height: '32px',
                        }}
                    >
                        <Tabs
                            aria-label='User Tabs'
                            indicatorColor='secondary'
                            textColor='inherit'
                            defaultValue={selectedModules.findIndex(filterFn)}
                            value={selectedTab}
                            onChange={handleChange}
                            sx={{
                                '& .MuiTabs-flexContainer': {
                                    gap: '12px',
                                },
                                borderBottom: 1,
                                borderColor: 'divider',
                            }}
                        >
                            {selectedModules.map((module, index) => {
                                if (!module.name) return null;

                                return (
                                    <Tab
                                        key={module.name}
                                        label={module.name}
                                        value={index}
                                        sx={{ p: 0 }}
                                    />
                                );
                            })}
                        </Tabs>
                    </Box>
                    <Box
                        mt={8}
                        sx={{
                            flexGrow: 1,
                            overflowX: 'auto',
                        }}
                    >
                        {selectedModules.map((module, idx) => {
                            if (!module.name) {
                                return null;
                            }

                            const permissions = data?.permissions[module.name];

                            if (!permissions) {
                                return (
                                    <Box key={module.name}>
                                        No Permissions Found.
                                    </Box>
                                );
                            }

                            return (
                                <TabPanel
                                    permissions={permissions}
                                    module={module as Step2Module}
                                    moduleIndex={idx}
                                    selectedTab={selectedTab}
                                    form={form}
                                    key={module.name}
                                />
                            );
                        })}
                    </Box>
                </>
            ) : null}
            <Box
                mt={9}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Button
                    variant='outlined'
                    color='secondary'
                    onClick={handleBack}
                >
                    Back
                </Button>
                <Box>
                    <Button
                        variant='outlined'
                        color='secondary'
                        sx={{ mr: 3 }}
                        onClick={handleNext}
                    >
                        Skip
                    </Button>
                    <Button
                        color='secondary'
                        variant='contained'
                        onClick={next}
                    >
                        Next
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Step2;
