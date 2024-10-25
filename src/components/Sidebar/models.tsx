import type * as Icons from '@mui/icons-material';

export interface SidebarItemProps {
    title: string;
    icon?: keyof typeof Icons;
    href: string;
    children?: SidebarItemProps[];
    position?: 'bottom' | 'top';
    active?: boolean;
}
