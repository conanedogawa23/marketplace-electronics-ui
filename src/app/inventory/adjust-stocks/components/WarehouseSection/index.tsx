import { Box, MenuItem, Select, type SelectChangeEvent } from '@mui/material';

import { StyledHeaderTypography, StyledTypography } from '../styles';

export interface WarehouseSectionProps {
    warehouse: string;
    handleWarehouseSelect: (event: SelectChangeEvent) => void;
    warehouses: string[];
}

export const WarehouseSection = ({
    warehouse,
    handleWarehouseSelect,
    warehouses,
}: WarehouseSectionProps) => (
    <Box sx={{ padding: '10px 30px' }}>
        <StyledHeaderTypography>Receive at</StyledHeaderTypography>
        <Box sx={{ mt: 3 }}>
            <StyledTypography variant='subtitle2'>Warehouse</StyledTypography>
            <Select
                sx={{
                    width: '20%',
                    '& .MuiSelect-select': {
                        padding: '8px 16px',
                        borderRadius: '8px',
                    },
                }}
                value={warehouse}
                onChange={handleWarehouseSelect}
            >
                {warehouses.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    </Box>
);

export default WarehouseSection;
