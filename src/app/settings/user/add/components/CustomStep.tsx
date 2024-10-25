import { Step } from '@mui/material';
import { styled } from '@mui/system';

export const CustomStep = styled(Step)({
    '& .MuiStepLabel-root .MuiStepLabel-label': {
        color: 'grey', // Default label text color
    },

    '& .MuiStepLabel-root .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel':
        {
            color: 'hsla(289, 51%, 51%, 1)', // Active alternative label text color
        },

    '&.Mui-completed .MuiStepLabel-root .MuiStepLabel-label': {
        color: 'hsla(289, 51%, 51%, 1)', // Completed label text color
    },

    '& .MuiStepIcon-root.Mui-active': {
        color: 'hsla(289, 51%, 51%, 1)', // Change the active step circle color
    },

    '& .MuiStepIcon-root.Mui-completed': {
        color: 'hsla(289, 51%, 51%, 1)', // Change the completed step circle color
    },

    '& .Mui-active .MuiStepConnector-line': {
        borderColor: 'hsla(289, 51%, 51%, 1)', // Change the active step connector line color
    },

    '& .Mui-completed .MuiStepConnector-line': {
        borderColor: 'hsla(289, 51%, 51%, 1)', // Change the completed step connector line color
    },
});
