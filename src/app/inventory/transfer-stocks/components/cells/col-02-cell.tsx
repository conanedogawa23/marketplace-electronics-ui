import { Avatar, Box, Stack, Typography } from '@mui/material';

export interface Col02CellProps {
    name: string;
    id: string;
}

export function Col02Cell(props: Readonly<Col02CellProps>) {
    const { name, id } = props;
    return (
        <Stack direction='row' spacing={3} key={id}>
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
                    {name}
                </Typography>
                <Typography
                    variant='body2'
                    fontWeight={400}
                    sx={(theme) => ({
                        color: theme.customColors?.text.tertiary.light,
                    })}
                >
                    {id}
                </Typography>
            </Box>
        </Stack>
    );
}
