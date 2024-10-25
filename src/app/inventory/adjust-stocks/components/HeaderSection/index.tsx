import { Box, Divider } from '@mui/material';
import { toast } from 'react-toastify';

import {
    StyledPurpleButton100px,
    StyledTypoGraphyHeader,
    StyledWhiteButton100px,
} from '../styles';

interface HeaderSectionProps {
    onCancel: () => void;
    onDone: () => void;
    products?: any;
}

export const HeaderSection = ({
    onCancel,
    onDone,
    products,
}: HeaderSectionProps) => {
    const checkForInvalidProducts = () => {
        if (!products?.length) return;
        const invalidProducts = products
            ?.filter((product: any) => !product.subLocation)
            .map((product: any) => product.name);
        if (invalidProducts?.length > 0) {
            toast.error(
                `Please check the adjustment changes for products provided, ${JSON.stringify(invalidProducts || [])}`,
            );
            return;
        }
        onDone();
    };
    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '28px',
                }}
            >
                <StyledTypoGraphyHeader>Adjust Stocks</StyledTypoGraphyHeader>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1',
                        justifyContent: 'flex-end',
                        gap: '1rem',
                    }}
                >
                    <StyledWhiteButton100px
                        variant='outlined'
                        onClick={onCancel}
                    >
                        Cancel
                    </StyledWhiteButton100px>
                    <StyledPurpleButton100px
                        variant='contained'
                        onClick={checkForInvalidProducts}
                    >
                        Done
                    </StyledPurpleButton100px>
                </Box>
            </Box>
            <Divider />
        </Box>
    );
};

export default HeaderSection;
