import { createTheme, type Theme } from '@mui/material';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const baseTheme: Theme = createTheme({
    typography: {
        allVariants: {
            fontFamily: inter.style.fontFamily,

            fontWeight: 400,
        }, // Set Inter as the default font family
    },
    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none', // Removes underline from all Links
                },
            },
        },
    },
    // Add other Material-UI theme customizations here (optional)
});
