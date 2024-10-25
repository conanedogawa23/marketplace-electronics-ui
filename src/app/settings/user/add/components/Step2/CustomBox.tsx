import { Box, styled } from '@mui/material';

import { pxToRem } from '@/app/settings/utils/theme';

export const CustomBox = styled(Box)(({ theme }) => ({
    border: `1px solid ${theme.customColors?.border.secondary.light}`,
    borderRadius: theme.customSizes?.radius.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    padding: pxToRem(4),
    paddingRight: pxToRem(8),
}));
