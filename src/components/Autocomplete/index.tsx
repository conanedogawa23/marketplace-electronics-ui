import SearchIcon from '@mui/icons-material/Search';
import MUIAutocomplete, {
    type AutocompleteChangeDetails,
    type AutocompleteChangeReason,
    type AutocompleteInputChangeReason,
} from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const StyledMUIAutoComplete = styled(MUIAutocomplete)({
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

export interface AutocompleteProps<T> {
    placeholder?: string;
    notFoundText?: string;

    options: T[];

    getOptionLabel?: (option: T) => string;

    value?: T;
    onChange?:
        | ((
              event: React.SyntheticEvent<Element, Event>,
              value: T,
              reason: AutocompleteChangeReason,
              details?: AutocompleteChangeDetails<T> | undefined,
          ) => void)
        | undefined;

    inputValue?: string;
    onInputChange?:
        | ((
              event: React.SyntheticEvent<Element, Event>,
              value: string,
              reason: AutocompleteInputChangeReason,
          ) => void)
        | undefined;

    isOptionEqualToValue?: (option: T, value: T) => boolean;
}

export function Autocomplete<T>({
    options,
    getOptionLabel,
    value,
    onChange,

    inputValue,
    onInputChange,
    isOptionEqualToValue,
    placeholder,
    notFoundText,
}: React.PropsWithChildren<AutocompleteProps<T>>) {
    return (
        <StyledMUIAutoComplete
            id='free-solo-2-demo'
            fullWidth
            // freeSolo
            // disableClearable
            // autoComplete
            // includeInputInList
            // filterSelectedOptions
            noOptionsText={notFoundText}
            value={value}
            isOptionEqualToValue={
                isOptionEqualToValue as (
                    option: unknown,
                    value: unknown,
                ) => boolean
            }
            onChange={
                onChange as (
                    event: React.SyntheticEvent<Element, Event>,
                    value: unknown,
                    reason: AutocompleteChangeReason,
                    details?: AutocompleteChangeDetails<unknown> | undefined,
                ) => void
            }
            filterOptions={(x) => x}
            options={options}
            getOptionLabel={
                getOptionLabel as ((option: unknown) => string) | undefined
            }
            inputValue={inputValue}
            onInputChange={onInputChange}
            renderInput={(params) => (
                <StyledTextField
                    {...params}
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
    );
}

export default Autocomplete;
