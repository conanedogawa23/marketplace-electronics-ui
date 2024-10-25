'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Container, StepLabel, Stepper } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useCreateUserMutation } from '@/lib/redux/user/createUser';
import { type CreateUserParams } from '@/lib/redux/user/types';

import { Step1, Step3 } from './components';
import { CustomStep } from './components/CustomStep';
import ErrorToast from './components/ErrorToast';
import { Step2 } from './components/Step2/index';
import SuccessToast from './components/SuccessToast';
import { STEPS, type UserForm, UserFormSchema } from './utils';

const AddUser = () => {
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);

    const [createUser] = useCreateUserMutation();

    const form = useForm<UserForm>({
        resolver: zodResolver(UserFormSchema),
        // resolver: async (data, context, options) => {
        //     // you can debug your validation schema here
        //     console.log('formData', data);
        //     console.log(
        //         'validation result',
        //         await zodResolver(UserFormSchema)(data, context, options),
        //     );
        //     return zodResolver(UserFormSchema)(data, context, options);
        // },

        mode: 'onBlur',
        reValidateMode: 'onBlur',
    });

    const { handleSubmit } = form;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const submitHandler: SubmitHandler<UserForm> = async (data) => {
        const projectID = data.projectPermissions?.projectID;
        const roleID = data.projectPermissions?.permissionID;
        const params: CreateUserParams = {
            user: {
                department: data.department,
                email: data.email,
                employeeId: data.employeeId,
                firstName: data.firstName,
                lastName: data.lastName,
                password: data.password,
                salary: 2000,
                position: 'Software Engineer',
                permissions: data.modules.reduce((acc, d) => {
                    if (d.name) {
                        d.permissions.forEach((t) => {
                            if (t.id) {
                                acc.push(t.id);
                            }
                        });
                    }
                    return acc;
                }, [] as string[]),
                phoneNumber: data.phone,
                projects: projectID ? [projectID] : undefined,
                role: roleID,
                image: data.image,
            },
        };
        const submittedData = await createUser(params);

        if (submittedData?.error?.message) {
            console.log('submitted - error', submittedData.error);
            toast(
                () => {
                    return (
                        <ErrorToast
                            message={
                                submittedData.error.message ?? 'Error occurred'
                            }
                        />
                    );
                },
                {
                    position: 'top-right',
                    autoClose: 5000,
                    closeOnClick: true,
                    hideProgressBar: true,
                },
            );
        }
        if (submittedData?.data) {
            console.log('submitted', submittedData.data);
            toast(<SuccessToast />, {
                position: 'top-right',
                autoClose: 5000,
                closeOnClick: true,
                hideProgressBar: true,
            });
            router.push('/settings/users');
        }
    };

    return (
        <Box sx={{ flexGrow: 1, overflow: 'auto', pb: '200px' }}>
            <Container sx={{ mt: 8 }} fixed>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {STEPS.map((label, index) => (
                        <CustomStep key={label} last={index === 2}>
                            <StepLabel>{label}</StepLabel>
                        </CustomStep>
                    ))}
                </Stepper>
            </Container>
            <Container
                component={'form'}
                fixed
                onSubmit={handleSubmit(submitHandler)}
            >
                <CustomStepPanel value={activeStep} index={0}>
                    <Step1
                        form={form}
                        activeStep={activeStep}
                        handleNext={handleNext}
                    />
                </CustomStepPanel>
                <CustomStepPanel value={activeStep} index={1}>
                    <Step2
                        activeStep={activeStep}
                        handleBack={handleBack}
                        handleNext={handleNext}
                        form={form}
                    />
                </CustomStepPanel>
                <CustomStepPanel value={activeStep} index={2}>
                    <Step3
                        form={form}
                        activeStep={activeStep}
                        handleBack={handleBack}
                        handleNext={handleNext}
                    />
                </CustomStepPanel>
            </Container>
        </Box>
    );
};

export default AddUser;

interface StepPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomStepPanel(props: StepPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`fomr-step-${index}`}
            aria-labelledby={`user-form-step-${index}`}
            {...other}
        >
            {value === index ? children : null}
        </div>
    );
}
