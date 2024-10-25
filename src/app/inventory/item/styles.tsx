'use client';

import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledWhiteButton = styled(Button)(({ theme }) => ({
    backgroundColor: 'white',
    color: '#344054',
    textTransform: 'none',
    fontWeight: 600,
    width: '100px',
    border: '1px solid #D0D5DD',
    paddingX: '1.5rem',
    borderRadius: '8px',
}));
export const StyledHeaderTypography = styled(Typography)(({ theme }) => ({
    fontWeight: '600',
    fontSize: '18px',
    color: '#101828',
}));
export const StyledPurpleOutlinedButton = styled(Button)(({ theme }) => ({
    color: '#AB41C2',
    borderColor: '#C255D9',
    textTransform: 'none',
    padding: '5px',
    fontWeight: 600,
    width: '100px',
    border: '1px solid #C255D9',
    borderRadius: '8px',
}));
export const StyledPurpleButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#C255D9',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 600,
    width: '100px',
    borderRadius: '8px',
}));

export const StyledTypographyLabel = styled(Typography)(({ theme }) => ({
    fontWeight: '500',
    color: '#344054',
    marginBottom: '4px',
}));
export const StyledTextfieLdSmall = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
        fontWeight: 500,
        padding: ' 8px',
        borderRadius: '8px',
        fontSize: '16px',
        border: '1px solid #D0D5DD',
        marginBottom: '12px',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none',
        },
    },
}));
export const StyledPurpleFullWidthButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#FDF4FF',
    color: '#AB41C2',
    textTransform: 'none',
    fontWeight: 600,
    width: '100%',
    borderRadius: '8px',
    padding: '6px',
    marginBottom: '10px',
}));

export const StyledFlexBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
}));
export const StyledFlexBoxSpaceBetween = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const StyledAttachmentBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '150px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    border: '1px solid #EAECF0',
    borderRadius: '8px',
    position: 'relative',
    cursor: 'pointer',
    backgroundColor: 'white',
    '&:hover': {
        backgroundColor: '#f5f5f5',
    },
    overflow: 'hidden',
}));
export const StyledSelectedAttachmentBox = styled(Box)(({ theme }) => ({
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #EAECF0',
    cursor: 'pointer',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: '8px',
    borderRadius: '8px',
    overflow: 'hidden',
}));
