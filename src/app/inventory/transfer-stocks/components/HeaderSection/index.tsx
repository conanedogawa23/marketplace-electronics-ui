import { Box } from '@mui/material';

import {
    StyledPurpleButton100px,
    StyledTypoGraphyHeader,
    StyledWhiteButton100px,
} from '../styles';

interface HeaderSectionProps {
    onCancel: () => void;
    onTransfer: () => void;
}

const HeaderSection = ({ onCancel, onTransfer }: HeaderSectionProps) => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '28px',
        }}
    >
        <StyledTypoGraphyHeader>Stock Transfer</StyledTypoGraphyHeader>
        <Box
            sx={{
                display: 'flex',
                flex: '1',
                justifyContent: 'flex-end',
                gap: '1rem',
            }}
        >
            <StyledWhiteButton100px variant='outlined' onClick={onCancel}>
                Cancel
            </StyledWhiteButton100px>
            <StyledPurpleButton100px variant='contained' onClick={onTransfer}>
                Transfer
            </StyledPurpleButton100px>
        </Box>
    </Box>
);

export default HeaderSection;
