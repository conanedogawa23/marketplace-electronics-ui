import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import type React from 'react';

interface LoadingProps {
    size?: number;
    color?:
        | 'error'
        | 'info'
        | 'inherit'
        | 'primary'
        | 'secondary'
        | 'success'
        | 'warning';
}

const Loading: React.FC<LoadingProps> = ({
    size = 40,
    color = 'secondary',
}) => {
    return (
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            minHeight='100vh'
        >
            <CircularProgress size={size} color={color} />
        </Box>
    );
};

export default Loading;
