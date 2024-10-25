import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { usePathname, useRouter } from 'next/navigation';
import type * as React from 'react';

interface AutocompleteProps {
    width: string;
    navigateOnSelect?: boolean;
    options: any[];
    placeholder?: string;
    setSearchQuery?: any;
    setSelectFilter?: any;
}
const StyledAutoComplete = styled(Autocomplete)({
    '& .MuiAutocomplete-inputRoot': {
        padding: '1px 1px 1px 10px',
        border: 'none',
        borderRadius: '8px',
    },
});
const StyledTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#D0D5DD',
        },
        '&:hover fieldset': {
            borderColor: '#D0D5DD',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#AB41C2',
        },
    },
});

export const AutocompleteNew: React.FC<AutocompleteProps> = ({
    width,
    navigateOnSelect,
    options,
    placeholder,
    setSearchQuery,
    setSelectFilter,
}) => {
    const pathName = usePathname();
    const router = useRouter();

    const handleSearch: React.ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (event) => {
        const query = event.target.value;
        setSearchQuery?.(query);
    };

    const handleSelect = (event: any, value: any) => {
        console.log('value', value);
        setSelectFilter?.(value);
    };
    return (
        <Box sx={{ width: width }}>
            <StyledAutoComplete
                freeSolo
                id='free-solo-2-demo'
                disableClearable
                onChange={handleSelect}
                options={options}
                renderInput={(params) => (
                    <StyledTextField
                        {...params}
                        onChange={handleSearch}
                        placeholder={placeholder}
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
            />
        </Box>
    );
};
export default AutocompleteNew;
