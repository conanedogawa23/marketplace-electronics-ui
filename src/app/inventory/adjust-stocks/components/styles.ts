import { Button, styled, TextField, Typography } from '@mui/material';

export const StyledWhiteButton100px = styled(Button)(() => ({
    backgroundColor: 'white',
    color: '#344054',
    textTransform: 'none',
    fontWeight: 600,
    border: '1px solid #D0D5DD',
    width: '100px',
}));

export const StyledPurpleButton100px = styled(Button)(() => ({
    backgroundColor: '#C255D9',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 600,
    width: '100px',
}));

export const StyledTypography = styled(Typography)(() => ({
    fontWeight: '500',
    color: '#344054',
    marginBottom: '4px',
}));

export const StyledTextField = styled(TextField)(() => ({
    '& .MuiOutlinedInput-root': {
        padding: '0px',
        borderRadius: '8px',
    },
    '& .MuiInputBase-input': {
        padding: '8px 10px',
        borderRadius: '8px',
    },
}));

export const StyledHeaderTypography = styled(Typography)(() => ({
    fontWeight: '600',
    fontSize: '16px',
    color: '#101828',
}));

export const StyledPurpleOutlinedButton = styled(Button)(() => ({
    color: '#AB41C2',
    borderColor: '#C255D9',
    textTransform: 'none',
    padding: '5px',
    fontWeight: 600,
    width: '100px',
    border: '1px solid #C255D9',
}));

export const StyledTypoGraphyHeader = styled(Typography)(() => ({
    fontWeight: '600',
    fontSize: '16px',
}));
