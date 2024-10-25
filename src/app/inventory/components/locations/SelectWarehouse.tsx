'use client';

import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import type React from 'react';
import { useState } from 'react';

import { type OptionType } from './DynamicSelect';

const StyledAutoComplete = styled(Autocomplete)({
    '& .MuiAutocomplete-inputRoot': {
        paddingLeft: '10px',
        border: '1px solid #D0D5DD',
        borderRadius: '6px',
        fontWeight: 600,
        height: '36px',
        backgroundColor: 'transparent',
    },
    '& .MuiAutocomplete-input': {
        padding: '0px',
        fontWeight: 'bold',
        border: 'none',
        backgroundColor: 'transparent',
    },
});

type AutocompleteNewProps = {
    warehouseOptions: OptionType[];
    handleOptionChange: (
        event: React.SyntheticEvent,
        value: OptionType | null,
    ) => void;
};

const AutocompleteNew: React.FC<AutocompleteNewProps> = ({
    warehouseOptions,
    handleOptionChange,
}) => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    return (
        <>
            <FormControl
                sx={{
                    width: '220px',
                }}
            >
                <StyledAutoComplete
                    fullWidth
                    options={warehouseOptions}
                    onChange={(event, value) => {
                        const newValue = value as OptionType | null;
                        handleOptionChange(event, newValue);
                    }}
                    isOptionEqualToValue={(option, value) => option === value}
                    renderInput={(params) => (
                        <TextField
                            placeholder={'Select Warehouse'}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#D0D5DD',
                                        paddingLeft: '6px',
                                        fontWeight: 600,
                                    },
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    color: '#344054',
                                    opacity: 1,
                                    fontWeight: 600,
                                    fontSize: '14px',
                                },
                            }}
                            {...params}
                            error={!!errors.selectedOption}
                            helperText={errors.selectedOption}
                        />
                    )}
                />
            </FormControl>
        </>
    );
};

export default AutocompleteNew;
