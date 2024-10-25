import { styled, TextField } from '@mui/material';

export const CustomTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        height: '40px',
        '& input': {
            padding: '0',
        },
        '& fieldset': {
            // padding: '0px 8px',
            borderColor: theme.customColors?.border.secondary.light,
            borderRadius: theme.customSizes?.radius.md,
        },
        '&:hover fieldset': {
            borderColor: theme.customColors?.border.secondary.light,
            borderRadius: theme.customSizes?.radius.md,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.customColors?.border.secondary.light,
            borderRadius: theme.customSizes?.radius.md,
        },
        '& .MuiInputAdornment-root': {
            maxHeight: '40px',
            '& svg': {},
        },
    },
}));
