'use client';

import { Button, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export const Header = () => {
    const router = useRouter();
    return (
        <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography
                component={'h1'}
                fontWeight={'500'}
                fontSize={20}
                lineHeight={'30px'}
            >
                Receive Items
            </Typography>
            <Button
                size='small'
                variant='outlined'
                color='inherit'
                sx={(theme) => ({
                    borderColor: theme.customColors?.border.primary.light,
                    fontWeight: 600,
                    textTransform: 'none',
                })}
                onClick={() => router.push('/inventory/receive-items')}
            >
                Cancel
            </Button>
        </Stack>
    );
};

export default Header;
