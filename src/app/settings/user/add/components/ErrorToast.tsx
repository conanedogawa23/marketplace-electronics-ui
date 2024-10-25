import { ErrorOutlineTwoTone } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

export type ErrorToastProps = {
    message: string;
};
export const ErrorToast: React.FC<ErrorToastProps> = ({ message }) => {
    return (
        <Stack direction={'row'} gap={2}>
            <Box>
                <ErrorOutlineTwoTone color='error' />
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
                    User creation failed
                </Typography>
                <Typography
                    variant='body2'
                    sx={(theme) => {
                        return {
                            color: theme.customColors?.text.secondary.light,
                        };
                    }}
                >
                    {message}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default ErrorToast;
