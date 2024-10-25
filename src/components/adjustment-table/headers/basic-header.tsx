import { Typography } from '@mui/material';
import { type HeaderContext } from '@tanstack/react-table';

export function Header<TData, TValue>(props: {
    info: HeaderContext<TData, TValue>;
    children: React.ReactNode;
}) {
    return <Typography variant='caption'>{props.children}</Typography>;
}
