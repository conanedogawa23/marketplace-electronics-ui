'use client';

import { sidebarItems } from '@/common/navigation';
import { ITEM_DETAILS, LOGIN } from '@/common/page-paths';
import { useDynamicProjectRoute } from '@/hooks/dynamic-sidebar-items-logic/useDynamicProjectRoute';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    ListItemText,
    Menu,
    MenuItem,
} from '@mui/material';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';

import { useAuth } from '@/lib/redux/auth/useAuth';

import { SidebarItem } from './components/SidebarItems';
import SidebarLogo from './components/SidebarLogo';

const SidebarContainer = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
}));

const Spacer = styled('div')({
    flexGrow: 1,
});

const EndSlotComponent = () => {
    const { logout, user } = useAuth();

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                paddingX: 2,
                position: 'sticky',
                paddingY: 2,
                backgroundColor: 'background.paper',
                justifyContent: 'space-between',
            }}
        >
            <Avatar sx={{ bgcolor: 'primary.main' }} />
            <Box>
                <ListItemText
                    sx={{
                        '& .MuiListItemText-primary': {
                            fontWeight: '600',
                            color: '#475467',
                        },
                    }}
                    primary={user ? user.firstName : 'Loading...'}
                    secondary={user ? user.email : 'No email'}
                />
            </Box>

            <IconButton aria-label='menu' onClick={handleClick} size='small'>
                <ArrowForwardIosIcon fontSize='inherit' />
            </IconButton>

            <Menu
                id='log-out-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                MenuListProps={{
                    'aria-labelledby': 'log-out-button',
                }}
            >
                <MenuItem onClick={logout}>Log out</MenuItem>
            </Menu>
        </Box>
    );
};

const Sidebar: React.FC = () => {
    const router = usePathname();
    const isLoginPage = router === LOGIN;
    const isItemDetailsPage = router.startsWith(ITEM_DETAILS);
    // THIS HOOK DETERMINES IF THE ROUTE IS A DYNAMIC PROJECT ROUTE AND RETURNS THE SIDEBAR ITEMS FOR THAT ROUTE
    const { dynamicProjectItems, isDynamicProjectRoute } =
        useDynamicProjectRoute();
    const items = useMemo(() => {
        const bottomItems = sidebarItems.filter(
            (item) => item.position === 'bottom',
        );

        let topItems = sidebarItems.filter(
            (item) => item.position !== 'bottom',
        );
        let items = [] as any[];
        if (isDynamicProjectRoute) {
            // items = [...(dynamicProjectItems as any), ...bottomItems];
            // the above line is working too, but the below line makes the code more readable and makes more sense
            items = [
                ...(topItems = [...(dynamicProjectItems as any)]),
                ...bottomItems,
            ];
        } else {
            const sidebarEnhancedItems = {
                topItems: topItems.map((item) => ({
                    ...item,
                    active:
                        item.href === router ||
                        (item.children &&
                            item.children.some(
                                (child) => child.href === router,
                            )),
                    children: item.children
                        ? item.children.map((child) => ({
                              ...child,
                              active: child.href === router,
                          }))
                        : undefined,
                })),
                bottomItems: bottomItems,
            };

            items = [
                ...(sidebarEnhancedItems.topItems as any),
                ...(sidebarEnhancedItems.bottomItems as any),
            ];
        }

        return items;
    }, [router, dynamicProjectItems, isDynamicProjectRoute]);

    const topItems = items.filter((item) => item.position !== 'bottom');
    const bottomItems = items.filter((item) => item.position === 'bottom');
    const handleBackButton = () => {
        window.history.back();
    };

    const showBackButton = isDynamicProjectRoute;

    return isLoginPage || isItemDetailsPage ? null : (
        <Box
            borderRight={'1px solid #ddd'}
            flexShrink={0}
            overflow={'hidden'}
            padding={2}
            width={250}
        >
            <SidebarContainer>
                <SidebarLogo />
                {showBackButton && (
                    <Box sx={{ marginY: '20px' }}>
                        <button
                            onClick={handleBackButton}
                            style={{
                                border: '2px solid #F3BDFF',
                                color: '#AB41C2',
                                width: '100%',
                                backgroundColor: 'transparent',
                                padding: '8px',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                            }}
                        >
                            Back
                        </button>
                    </Box>
                )}
                <List>
                    {topItems.map((item, index) => (
                        <SidebarItem key={index} item={item} />
                    ))}
                </List>
                <Spacer />
                <List sx={{ marginBottom: 2 }}>
                    {bottomItems.map((item, index) => (
                        <SidebarItem key={`bottom-${index}`} item={item} />
                    ))}
                </List>
                <Divider />
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <EndSlotComponent />
                </Box>
            </SidebarContainer>
        </Box>
    );
};

export { Sidebar };
