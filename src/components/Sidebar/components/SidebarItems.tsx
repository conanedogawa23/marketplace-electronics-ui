import * as Icons from '@mui/icons-material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
    Box,
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Inter } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { type SidebarItemProps } from '../models';

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
    minWidth: 'auto',
    marginRight: theme.spacing(2),
    fontWeight: 500,
    fontSize: 14,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
    paddingLeft: theme.spacing(4),
    paddingBottom: theme.spacing(0),
    paddingTop: theme.spacing(0),
}));
const inter = Inter({ subsets: ['latin'] });

const SidebarItem: React.FC<{ item: SidebarItemProps }> = ({ item }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const isParentActive = () => {
        return pathname === item.href || pathname.startsWith(item.href + '/');
    };

    const isChildActive = () => {
        return item.children?.some((child) => pathname === child.href) ?? false;
    };
    // console.log('item href', item.href);
    // console.log('pathname', pathname);
    // console.log('isparentactive', isParentActive());

    useEffect(() => {
        setOpen(isChildActive());
    }, [pathname, item.children]);

    const handleClick = () => {
        if (item.children) {
            setOpen(!open);
        } else {
            router.push(item.href);
        }
    };

    const Icon = item.icon ? Icons[item.icon] : null;
    const CaretIcon = open ? ExpandLess : ExpandMore;

    return (
        <>
            <ListItem disablePadding>
                <ListItemButton
                    onClick={handleClick}
                    sx={{
                        color: isParentActive() ? '#AB41C2' : '#475467',
                        '&:hover': {
                            color: isParentActive() ? '#AB41C2' : '#475467',
                        },
                        padding: '6px 8px',
                        marginBottom: '4px',
                    }}
                >
                    {Icon && (
                        <StyledListItemIcon>
                            <Icon
                                sx={{
                                    color: isParentActive()
                                        ? '#AB41C2'
                                        : '#475467',
                                    '&:hover': {
                                        color: isParentActive()
                                            ? '#AB41C2'
                                            : '#475467',
                                    },
                                }}
                            />
                        </StyledListItemIcon>
                    )}
                    <Box
                        sx={{
                            display: 'flex',
                            flexGrow: 1,
                            alignItems: 'center',
                        }}
                    >
                        <ListItemText
                            sx={{
                                color: isParentActive() ? '#AB41C2' : '#475467',
                                '&:hover': {
                                    color: isParentActive()
                                        ? '#AB41C2'
                                        : '#475467',
                                },
                                '& .MuiListItemText-primary': {
                                    fontWeight: '600',
                                    fontSize: '16px',
                                },
                            }}
                            primary={item.title}
                        />
                        {item.children && (
                            <CaretIcon sx={{ marginLeft: '4px' }} />
                        )}
                    </Box>
                </ListItemButton>
            </ListItem>
            {item.children && (
                <Collapse in={open} timeout='auto' unmountOnExit>
                    <List component='div' disablePadding>
                        {item.children.map((child, index) => (
                            <StyledListItem key={index}>
                                <ListItemButton
                                    onClick={() => router.push(child.href)}
                                    sx={{
                                        '& a': {
                                            textDecoration: 'none',
                                        },
                                        color:
                                            pathname === child.href
                                                ? '#AB41C2'
                                                : '#475467',
                                        '&:hover': {
                                            color:
                                                pathname === child.href
                                                    ? '#AB41C2'
                                                    : '#475467',
                                        },
                                    }}
                                >
                                    <ListItemText
                                        sx={{
                                            '& .MuiListItemText-primary': {
                                                fontWeight: '600',
                                                fontSize: '16px',
                                            },
                                        }}
                                        primary={child.title}
                                    />
                                </ListItemButton>
                            </StyledListItem>
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
};

export { SidebarItem };
