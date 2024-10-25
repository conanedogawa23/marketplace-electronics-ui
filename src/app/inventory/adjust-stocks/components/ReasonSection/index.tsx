'use client';

import { Box, type SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import AutocompleteSelectAndSearchOption from '@/components/AutocompleteSelectAndSearchOption';
import { type AutocompleteOptionType } from '@/components/AutocompleteSelectAndSearchOption/types';

import type { ReasonLog } from '@/lib/redux/products/types';
import { useCreateReasonMutation } from '@/lib/redux/products/updateProductSequence';
import { Status } from '@/lib/redux/types';

import { StyledTextField, StyledTypography } from '../styles';

interface ReasonSectionProps {
    reason?: AutocompleteOptionType;
    handleReasonSelect?: (event: SelectChangeEvent) => void;
    setReason: (prev: AutocompleteOptionType) => void;
    reasons: ReasonLog[];
    setAdjustmentId: (prev: string) => void;
    setAdjustmentNote: (prev: string) => void;
    fetchReasonTrigger?: any;
}

export const ReasonSection = ({
    setReason,
    reasons,
    setAdjustmentId,
    setAdjustmentNote,
    fetchReasonTrigger,
}: ReasonSectionProps) => {
    const [reasonValue, setReasonValue] = useState<AutocompleteOptionType>({
        label: '',
        value: '',
    });

    const [parsedReasons, setParsedReasons] = useState<
        AutocompleteOptionType[]
    >([
        {
            label: '',
            value: '',
        },
    ]);

    const [createReason] = useCreateReasonMutation();

    useEffect(() => {
        setReason(reasonValue);
    }, [reasonValue]);

    useEffect(() => {
        if (!reasons?.length) return;
        const parsedReasonsList = reasons.map((reason) => {
            return {
                label: reason?.name,
                value: reason?.uuid,
            };
        });
        setParsedReasons(parsedReasonsList);
    }, [reasons]);

    useEffect(() => {
        setReasonValue(parsedReasons[0]);
    }, [parsedReasons]);

    const handleAddReason = async (fieldName: string, description: string) => {
        try {
            const response = await createReason({
                name: fieldName,
                status: Status.Active,
                description,
            }).unwrap();
            if (response) {
                setReasonValue({
                    label: response.name,
                    value: response.uuid,
                });
                await fetchReasonTrigger();
                toast.success(`Reason ${fieldName} added successfully`);
            }
        } catch (error) {
            toast.error('Error adding Reason');
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: '20px', padding: '20px 30px' }}>
            <Box>
                <StyledTypography variant='subtitle2'>
                    Adjustment ID
                </StyledTypography>
                <StyledTextField
                    placeholder='SA-1256'
                    onChange={(e) => setAdjustmentId(e.target.value || '')}
                />
            </Box>
            <Box sx={{ width: '15%' }}>
                <StyledTypography variant='subtitle2'>Reason</StyledTypography>
                {parsedReasons.length > 0 && (
                    <AutocompleteSelectAndSearchOption
                        placeholder='Select Reason'
                        shouldRenderAddNewOption={true}
                        addButtonLabel='Reason'
                        handleAddNewOption={handleAddReason}
                        autoCompleteOptions={parsedReasons}
                        setFieldValue={setReasonValue}
                        fieldValue={reasonValue}
                        setSearchQuery={() => {
                            // intentional function
                        }}
                    />
                )}
            </Box>
            <Box>
                <StyledTypography variant='subtitle2'>
                    Add Note
                </StyledTypography>
                <StyledTextField
                    placeholder='Type something here...'
                    onChange={(e) => setAdjustmentNote(e.target.value || '')}
                />
            </Box>
        </Box>
    );
};

export default ReasonSection;
