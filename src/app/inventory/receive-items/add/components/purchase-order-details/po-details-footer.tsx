import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPurpleButton = styled(Button)(() => ({
    backgroundColor: '#C255D9',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 600,
    width: '100px',
}));

const StyledWhiteButton = styled(Button)(() => ({
    backgroundColor: 'white',
    color: '#344054',
    textTransform: 'none',
    fontWeight: 600,
    width: '100px',
    border: '1px solid #D0D5DD',
    paddingX: '1.5rem',
}));

export type PODetailsFooterProps = {
    onNext: () => void;
};
const handleBackClick = () => {
    console.log('Back button clicked');
    window.history.back();
};

export const PODetailsFooter: React.FC<PODetailsFooterProps> = ({ onNext }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 24px',
            }}
        >
            <StyledWhiteButton onClick={handleBackClick}>
                Back
            </StyledWhiteButton>
            <StyledPurpleButton variant='contained' onClick={onNext}>
                Receive
            </StyledPurpleButton>
        </Box>
    );
};

export default PODetailsFooter;
