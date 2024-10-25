'use client';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    ListItem,
    ListItemText,
    Paper,
    Popper,
    TextField,
    Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import type React from 'react';
import { useEffect, useState } from 'react';

interface OptionType {
    label: string;
    value: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    borderRadius: '8px',
    padding: '10px',
}));
const StyledTypographyLabel = styled(Typography)(({ theme }) => ({
    fontWeight: '500',

    color: '#344054',
    marginBottom: '4px',
}));
const StyledTextfieLdSmall = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
        fontWeight: 500,
        padding: ' 8px',
        borderRadius: '8px',
        fontSize: '16px',
        border: '1px solid #D0D5DD',
        width: '350px',
        marginBottom: '20px',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none',
        },
    },
}));
const StyledFlexBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    justifyContent: 'flex-end',
    marginTop: '16px',
}));
const StyledWhiteButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'white',
    color: '#344054',
    textTransform: 'none',
    fontWeight: 600,
    width: '100px',
    border: '1px solid #D0D5DD',
    paddingX: '1.5rem',
    borderRadius: '8px',
}));
const StyledPurpleButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#C255D9',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 600,
    width: '100px',
    borderRadius: '8px',
}));
interface AutocompleteWithAddOptionProps {
    type: string;
    autoCompleteOptions: OptionType[];
    handleAddItemDetails: (
        fieldName: string,
        description: string,
        parentType: string,
    ) => void;
    setFieldValue?: any;
    fieldValue?: OptionType;
    parentType: string;
    disabled: boolean;
    setCurrentInputOption: (type: string) => void;
}
const AutocompleteWithAddOption: React.FC<AutocompleteWithAddOptionProps> = ({
    type,
    autoCompleteOptions,
    handleAddItemDetails,
    setFieldValue,
    fieldValue,
    parentType,
    disabled,
    setCurrentInputOption,
}) => {
    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const capitalizedType = capitalizeFirstLetter(type);
    const [description, setDescription] = useState<string>('');
    const [fieldName, setFieldName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [source, setSource] = useState<string>('');

    const [options, setOptions] = useState<OptionType[]>(
        autoCompleteOptions as OptionType[],
    );
    const [inputValue, setInputValue] = useState('');
    // const [value, setValue] = useState<OptionType | null>(null);
    const [open, setOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);

    const handleOpenDialog = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };
    useEffect(() => {
        setOptions([...autoCompleteOptions]);
    }, [autoCompleteOptions]);
    const handleAddOption = () => {
        const newOptionObject = {
            label: fieldName,
            value: fieldName,
        };
        setOptions([newOptionObject, ...autoCompleteOptions]);
        handleCloseDialog();
        handleAddItemDetails(fieldName, email, source);
    };

    return (
        <>
            <Autocomplete
                fullWidth
                sx={{
                    '& .MuiOutlinedInput-root': {
                        padding: 0,
                        '& fieldset': {
                            border: 'none',
                        },
                    },
                    '& .MuiAutocomplete-inputRoot': {
                        padding: 0,
                        border: '1px solid #D0D5DD',
                        borderRadius: '8px',
                    },
                    '& .MuiInputBase-input': {
                        padding: 0,
                    },
                }}
                options={[
                    { label: 'Add New Option', value: 'add-new' },
                    ...options,
                ]}
                value={fieldValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                getOptionLabel={(option) => option?.label}
                onChange={(event, newValue) => {
                    if (newValue === null) {
                        console.log('type', type);
                        setFieldValue({ label: '', value: '' });
                    } else if (newValue?.value === 'add-new') {
                        handleOpenDialog();
                    } else {
                        // setValue(newValue);
                        console.log('this is also running');
                        setFieldValue(newValue as OptionType);
                    }
                    setOpenDropdown(false);
                }}
                inputValue={inputValue}
                renderInput={(params) => (
                    <TextField {...params} variant='outlined' />
                )}
                renderOption={(props, option) => (
                    <ListItem
                        {...props}
                        key={option.value}
                        value={option.value}
                        onClick={() => {
                            if (option.value === 'add-new') {
                                handleOpenDialog();
                            } else {
                                // setValue(option);
                                setFieldValue(option);
                            }
                            setOpenDropdown(false);
                        }}
                    >
                        {option.value === 'add-new' ? (
                            <>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        border: '1px solid #F3BDFF',
                                        width: '100%',
                                        padding: '6px',
                                        borderRadius: '8px',
                                    }}
                                >
                                    <AddCircleOutlineIcon
                                        sx={{
                                            fontWeight: '600',
                                            color: '#AB41C2',
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontWeight: '600',
                                            color: '#AB41C2',
                                        }}
                                    >
                                        Add {capitalizedType}
                                    </Typography>
                                </Box>
                            </>
                        ) : (
                            <ListItemText
                                sx={{ pr: 4 }}
                                primary={option.label}
                            />
                        )}
                    </ListItem>
                )}
                open={openDropdown}
                onOpen={() => setOpenDropdown(true)}
                onClose={() => setOpenDropdown(false)}
                PopperComponent={(props) => (
                    <Popper
                        sx={(theme) => ({
                            borderRadius: '8px',
                            backgroundColor: theme.palette.background.paper,
                            boxShadow: '0 4px 4px rgba(0, 0, 0, 0.1)',
                        })}
                        {...props}
                    />
                )}
                PaperComponent={(props) => <StyledPaper {...props} />}
                disabled={disabled}
            />
            <Dialog open={open} maxWidth='lg' onClose={handleCloseDialog}>
                <DialogTitle>
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <StyledTypographyLabel sx={{ fontSize: '18px' }}>
                            New {capitalizedType}
                        </StyledTypographyLabel>
                        <IconButton onClick={handleCloseDialog}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <StyledTypographyLabel>
                        {capitalizedType} Name
                    </StyledTypographyLabel>
                    <StyledTextfieLdSmall
                        type='text'
                        fullWidth
                        onChange={(e) => {
                            setFieldName(e.target.value);
                        }}
                    />
                    <StyledTypographyLabel>
                        {capitalizedType} Email
                    </StyledTypographyLabel>
                    <StyledTextfieLdSmall
                        type='text'
                        fullWidth
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <StyledTypographyLabel>
                        {capitalizedType} Source
                    </StyledTypographyLabel>
                    <StyledTextfieLdSmall
                        type='text'
                        fullWidth
                        onChange={(e) => {
                            setSource(e.target.value);
                        }}
                    />
                    <StyledFlexBox>
                        <StyledWhiteButton
                            onClick={handleCloseDialog}
                            variant='outlined'
                        >
                            Cancel
                        </StyledWhiteButton>
                        <StyledPurpleButton
                            onClick={handleAddOption}
                            variant='contained'
                        >
                            Add
                        </StyledPurpleButton>
                    </StyledFlexBox>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AutocompleteWithAddOption;
