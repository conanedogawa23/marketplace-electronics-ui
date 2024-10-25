import type * as Icons from '@mui/icons-material';

import { type SidebarItemProps } from '@/components/Sidebar/models';

import {
    DASHBOARD, // HELP,
    INVENTORY,
    INVENTORY_ADJUST_STOCKS, // INVENTORY_OVERVIEW,
    INVENTORY_RECEIVE_ITEMS,
    INVENTORY_TRANSFER_STOCKS, // PROFILE,
    PROJECT_PROJECTS, // PROJECTS_OVERVIEW,
    SETTINGS, // STOCKS_ITEMS,
    STOCKS_LOCATIONS,
} from './page-paths';

type IconsKeys = keyof typeof Icons;

export const sidebarItems: SidebarItemProps[] = [
    {
        title: 'Dashboard',
        icon: 'BarChartRounded' satisfies IconsKeys,
        href: DASHBOARD,
    },

    {
        title: 'Projects',
        icon: 'TopicRounded' satisfies IconsKeys,
        href: PROJECT_PROJECTS,
        children: [
            // { title: 'Overview', href: PROJECTS_OVERVIEW },
            { title: 'Projects', href: PROJECT_PROJECTS },
        ],
    },
    {
        title: 'Stock',
        icon: 'HorizontalSplitOutlined' satisfies IconsKeys,
        href: INVENTORY,
        children: [
            { title: 'Items', href: INVENTORY },
            // { title: 'Items', href: STOCKS_ITEMS },
            { title: 'Locations', href: STOCKS_LOCATIONS },
            { title: 'Receive Items', href: INVENTORY_RECEIVE_ITEMS },
            { title: 'Stock Adjustment', href: INVENTORY_ADJUST_STOCKS },
            { title: 'Stock Transfer', href: INVENTORY_TRANSFER_STOCKS },
        ],
    },
    // {
    //     title: 'Profile',
    //     icon: 'PermIdentityOutlined' satisfies IconsKeys,
    //     href: PROFILE,
    //     position: 'bottom',
    // },

    {
        title: 'Settings',
        icon: 'SettingsOutlined' satisfies IconsKeys,
        href: SETTINGS,
        position: 'bottom',
    },
    // {
    //     title: 'Help',
    //     icon: 'HelpOutlineOutlined' satisfies IconsKeys,
    //     href: HELP,
    //     position: 'bottom',
    // },
];
