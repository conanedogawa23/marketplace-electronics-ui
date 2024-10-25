import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import NoWarehouseIcon from '../../../../../public/assets/no-warehouse-icon.png';

interface NoSelectNoDataProps {
    mainText: string;
    helperText: string;
}

const NoSelectNoData: React.FC<NoSelectNoDataProps> = ({
    mainText,
    helperText,
}) => {
    return (
        <Box
            sx={{
                marginTop: '26px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '80vh',
                gap: '10px',
            }}
        >
            <Image src={NoWarehouseIcon} alt='No warehouse icon' />
            <Typography
                variant='h5'
                sx={{ color: '#344054', fontWeight: 600, textAlign: 'center' }}
            >
                {mainText}
            </Typography>
            <Typography
                variant='subtitle1'
                sx={{ color: '#98A2B3', textAlign: 'center' }}
            >
                {helperText}
            </Typography>
        </Box>
    );
};

export default NoSelectNoData;
