'use client';

import { KeyboardBackspace } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    };
    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            component='main'
            sx={{ flexGrow: 1, overflow: 'hidden', mt: 8 }}
        >
            <Box display={'flex'} alignItems={'center'} px={8} sx={{ gap: 6 }}>
                <Button
                    onClick={handleGoBack}
                    variant='outlined'
                    // color='secondary'
                    sx={(theme) => ({
                        borderColor: theme.customColors?.border.primary.light,
                        color: theme.customColors?.text.secondary.light,
                    })}
                    startIcon={<KeyboardBackspace />}
                >
                    Back
                </Button>
                <Typography variant='h6'>New User</Typography>
            </Box>

            <Divider sx={{ mt: 8 }} />

            {children}
        </Box>
    );
};

export default UserLayout;
