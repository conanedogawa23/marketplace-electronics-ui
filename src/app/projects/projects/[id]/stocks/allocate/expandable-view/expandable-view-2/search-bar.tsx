import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Stack, styled } from '@mui/material';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
        padding: 0,
        transition: theme.transitions.create('width'),
    },
}));

export type SearchBarProps = {
    query: string;
    setQuery: (query: string) => void;
};

export const SerialNoSearchBar: React.FC<SearchBarProps> = ({
    query,
    setQuery,
}) => {
    return (
        <Stack
            component='label'
            direction='row'
            alignItems='center'
            mb={5}
            sx={(theme) => ({
                height: 44,
                padding: '10px 14px',
                borderRadius: theme.customSizes?.radius.sm,
                border: `1px solid ${theme.customColors?.border.primary.light}`,
            })}
        >
            <SearchIcon htmlColor='hsla(221, 13%, 46%, 1)' />
            <StyledInputBase
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
                sx={{ ml: 2, flex: 1, p: 0, fontSize: '16px' }}
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
            />
        </Stack>
    );
};

export default SerialNoSearchBar;
