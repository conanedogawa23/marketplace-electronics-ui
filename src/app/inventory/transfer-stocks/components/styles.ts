import { Button, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const StyledPurpleButton = styled(Button)(() => ({
    backgroundColor: '#C255D9',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 600,
}));
export const StyledWhiteButton = styled(Button)(() => ({
    backgroundColor: 'white',
    color: '#344054',
    textTransform: 'none',
    fontWeight: 600,
    border: '1px solid #D0D5DD',
    paddingX: '1.5rem',
}));
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
export const StyledTypographyChip = styled(Typography)(() => ({
    borderRadius: '10px',
    border: '1px solid #F7D2FF',
    background: '#FDF4FF',
    fontSize: '12px',
    width: '30px',
    color: '#AB41C2',
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

export const StyledPurpleOutlinedButton = styled(Button)(() => ({
    color: '#AB41C2',
    borderColor: '#C255D9',
    textTransform: 'none',
    padding: '5px',
    fontWeight: 600,
    width: '100px',
    border: '1px solid #C255D9',
}));
export const StyledButton = styled(Button)(() => ({
    backgroundColor: 'transparent',
    color: '#344054',
    fontWeight: 600,
    border: '1px solid #D0D5DD',
    fontSize: '14px',
    textTransform: 'none',
}));
export const StyledStraightLineBox = styled(Box)(() => ({
    width: '100%',
    border: '1px solid #D0D5DD',
}));

export const StyledTypoGraphyHeader = styled(Typography)(() => ({
    fontWeight: '600',
    fontSize: '16px',
}));
