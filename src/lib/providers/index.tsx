'use client';

/* Core */
import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { usePathname } from 'next/navigation';
import { Provider } from 'react-redux';

import { settingsTheme } from '@/app/settings/utils/theme';

/* Instruments */
import { reduxStore } from '@/lib/redux';
import { AuthInitializer } from '@/lib/redux/auth/auth-initializer';

export const Providers = (props: React.PropsWithChildren) => {
    const pathname = usePathname();
    const isItemDetailsRoute = pathname.startsWith('/item-details');
    return (
        <Provider store={reduxStore}>
            <AppRouterCacheProvider>
                <ThemeProvider theme={settingsTheme}>
                    {isItemDetailsRoute ? (
                        props.children
                    ) : (
                        <AuthInitializer>{props.children}</AuthInitializer>
                    )}
                </ThemeProvider>
            </AppRouterCacheProvider>
        </Provider>
    );
};
