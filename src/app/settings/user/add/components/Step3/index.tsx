import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    styled,
    Typography,
} from '@mui/material';
import type React from 'react';
import { Controller, type UseFormReturn } from 'react-hook-form';

import { pxToRem } from '@/app/settings/utils/theme';

import { useGetProjectListQuery } from '@/lib/redux/project/getProjects';
import { useGetRolesListQuery } from '@/lib/redux/role/getRoles';

import { type UserForm } from '../../utils/types';

const CustomBox = styled(Box)(({ theme }) => ({
    border: `1px solid ${theme.customColors?.border.secondary.light}`,
    borderRadius: theme.customSizes?.radius.sm,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    padding: pxToRem(4),
    paddingRight: pxToRem(8),
}));

export type Step3Props = {
    activeStep: number;
    handleNext: () => void;
    handleBack: () => void;
    form: UseFormReturn<UserForm>;
};

export const Step3: React.FC<Step3Props> = ({ handleBack, form }) => {
    const { data: projects, isFetching: isFetchingProjects } =
        useGetProjectListQuery({
            page: 10,
        });
    const { data: roles, isFetching: isFetchingRoles } = useGetRolesListQuery();

    const {
        control,
        formState: { errors, isSubmitting },
    } = form;

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
            <Typography variant='h5'>Project Permissions</Typography>
            {isFetchingProjects || isFetchingRoles ? (
                loading
            ) : (
                <>
                    <Box mt={9} mb={2}>
                        <Typography
                            variant='subtitle2'
                            component='label'
                            id='project'
                        >
                            Assign Project
                        </Typography>
                        <FormControl
                            fullWidth
                            error={
                                !!errors.projectPermissions?.projectID?.message
                            }
                        >
                            <Controller
                                name='projectPermissions.projectID'
                                control={control}
                                defaultValue='none'
                                render={({ field }) => (
                                    <Select
                                        id='projectId'
                                        fullWidth
                                        sx={{
                                            height: '40px',
                                        }}
                                        aria-invalid={
                                            errors.projectPermissions?.projectID
                                                ? 'true'
                                                : 'false'
                                        }
                                        aria-describedby='projectId-text'
                                        {...field}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            field.onChange(value);
                                        }}
                                        error={
                                            !!errors.projectPermissions
                                                ?.projectID?.message
                                        }
                                    >
                                        <MenuItem value='none'>
                                            <em>None</em>
                                        </MenuItem>

                                        {projects?.projects?.map((project) => (
                                            <MenuItem
                                                key={project.uuid}
                                                value={project.uuid}
                                            >
                                                {project.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            {errors.projectPermissions?.projectID?.message ? (
                                <FormHelperText
                                    id='projectId-text'
                                    sx={{ m: 0 }}
                                >
                                    {
                                        errors.projectPermissions?.projectID
                                            ?.message
                                    }
                                </FormHelperText>
                            ) : null}
                        </FormControl>
                    </Box>
                    <Box mt={9}>
                        <FormControl fullWidth>
                            <FormLabel id='roles-radio-buttons-group-label'>
                                Roles
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby='roles-radio-buttons-group-label'
                                name='role-radio-buttons-group'
                            >
                                {roles?.map((role) => {
                                    return (
                                        <CustomBox
                                            key={role.uuid}
                                            component={'label'}
                                            sx={() => ({
                                                height: '40px',
                                                mt: 3,
                                                pl: 3,
                                                justifyContent: 'flex-start',
                                            })}
                                        >
                                            <Controller
                                                name={
                                                    'projectPermissions.permissionID'
                                                }
                                                control={control}
                                                render={({ field }) => {
                                                    return (
                                                        <Radio
                                                            {...field}
                                                            color='secondary'
                                                            value={role.uuid}
                                                            checked={
                                                                role.uuid ===
                                                                field.value
                                                            }
                                                            onChange={(e) => {
                                                                field.onChange(
                                                                    e.target
                                                                        .value,
                                                                );
                                                            }}
                                                        />
                                                    );
                                                }}
                                            />
                                            <Typography variant='subtitle2'>
                                                {role.name}
                                            </Typography>
                                        </CustomBox>
                                    );
                                })}
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </>
            )}

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
                    {/* <Button
                        variant='outlined'
                        color='secondary'
                        sx={{ mr: 3 }}
                        type='submit'
                    >
                        {isSubmitting ? 'Loading...' : 'Skip and Done'}
                    </Button> */}
                    <Button color='secondary' variant='contained' type='submit'>
                        {isSubmitting ? 'Loading...' : 'Done'}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Step3;
