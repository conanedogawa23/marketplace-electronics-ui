import Box from '@mui/material/Box';

const AdjustStocksLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <Box component='main' sx={{ flexGrow: 1, padding: 3 }}>
            {children}
        </Box>
    );
};

export default AdjustStocksLayout;
