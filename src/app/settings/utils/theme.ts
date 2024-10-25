import { createTheme } from '@mui/material';
import { Inter } from 'next/font/google';

import { COLORS } from './colors';

const inter = Inter({ subsets: ['latin'] });

export type ColorMode = {
    light: string;
    dark?: string;
};

export type CustomPaletteColor = ColorMode; // | string;

declare module '@mui/material/styles' {
    interface Theme {
        customColors?: {
            border: {
                primary: CustomPaletteColor;
                secondary: CustomPaletteColor;

                tertiary: CustomPaletteColor;
                disabled: CustomPaletteColor;
            };
            text: {
                white: CustomPaletteColor;
                primary: CustomPaletteColor;
                primary_on_brand: CustomPaletteColor;
                secondary: CustomPaletteColor;
                secondary_on_brand: CustomPaletteColor;
                tertiary: CustomPaletteColor;
                tertiary_on_brand: CustomPaletteColor;
                quaternary: CustomPaletteColor;
                placeholder: CustomPaletteColor;
                brand_primary: CustomPaletteColor;
                brand_secondary: CustomPaletteColor;
                brand_tertiary: CustomPaletteColor;
            };

            background: {
                bg_primary: CustomPaletteColor;
                bg_primary_alt: CustomPaletteColor;
                bg_primary_hover: CustomPaletteColor;
                bg_primary_solid: CustomPaletteColor;
                bg_secondary: CustomPaletteColor;
                bg_secondary_alt: CustomPaletteColor;
                bg_secondary_hover: CustomPaletteColor;
                bg_secondary_subtle: CustomPaletteColor;
                bg_secondary_solid: CustomPaletteColor;
                bg_tertiary: CustomPaletteColor;
                bg_brand_primary: CustomPaletteColor;
                bg_brand_primary_alt: CustomPaletteColor;
                bg_brand_secondary: CustomPaletteColor;
                bg_brand_solid: CustomPaletteColor;
                bg_brand_solid_hover: CustomPaletteColor;
            };
        };
        customSizes?: {
            radius: {
                // base 16px
                none: '0rem';
                xss: '0.125rem';
                xs: '0.25rem';
                sm: '0.375rem';
                md: '0.5rem';
                lg: '0.625rem';
                xl: '0.75rem';
                '2xl': '1rem';
                '3xl': '1.25rem';
                '4xl': '1.5rem';
                full: 'Infinity';
            };
        };
    }

    interface ThemeOptions {
        customColors?: {
            border: {
                primary: CustomPaletteColor;
                secondary: CustomPaletteColor;
                tertiary: CustomPaletteColor;
                disabled: CustomPaletteColor;
            };
            text: {
                white: CustomPaletteColor;
                primary: CustomPaletteColor;
                primary_on_brand: CustomPaletteColor;
                secondary: CustomPaletteColor;
                secondary_on_brand: CustomPaletteColor;
                tertiary: CustomPaletteColor;
                tertiary_on_brand: CustomPaletteColor;
                quaternary: CustomPaletteColor;
                placeholder: CustomPaletteColor;
                brand_primary: CustomPaletteColor;
                brand_secondary: CustomPaletteColor;
                brand_tertiary: CustomPaletteColor;
            };
            background: {
                bg_primary: CustomPaletteColor;
                bg_primary_alt: CustomPaletteColor;
                bg_primary_hover: CustomPaletteColor;
                bg_primary_solid: CustomPaletteColor;
                bg_secondary: CustomPaletteColor;
                bg_secondary_alt: CustomPaletteColor;
                bg_secondary_hover: CustomPaletteColor;
                bg_secondary_subtle: CustomPaletteColor;
                bg_secondary_solid: CustomPaletteColor;
                bg_tertiary: CustomPaletteColor;
                bg_brand_primary: CustomPaletteColor;
                bg_brand_primary_alt: CustomPaletteColor;
                bg_brand_secondary: CustomPaletteColor;
                bg_brand_solid: CustomPaletteColor;
                bg_brand_solid_hover: CustomPaletteColor;
            };
        };
        customSizes?: {
            /* base 16px */
            radius: {
                /* 0px */
                none: '0rem';
                /* 2px */
                xss: '0.125rem';
                /* 4px */
                xs: '0.25rem';
                /* 6px */
                sm: '0.375rem';
                /* 8px */
                md: '0.5rem';
                /* 8px */
                lg: '0.625rem';
                /*  10px */
                xl: '0.75rem';
                /*  12px */
                '2xl': '1rem';
                /*  16px */
                '3xl': '1.25rem';
                /*  24px */
                '4xl': '1.5rem';
                /*  999px */
                full: 'Infinity';
            };
        };
    }
}

