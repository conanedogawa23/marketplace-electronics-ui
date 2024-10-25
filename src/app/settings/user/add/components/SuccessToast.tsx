import { CheckCircleOutlined } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

export const SuccessToast = () => {
    return (
        <Stack direction={'row'} gap={2}>
            <Box>
                <CheckCircleOutlined color='success' />
            </Box>
            <Stack gap={1}>
                <Typography
                    variant='body2'
                    fontWeight={600}
                    sx={(theme) => {
                        return {
                            color: theme.customColors?.text.primary.light,
                        };
                    }}
                >
                    User created successfully
                </Typography>
                <Typography
                    variant='body2'
                    sx={(theme) => {
                        return {
                            color: theme.customColors?.text.secondary.light,
                        };
                    }}
                >
                    Update user details and permission in the user settings tab.
                </Typography>
            </Stack>
        </Stack>
    );
};

export default SuccessToast;
