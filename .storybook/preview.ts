import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { Preview, ReactRenderer } from '@storybook/react';

import { baseTheme } from '../src/styles/theme';
import { settingsTheme } from './../src/app/settings/utils/theme';

// Import your custom theme configs

const preview: Preview = {
    // ...
    parameters: {
        // ...
        nextjs: {
            appDirectory: true,
        },
    },

    decorators: [
        withThemeFromJSXProvider<ReactRenderer>({
            themes: {
                typography: baseTheme,
                settings: settingsTheme,
            },
            defaultTheme: 'settings',
            Provider: ThemeProvider,
            GlobalStyles: CssBaseline,
        }),
    ],

    tags: ['autodocs'],
};

export default preview;
