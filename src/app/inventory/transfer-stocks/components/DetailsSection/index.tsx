import { Box } from '@mui/material';

import { StyledTextField, StyledTypography } from '../styles';

const DetailsSection = () => (
    <Box sx={{ display: 'flex', gap: '20px', padding: '20px 30px' }}>
        <Box>
            <StyledTypography variant='subtitle2'>Transfer ID</StyledTypography>
            <StyledTextField placeholder='TS-1256' />
        </Box>
        <Box>
            <StyledTypography variant='subtitle2'>Add Note</StyledTypography>
            <StyledTextField placeholder='Type something here...' />
        </Box>
    </Box>
);

export default DetailsSection;