export const settingsTheme = createTheme({
    spacing: 4,
    typography: {
        allVariants: {
            // Set Inter as the default font family
            fontFamily: inter.style.fontFamily,
        },
    },
    palette: {
        secondary: {
            main: COLORS.brand[700],
            light: COLORS.brand[50],
            dark: COLORS.brand[700],
            contrastText: COLORS.brand[200],
        },
    },
    customColors: {
        text: {
            white: { light: COLORS.base.white },

            // primary
            primary: {
                light: COLORS.gray[900],
                dark: COLORS.gray[50],
            },
            primary_on_brand: {
                light: COLORS.base.white,
                dark: COLORS.gray[50],
            },

            // secondary
            secondary: {
                light: COLORS.gray[700],
            },
            secondary_on_brand: {
                light: COLORS.brand[200],
            },

            // tertiary
            tertiary: {
                light: COLORS.gray[600],
            },
            tertiary_on_brand: {
                light: COLORS.brand[200],
            },

            // quaternary
            quaternary: {
                light: COLORS.gray[500],
            },

            // placeholder
            placeholder: { light: COLORS.gray[500] },

            // brand
            brand_primary: {
                light: COLORS.brand[900],
            },
            brand_secondary: {
                light: COLORS.brand[700],
            },
            brand_tertiary: {
                light: COLORS.brand[600],
            },
        },
        border: {
            primary: {
                light: COLORS.gray[300],
            },
            secondary: {
                light: COLORS.gray[200],
            },
            tertiary: {
                light: COLORS.gray[100],
            },
            disabled: {
                light: COLORS.gray[700],
            },
        },
        background: {
            bg_primary: {
                light: COLORS.base.white,
            },
            bg_primary_alt: {
                light: COLORS.base.white,
            },
            bg_primary_hover: {
                light: COLORS.gray[50],
            },
            bg_primary_solid: {
                light: COLORS.gray[950],
            },
            bg_secondary: {
                light: COLORS.gray[50],
            },
            bg_secondary_alt: {
                light: COLORS.gray[50],
            },
            bg_secondary_hover: {
                light: COLORS.gray[100],
            },
            bg_secondary_subtle: {
                light: COLORS.gray[25],
            },
            bg_secondary_solid: {
                light: COLORS.gray[600],
            },
            bg_tertiary: {
                light: COLORS.gray[100],
            },
            bg_brand_primary: {
                light: COLORS.brand[50],
            },
            bg_brand_primary_alt: {
                light: COLORS.brand[50],
            },
            bg_brand_secondary: {
                light: COLORS.brand[100],
            },
            bg_brand_solid: {
                light: COLORS.brand[600],
            },
            bg_brand_solid_hover: {
                light: COLORS.brand[600],
            },
        },
    },
    customSizes: {
        radius: {
            // base 16px

            /* 0px */
            none: '0rem',
            /* 2px */
            xss: '0.125rem',
            /* 4px */
            xs: '0.25rem',
            /* 6px */
            sm: '0.375rem',
            /* 8px */
            md: '0.5rem',
            /* 8px */
            lg: '0.625rem',
            /*  10px */
            xl: '0.75rem',
            /*  12px */
            '2xl': '1rem',
            /*  16px */
            '3xl': '1.25rem',
            /*  24px */
            '4xl': '1.5rem',
            /*  999px */
            full: 'Infinity',
        },
    },
    components: {
        MuiTabs: {
            styleOverrides: {
                root: {
                    minHeight: '32px', // Set the minimum height for the Tabs container
                    fontSize: '14px', // Set the font size for the Tabs container
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    minHeight: '32px', // Set the minimum height for each Tab
                    height: '32px', // Set the height for each Tab
                    fontSize: '14px', // Set the font size for the Tabs container
                    justifyContent: 'flex-start', // Align the text to the left
                },
            },
        },
    },
});

/**
 * Converts a pixel value to rem units based on the provided or default theme's root font size.
 *
 * @param px - The pixel value to be converted to rem.
 * @param theme - Optional custom MUI theme object to retrieve the root font size. Defaults to the default theme.
 * @returns The equivalent rem value as a string with 'rem' unit.
 */
export function pxToRem(px: number, theme = settingsTheme): string {
    const rootFontSize = theme.typography.htmlFontSize || 16; // Default to 16 if not set
    return `${(px / rootFontSize).toString()}rem`;
}
