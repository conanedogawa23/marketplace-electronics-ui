import { Box, type SxProps, type Theme } from '@mui/material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    id?: string;
    sx?: SxProps<Theme>;
}

export function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, id, ...other } = props;

    return (
        <Box
            role='tabpanel'
            hidden={value !== index}
            id={`tab-panel-${id ?? index}`}
            aria-labelledby={`tab-panel-${id ?? index}`}
            {...other}
        >
            {value === index ? children : null}
        </Box>
    );
}

export default CustomTabPanel;
