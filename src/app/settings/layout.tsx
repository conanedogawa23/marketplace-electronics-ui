'use client';

import { ScopedCssBaseline, ThemeProvider } from '@mui/material';

import { settingsTheme } from './utils/theme';

const SettingsLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    return (
        <ThemeProvider theme={settingsTheme}>
            <ScopedCssBaseline
                sx={{
                    flex: 1,
                    display: 'flex',
                    maxWidth: `calc(100vw - 283px)`,
                }}
            >
                {children}
            </ScopedCssBaseline>
        </ThemeProvider>
    );
};

export default SettingsLayout;
