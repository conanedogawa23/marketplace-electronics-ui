'use client';

import { CloudUpload, East } from '@mui/icons-material';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    Input,
    MenuItem,
    Select,
    styled,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { Controller, type UseFormReturn } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useGetDepartmentListQuery } from '@/lib/redux/department/getDepartments';
import { useUploadFileMutation } from '@/lib/redux/upload';

import { STEP_FIELDS, STEPS } from '../../utils/constants';
import { generatePassword } from '../../utils/passwordGenerator';
import { type UserForm } from '../../utils/types';

const CustomInput = styled(Input)(({ theme, error }) => ({
    border: `1px solid ${error ? 'red' : theme.customColors?.border.secondary.light}`,
    borderRadius: 3,
    paddingInline: '12px',
    height: '40px',
}));

const VisuallyHiddenInput = styled(Input)({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export type Step1Props = {
    activeStep: number;
    handleNext: () => void;
    form: UseFormReturn<UserForm>;
};

export const Step1: React.FC<Step1Props> = ({
    activeStep,
    handleNext,
    form,
}) => {
    const {
        register,
        setValue,
        trigger,
        clearErrors,
        control,
        formState: { errors },
    } = form;

    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);

    const [uploadFile, { isLoading }] = useUploadFileMutation();

    const { data: departments } = useGetDepartmentListQuery({
        fields: ['uuid', 'name'],
    });

    const handleFileUpload = async (selectedFile: File | null | undefined) => {
        if (selectedFile) {
            const validImageTypes = [
                'image/jpeg',
                'image/png',
                'image/jpg',
                'image/webp',
            ];

            if (!validImageTypes.includes(selectedFile.type)) {
                setFileError(
                    'Please select a valid image file (jpeg, jpg, png, webp).',
                );
                setFile(null);
            } else {
                setFileError(null);
                setFile(selectedFile);
                const formData = new FormData();
                formData.append('files', selectedFile);
                formData.append('description', selectedFile.name);
                try {
                    const result = await uploadFile(formData).unwrap();
                    setValue('image', result, {
                        shouldDirty: true,
                        shouldTouch: true,
                    });
                    clearErrors('image');
                    toast('Image uploaded successfully', {
                        position: 'top-right',
                        autoClose: 5000,
                        closeOnClick: true,
                        hideProgressBar: true,
                    });
                } catch (error: any) {
                    setFile(null);
                    toast('Error uploading image. Please try again later.', {
                        position: 'top-right',
                        autoClose: 5000,
                        closeOnClick: true,
                        hideProgressBar: true,
                    });
                }
            }
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.item(0);
        handleFileUpload(selectedFile);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const selectedFile = event.dataTransfer.files?.item(0);

        handleFileUpload(selectedFile);
    };

    const handlePasswordGeneration = () => {
        const newPassword = generatePassword(10);

        setValue('password', newPassword, {
            shouldDirty: true,
            shouldTouch: true,
        });

        setValue('confirmPassword', newPassword, {
            shouldDirty: true,
            shouldTouch: true,
        });
    };

    const next = async () => {
        // if (!ACCEPTED_IMAGE_TYPES.includes(selectedFile?.type ?? '')) {
        //     setError('imageFile', {
        //         type: 'manual',
        //         message: 'File type must be .jpg, .jpeg, .png, or .webp',
        //     });
        // }

        // if (MAX_FILE_SIZE < (selectedFile?.size ?? 0)) {
        //     setError('imageFile', {
        //         type: 'manual',
        //         message: 'File size must be less than 2MB',
        //     });
        // }

        const fields = STEP_FIELDS[0].fields;
        const output = await trigger(fields, {
            shouldFocus: true,
        });

        // if (!selectedFile) {
        //     setError(
        //         'imageFile',
        //         {
        //             type: 'manual',
        //             message: 'Please select an image file',
        //         },
        //         {
        //             shouldFocus: true,
        //         },
        //     );
        // }

        // const imageFileError = errors.imageFile;
        // console.log('🚀 ~ next ~ imageFileError:', imageFileError);
        if (
            !output
            // || imageFileError
        )
            return;

        handleNext();
    };

    return (
        <Box
            mt={8}
            p={4}
            sx={(theme) => ({
                border: `1px solid ${theme.customColors?.border.secondary.light}`,
                borderRadius: 2,
            })}
        >
            <Typography variant='h5'>User Details</Typography>
            <Typography mt={4}>Profile Image</Typography>
            <FormControl error={!!fileError || !!errors?.image?.message}>
                <Box
                    sx={(theme) => ({
                        border: `1px solid ${fileError || errors?.image?.message ? 'red' : theme.customColors?.border.secondary.light}`,
                        borderRadius: 2,
                        padding: 2,
                        textAlign: 'center',
                        marginTop: 2,
                        maxWidth: '412px',
                    })}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <IconButton
                        component='label'
                        // tabIndex={-1}
                        sx={(theme) => ({
                            border: `1px solid ${theme.customColors?.border.secondary.light}`,
                            borderRadius: 2,
                        })}
                        color='secondary'
                    >
                        {isLoading ? (
                            <CircularProgress color='secondary' size='24px' />
                        ) : (
                            <CloudUpload />
                        )}

                        <VisuallyHiddenInput
                            type='file'
                            inputProps={{
                                accept: 'image/jpeg, image/jpg, image/png, image/webp',
                            }}
                            value={undefined}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onChange={handleFileChange}
                        />
                    </IconButton>

                    <Typography variant='subtitle2'>
                        {file
                            ? file.name
                            : 'Drag and drop a file or click to select'}
                    </Typography>

                    <Typography
                        variant='caption'
                        sx={(theme) => ({
                            color: theme.customColors?.text.tertiary,
                        })}
                    >
                        Max Size : 2MB (PNG, JPG, JPEG, WEBP)
                    </Typography>
                </Box>
                {fileError ? (
                    <FormHelperText id='first-name-text' sx={{ m: 0 }}>
                        {fileError}
                    </FormHelperText>
                ) : null}
                {errors.image?.message ? (
                    <FormHelperText id='first-name-text' sx={{ m: 0 }}>
                        {errors.image?.message}
                    </FormHelperText>
                ) : null}
            </FormControl>

            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: '20px' }}
                sx={() => ({ mt: '20px' })}
            >
                <Grid item xs={6}>
                    <Typography
                        component='label'
                        variant='subtitle2'
                        id='first-name'
                    >
                        First Name
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography
                        component='label'
                        variant='subtitle2'
                        id='last-name'
                    >
                        Last Name
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors.firstName?.message}>
                        <CustomInput
                            fullWidth
                            placeholder='John'
                            disableUnderline
                            id='first-name'
                            {...register('firstName')}
                            aria-invalid={errors.firstName ? 'true' : 'false'}
                            aria-describedby='first-name-text'
                            error={!!errors.firstName?.message}
                        />
                        {errors.firstName?.message ? (
                            <FormHelperText id='first-name-text' sx={{ m: 0 }}>
                                {errors.firstName?.message}
                            </FormHelperText>
                        ) : null}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors.lastName?.message}>
                        <CustomInput
                            fullWidth
                            placeholder='Doe'
                            disableUnderline
                            id='last-name'
                            {...register('lastName')}
                            aria-invalid={errors.lastName ? 'true' : 'false'}
                            aria-describedby='last-name-text'
                            error={!!errors.lastName?.message}
                        />
                        {errors.lastName?.message ? (
                            <FormHelperText id='last-name-text' sx={{ m: 0 }}>
                                {errors.lastName?.message}
                            </FormHelperText>
                        ) : null}
                    </FormControl>
                </Grid>
                <Grid item xs={6} mt={'20px'}>
                    <Typography
                        variant='subtitle2'
                        component='label'
                        id='department'
                    >
                        Department
                    </Typography>
                </Grid>
                <Grid item xs={6} mt={'20px'}>
                    <Typography
                        variant='subtitle2'
                        component='label'
                        id='employee-id'
                    >
                        Employee ID
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors.department?.message}>
                        <Controller
                            name='department'
                            control={control}
                            defaultValue='none'
                            render={({ field }) => (
                                <Select
                                    id='department'
                                    fullWidth
                                    sx={{
                                        height: '40px',
                                    }}
                                    aria-invalid={
                                        errors.department ? 'true' : 'false'
                                    }
                                    aria-describedby='department-text'
                                    {...field}
                                    error={!!errors.department?.message}
                                >
                                    <MenuItem value='none'>
                                        <em>None</em>
                                    </MenuItem>

                                    {departments?.map((department) => (
                                        <MenuItem
                                            key={department.uuid}
                                            value={department.uuid}
                                        >
                                            {department.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        {errors.department?.message ? (
                            <FormHelperText id='department-text' sx={{ m: 0 }}>
                                {errors.department?.message}
                            </FormHelperText>
                        ) : null}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors.employeeId?.message}>
                        <CustomInput
                            placeholder='El-1234'
                            fullWidth
                            disableUnderline
                            id='employee-id'
                            {...register('employeeId')}
                            aria-invalid={errors.employeeId ? 'true' : 'false'}
                            aria-describedby='employee-id-text'
                            error={!!errors.employeeId?.message}
                        />
                        {errors.employeeId?.message ? (
                            <FormHelperText id='employee-id-text' sx={{ m: 0 }}>
                                {errors.employeeId?.message}
                            </FormHelperText>
                        ) : null}
                    </FormControl>
                </Grid>
                <Grid item xs={6} mt={'20px'}>
                    <Typography
                        variant='subtitle2'
                        component='label'
                        id='email'
                    >
                        Email
                    </Typography>
                </Grid>
                <Grid item xs={6} mt={'20px'}>
                    <Typography
                        variant='subtitle2'
                        component='label'
                        id='phone'
                    >
                        Phone
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors.email?.message}>
                        <CustomInput
                            placeholder='john@ui_marketplaceminated.com'
                            fullWidth
                            disableUnderline
                            id='email'
                            {...register('email')}
                            aria-invalid={errors.email ? 'true' : 'false'}
                            aria-describedby='email-text'
                            error={!!errors.email?.message}
                        />
                        {errors.email?.message ? (
                            <FormHelperText id='email-text' sx={{ m: 0 }}>
                                {errors.email?.message}
                            </FormHelperText>
                        ) : null}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors.phone?.message}>
                        <CustomInput
                            placeholder='(419) 340 - 8581'
                            fullWidth
                            disableUnderline
                            id='phone'
                            {...register('phone')}
                            aria-invalid={errors.phone ? 'true' : 'false'}
                            aria-describedby='phone-text'
                            error={!!errors.phone?.message}
                        />
                        {errors.phone?.message ? (
                            <FormHelperText id='phone-text' sx={{ m: 0 }}>
                                {errors.phone?.message}
                            </FormHelperText>
                        ) : null}
                    </FormControl>
                </Grid>
            </Grid>

            <Box display={'flex'} justifyContent={'space-between'} mt={'68px'}>
                <Typography variant='h5'>Password</Typography>

                <Button
                    color='secondary'
                    variant='contained'
                    onClick={handlePasswordGeneration}
                >
                    Generate Password
                </Button>
            </Box>

            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: '20px' }}
                sx={() => ({ mt: '20px' })}
            >
                <Grid item xs={6}>
                    <Typography variant='subtitle2'>Password</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='subtitle2'>
                        Confirm Password
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth error={!!errors.password?.message}>
                        <CustomInput
                            fullWidth
                            placeholder='••••••••'
                            disableUnderline
                            type='text'
                            {...register('password')}
                            aria-invalid={errors.password ? 'true' : 'false'}
                            aria-describedby='password-text'
                            error={!!errors.password?.message}
                        />
                        {errors.password?.message ? (
                            <FormHelperText id='password-text' sx={{ m: 0 }}>
                                {errors.password?.message}
                            </FormHelperText>
                        ) : null}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl
                        fullWidth
                        error={!!errors.confirmPassword?.message}
                    >
                        <CustomInput
                            type='text'
                            fullWidth
                            placeholder='••••••••'
                            disableUnderline
                            {...register('confirmPassword')}
                            aria-invalid={
                                errors.confirmPassword ? 'true' : 'false'
                            }
                            aria-describedby='confirmPassword-text'
                            error={!!errors.confirmPassword?.message}
                        />
                        {errors.confirmPassword?.message ? (
                            <FormHelperText
                                id='confirmPassword-text'
                                sx={{ m: 0 }}
                            >
                                {errors.confirmPassword?.message}
                            </FormHelperText>
                        ) : null}
                    </FormControl>
                </Grid>
            </Grid>

            <Box display={'flex'} justifyContent={'flex-end'} mt={'68px'}>
                <Button
                    color='secondary'
                    variant='contained'
                    endIcon={<East />}
                    disabled={activeStep >= STEPS.length}
                    onClick={next}
                >
                    {activeStep === STEPS.length - 1 ? 'Finish' : 'Next'}
                </Button>
            </Box>
        </Box>
    );
};

export default Step1;
