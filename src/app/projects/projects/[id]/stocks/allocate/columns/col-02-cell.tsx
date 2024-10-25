import { Avatar, Box, Stack, Typography } from '@mui/material';
import { type CellContext } from '@tanstack/react-table';

import { type Product } from '@/lib/redux/products/types';

import { type AllocationAdjustmentTableData } from '../../../../types';

export const Col02Cell = ({
    info,
}: {
    info: CellContext<AllocationAdjustmentTableData, Product>;
}) => {
    return (
        <Stack direction='row' spacing={3}>
            <Box>
                <Avatar sx={{ width: 40, height: 40 }} />
            </Box>
            <Box>
                <Typography
                    variant='body1'
                    fontWeight={500}
                    sx={(theme) => ({
                        color: theme.customColors?.text.primary.light,
                    })}
                >
                    {info.getValue().name}
                </Typography>
                <Typography
                    variant='body2'
                    fontWeight={400}
                    sx={(theme) => ({
                        color: theme.customColors?.text.tertiary.light,
                    })}
                >
                    {info.getValue().uuid}
                </Typography>
            </Box>
        </Stack>
    );
};
