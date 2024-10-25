'use client';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type React from 'react';
import { useState } from 'react';
import { z, type ZodObject, type ZodRawShape } from 'zod';

import AutocompleteWithAddOption from './AutocompleteAddDropdown';

export interface OptionType {
    label: string;
    value: string;
}

export interface Field {
    label: string;
    key: string;
    type: 'autocomplete' | 'text';
    options?: OptionType[];
    selectedOption?: OptionType;
    setSelectedOption?: (option: OptionType) => void;
    parentType: string;
    disabled: boolean;
}
export interface OptionFields {
    option: string;
    fields: Field[];
}
interface DynamicSelectProps {
    options: OptionFields[];
    selectedOption: string | undefined;
    fieldValues: Record<string, string>;
    onOptionChange: (newOption: string) => void;
    onFieldChange: (key: string, value: string, parentType: string) => void;
    setOpenAddLocationModal: (value: boolean) => void;
    onSubmit: () => void;
    setCurrentInputOption: (value: string) => void;
}
const StyledAutoComplete = styled(Autocomplete)({
    '& .MuiAutocomplete-inputRoot': {
        padding: '4px',
        border: 'none',
        borderRadius: '8px',
    },
    '& .MuiAutocomplete-input': {
        padding: '4px',
    },
});
export const DynamicSelect: React.FC<DynamicSelectProps> = ({
    options,
    selectedOption,
    fieldValues,
    onOptionChange,
    onFieldChange,
    setOpenAddLocationModal,
    onSubmit,
    setCurrentInputOption,
}) => {
    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const [errors, setErrors] = useState<Record<string, string>>({});
    const handleOptionChange = (event: any, newValue: string | null) => {
        if (newValue) {
            onOptionChange(newValue);
        }
    };
    const handleFieldChange = (
        key: string,
        value: string,
        parentType: string,
    ) => {
        onFieldChange(key, value, parentType);
    };
    // this function will basically generate a schema based on the selected option fields and return it
    // like if you select 'Company locations' then it will generate a schema with fields of 'Company locations'
    const generateSchema = (): ZodObject<ZodRawShape> => {
        const selectedFields = options.find(
            (opt) => opt.option === selectedOption,
        );
        if (!selectedFields) return z.object({});
        const fieldSchemas: ZodRawShape = {};
        selectedFields.fields.forEach((field) => {
            fieldSchemas[field.key] = z
                .string()
                .nonempty(`${field.label} is required`);
        });
        return z.object(fieldSchemas);
    };
    const handleSubmit = () => {
        const formData = {
            selectedOption,
            fields: fieldValues,
        };
        // const schema = generateSchema();
        // console.log(schema)
        // // it will validate the fields with the schema generated
        // const result = schema.safeParse(fieldValues);
        // console.log(result)
        // // if the result is not successful then it will set the errors and the errors will be saved in the newErrors object
        // if (!result.success) {
        //     const newErrors: Record<string, string> = {};
        //     result.error.errors.forEach((error) => {
        //         const path = error.path.join('.');
        //         newErrors[path] = error.message;
        //     });
        //     console.log('Form data is invalid:', newErrors);
        //     setErrors(newErrors);
        // } else {
        //     // if the result is successful then it will reset the errors and the user can submit the form data
        //     setErrors({});
        //     console.log('Form data is valid:', formData);
        //     onSubmit();
        // }
        onSubmit();
    };
    const renderAdditionalFields = () => {
        const selectedFields = options.find(
            (opt) => opt.option === selectedOption,
        );
        if (!selectedFields) return null;
        return selectedFields.fields.map((field) => (
            <Box key={field.key} mt={2}>
                <Typography
                    variant='subtitle1'
                    sx={{ color: '#344054', mb: '5px', fontWeight: '600' }}
                >
                    {capitalizeFirstLetter(field.label)}
                </Typography>
                {field.type === 'text' && (
                    <TextField
                        fullWidth
                        sx={{
                            '& .MuiInputBase-input': {
                                padding: '10px 20px',
                                borderRadius: '8px',
                            },
                        }}
                        value={fieldValues[field.key] || ''}
                        onChange={(e) =>
                            handleFieldChange(
                                field.key,
                                e.target.value,
                                'project',
                            )
                        }
                        error={!!errors[field.key]}
                        helperText={errors[field.key]}
                    />
                )}
                {field.type === 'autocomplete' && field.options && (
                    <AutocompleteWithAddOption
                        type={field.label}
                        autoCompleteOptions={field.options}
                        handleAddItemDetails={handleFieldChange}
                        setFieldValue={field.setSelectedOption}
                        fieldValue={field.selectedOption}
                        parentType={field.parentType}
                        disabled={field.disabled}
                        setCurrentInputOption={setCurrentInputOption}
                    />
                )}
            </Box>
        ));
    };
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <FormControl fullWidth>
                    <StyledAutoComplete
                        value={selectedOption}
                        onChange={(event, newValue) =>
                            handleOptionChange(event, newValue as string)
                        }
                        options={options.map((option) => option.option)}
                        isOptionEqualToValue={(option, value) =>
                            option === value
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                error={!!errors.selectedOption}
                                helperText={errors.selectedOption}
                            />
                        )}
                    />
                </FormControl>
                {renderAdditionalFields()}
                <Divider sx={{ marginY: '16px' }} />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '10px',
                    }}
                >
                    <Button
                        onClick={() => setOpenAddLocationModal(false)}
                        sx={{
                            paddingX: '14px',
                            borderRadius: '6px',
                            backgroundColor: 'white',
                            color: '#344054',
                            border: '1px solid #D0D5DD',
                            textTransform: 'none',
                            fontWeight: 600,
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant='contained'
                        sx={{
                            paddingX: '14px',
                            borderRadius: '6px',
                            backgroundColor: '#AB41C2',
                            color: '#FFFFFF',
                            textTransform: 'none',
                            fontWeight: 600,
                        }}
                    >
                        Apply
                    </Button>
                </Box>
            </Box>
        </>
    );
};
