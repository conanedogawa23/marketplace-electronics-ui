'use client';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
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
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/system';
import { debounce } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

interface OptionType {
    label: string;
    value: string;
}

const StyledPaper = styled(Paper)(() => ({
    borderRadius: '8px',
    padding: '10px',
}));
const StyledTypographyLabel = styled(Typography)(() => ({
    fontWeight: '500',

    color: '#344054',
    marginBottom: '4px',
}));
const StyledTextfieLdSmall = styled(TextField)(() => ({
    '& .MuiInputBase-input': {
        fontWeight: 500,
        padding: ' 8px',
        borderRadius: '8px',
        fontSize: '16px',
        border: '1px solid #D0D5DD',
        width: '350px',
        marginBottom: '20px',
        paddingX: '16px',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none',
        },
    },
}));
const StyledFlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    justifyContent: 'flex-end',
    marginTop: '16px',
}));
const StyledWhiteButton = styled(Button)(() => ({
    backgroundColor: 'white',
    color: '#344054',
    textTransform: 'none',
    fontWeight: 600,
    width: '100px',
    border: '1px solid #D0D5DD',
    paddingX: '1.5rem',
    borderRadius: '8px',
}));
const StyledPurpleButton = styled(Button)(() => ({
    backgroundColor: '#C255D9',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 600,
    width: '100px',
    borderRadius: '8px',
}));
interface AutocompleteSelectAndSearchOptionProps {
    placeholder: string;
    shouldRenderAddNewOption: boolean;
    addButtonLabel?: string; // Add Button Label
    autoCompleteOptions: OptionType[];
    handleAddNewOption?: (fieldName: string, description: string) => void;
    setFieldValue?: any;
    fieldValue?: OptionType;
    setSearchQuery: any;
    width?: string;
}
const AutocompleteSelectAndSearchOption: React.FC<
    AutocompleteSelectAndSearchOptionProps
> = ({
    placeholder,
    shouldRenderAddNewOption,
    addButtonLabel,
    autoCompleteOptions,
    handleAddNewOption,
    setFieldValue,
    fieldValue,
    setSearchQuery,
    width,
}) => {
    const [openDropdown, setOpenDropdown] = useState(false);

    const debouncedSearch = useMemo(
        () =>
            debounce((query: string) => {
                console.log(query);
                setSearchQuery?.(query);
            }, 200),
        [setSearchQuery],
    );
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setInputValue(query);
        debouncedSearch(query);
    };

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    const capitalizedType = capitalizeFirstLetter(
        addButtonLabel && shouldRenderAddNewOption ? addButtonLabel : '',
    );
    const [description, setDescription] = useState<string>('');
    const [fieldName, setFieldName] = useState<string>('');

    const [options, setOptions] = useState<OptionType[]>(
        autoCompleteOptions as OptionType[],
    );
    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);

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
        if (handleAddNewOption && shouldRenderAddNewOption) {
            handleAddNewOption(fieldName, description);
        }
    };
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, [debouncedSearch]);

    return (
        <>
            <Autocomplete
                fullWidth
                isOptionEqualToValue={(option, value) => {
                    return true;
                }}
                sx={{
                    width: width || '100%',
                    '& .MuiOutlinedInput-root': {
                        padding: 0,
                        '& fieldset': {
                            border: 'none',
                        },
                    },
                    '& .MuiAutocomplete-inputRoot': {
                        paddingX: '10px',
                        border: '1px solid #D0D5DD',
                        borderRadius: '8px',
                    },
                    '& .MuiInputBase-input': {
                        padding: 0,
                    },
                }}
                options={[
                    ...(shouldRenderAddNewOption
                        ? [{ label: 'Add New Option', value: 'add-new' }]
                        : []),
                    ...autoCompleteOptions,
                ]}
                value={fieldValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                getOptionLabel={(option) => option.label}
                onChange={(event, newValue) => {
                    if (newValue?.value === 'add-new') {
                        handleOpenDialog();
                    } else {
                        // setValue(newValue);
                        setFieldValue(newValue as OptionType);
                    }
                    setOpenDropdown(false);
                }}
                inputValue={inputValue}
                renderInput={(params) => (
                    <TextField
                        placeholder={placeholder}
                        {...params}
                        variant='outlined'
                        onChange={handleInputChange}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
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
                        {option.value === 'add-new' &&
                        shouldRenderAddNewOption ? (
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
                            console.log(e.target.value);
                            setFieldName(e.target.value);
                        }}
                    />
                    <StyledTypographyLabel>
                        {capitalizedType} Description
                    </StyledTypographyLabel>
                    <StyledTextfieLdSmall
                        type='text'
                        fullWidth
                        onChange={(e) => {
                            console.log(e.target.value);
                            setDescription(e.target.value);
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

export default AutocompleteSelectAndSearchOption;
