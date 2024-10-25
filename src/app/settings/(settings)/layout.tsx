'use client';

import { Box, Tab, Tabs, Typography } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function a11yProps(index: number) {
    return {
        id: `settings-tab-${index}`,
        'aria-controls': `settings-tabpanel-${index}`,
    };
}

interface TabData {
    label: string;
    value: string;
}

const TABS = {
    account: 'account',
    display: 'display',
    users: 'users',
    notification: 'notification',
    security: 'security',
} as const;

const tabs: TabData[] = [
    // {
    //     label: 'Account',
    //     value: TABS.account,
    // },
    // {
    //     label: 'Display',
    //     value: TABS.display,
    // },
    {
        label: 'Users',
        value: TABS.users,
    },
    // {
    //     label: 'Notification',
    //     value: TABS.notification,
    // },
    // {
    //     label: 'Security',
    //     value: TABS.security,
    // },
];

const SettingsLayout: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const pathname = usePathname();
    const activeTab = pathname.split('/').pop() ?? TABS.users;

    return (
        <Box
            component='main'
            sx={{
                flex: 1,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                mt: 8,
            }}
        >
            <Typography
                variant='h6'
                height={'28px'}
                fontWeight={600}
                fontSize={'20px'}
                lineHeight={'28px'}
                sx={{
                    flexShrink: 0,
                    px: 6,
                }}
            >
                Settings
            </Typography>
            <Box
                mt={8}
                sx={{
                    flexShrink: 0,
                    height: '32px',
                    px: 6,
                }}
            >
                <Tabs
                    value={activeTab}
                    role='navigation'
                    aria-label='Settings navigation tabs'
                    indicatorColor='secondary'
                    textColor='inherit'
                    sx={{
                        '& .MuiTabs-flexContainer': {
                            gap: '12px',
                        },
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    {tabs.map((tab, index) => (
                        <Tab
                            key={index}
                            href={`/settings/${tab.value}`}
                            component={Link}
                            label={tab.label}
                            value={tab.value}
                            style={{ padding: 0 }}
                        />
                    ))}
                </Tabs>
            </Box>
            {children}
        </Box>
    );
};

export default SettingsLayout;
