import {
    Box,
    Checkbox,
    FormControl,
    InputAdornment,
    Typography,
} from '@mui/material';
import { GridSearchIcon } from '@mui/x-data-grid';
import { useState } from 'react';
import { Controller, type UseFormReturn } from 'react-hook-form';

import { CustomTextField } from '@/app/settings/user/add/components/Step2/CustomTextField';
import { pxToRem } from '@/app/settings/utils/theme';

import CustomTabPanel from '@/components/CustomTabPanel';

import { type Permission } from '@/lib/redux/permission/types';

import { type Step2Module, type UserForm } from '../../utils';
import { CustomBox } from './CustomBox';

export type TabPanelProps = {
    selectedTab: number;
    moduleIndex: number;
    module: Step2Module;
    permissions: Permission[];
    form: UseFormReturn<UserForm>;
};

export const TabPanel: React.FC<TabPanelProps> = ({
    selectedTab,
    module,
    moduleIndex,
    permissions,
    form,
}) => {
    const { control } = form;
    const [query, setQuery] = useState('');

    const filteredData = permissions.filter((permission) =>
        permission.name.toLowerCase().includes(query.toLowerCase()),
    );

    return (
        <CustomTabPanel
            key={module.name}
            value={selectedTab}
            index={moduleIndex}
            id={module.name}
        >
            <FormControl fullWidth>
                <CustomTextField
                    variant='outlined'
                    placeholder='Search modules...'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <GridSearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </FormControl>
            <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                {filteredData.map((permission, index) => (
                    <CustomBox
                        key={permission.uuid}
                        component={'label'}
                        sx={() => ({
                            height: '40px',
                            mt: 3,
                            cursor: 'pointer',
                        })}
                    >
                        <Box
                            display={'flex'}
                            alignItems={'center'}
                            height={pxToRem(40)}
                        >
                            <Controller
                                name={`modules.${moduleIndex}.permissions.${index}.id`}
                                control={control}
                                defaultValue={false}
                                render={({ field }) => {
                                    return (
                                        <Checkbox
                                            color='secondary'
                                            size='small'
                                            {...field}
                                            value={permission.uuid}
                                            onChange={(e, checked) => {
                                                field.onChange(
                                                    checked && e.target.value,
                                                );
                                            }}
                                            checked={!!field.value}
                                        />
                                    );
                                }}
                            />

                            <Typography variant='subtitle2'>
                                {permission.name}
                            </Typography>
                        </Box>
                    </CustomBox>
                ))}
            </Box>
        </CustomTabPanel>
    );
};
