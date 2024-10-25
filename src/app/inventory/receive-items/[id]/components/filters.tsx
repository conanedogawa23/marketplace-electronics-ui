import { Box, CircularProgress, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';

import { useGetWarehouseListQuery } from '@/lib/redux/warehouse/getWarehouses';

export type ReceiveItemDynamicPageFiltersProps = {
    selectedWarehouse: string;
    setSelectedWarehouse: React.Dispatch<React.SetStateAction<string>>;
};

const ReceiveItemDynamicPageFilters: React.FC<
    ReceiveItemDynamicPageFiltersProps
> = ({ selectedWarehouse, setSelectedWarehouse }) => {
    const { data, isFetching } = useGetWarehouseListQuery();

    const handleWarehouseSelect = (event: SelectChangeEvent) => {
        setSelectedWarehouse(event.target.value);
    };

    const loading = (
        <Box
            sx={{
                height: '200px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress color='secondary' />
        </Box>
    );

    return (
        <Box px={8} py={6}>
            <Typography fontWeight={500} fontSize={18}>
                Receive at
            </Typography>
            <Typography fontWeight={500} fontSize={14} mt={4} mb={2}>
                Warehouse
            </Typography>
            {isFetching ? (
                loading
            ) : (
                <Select
                    sx={{
                        width: '20%',
                        '& .MuiSelect-select': {
                            padding: '8px 16px',
                            borderRadius: '8px',
                        },
                    }}
                    value={selectedWarehouse}
                    onChange={handleWarehouseSelect}
                >
                    <MenuItem value={'none'}>None</MenuItem>
                    {data?.map((warehouse) => (
                        <MenuItem key={warehouse.uuid} value={warehouse.uuid}>
                            {warehouse.name}
                        </MenuItem>
                    ))}
                </Select>
            )}
        </Box>
    );
};

export default ReceiveItemDynamicPageFilters;
