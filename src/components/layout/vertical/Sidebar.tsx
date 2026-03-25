'use client';

import * as React from 'react';

import { styled, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, useTheme, alpha } from '@mui/material';
import { DashboardOutlined, ListAltOutlined, PeopleOutlined, ExpandLess, ExpandMore, CircleOutlined, FeedbackOutlined, AddCircleOutlineOutlined } from '@mui/icons-material';
import Logo from '@/components/layout/shared/Logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarWrapper = styled(Box)(({ theme }) => ({
    width: 260,
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    backgroundColor: theme.palette.background.paper,
    borderRight: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    flexDirection: 'column',
    zIndex: theme.zIndex.drawer,
}));

const NavItem = ({ icon, label, href }: { icon: React.ReactNode, label: string, href: string }) => {
    const pathname = usePathname();
    const active = pathname === href;
    const theme = useTheme();

    return (
        <ListItem disablePadding sx={{ mb: 1, px: 3 }}>
            <ListItemButton
                component={Link}
                href={href}
                sx={{
                    borderRadius: '6px',
                    py: '8px',
                    px: '12px',
                    background: active ? `linear-gradient(270deg, ${alpha(theme.palette.primary.main, 0.7)} 0%, ${theme.palette.primary.main} 100%)` : 'transparent',
                    color: active ? 'primary.contrastText' : 'text.primary',
                    boxShadow: active ? '0px 2px 4px rgba(115, 103, 240, 0.4)' : 'none',
                    '&:hover': {
                        backgroundColor: active ? theme.palette.primary.main : 'var(--mui-palette-action-hover, rgba(47, 43, 61, 0.04))',
                        color: active ? 'primary.contrastText' : 'text.primary',
                    },
                    '& .MuiListItemIcon-root': {
                        color: 'inherit',
                        minWidth: 32,
                        mr: 2,
                        fontSize: '1.375rem',
                        '& svg, & i': {
                            fontSize: 'inherit'
                        }
                    },
                }}
            >
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                        fontSize: '0.9375rem',
                        fontWeight: active ? 600 : 400,
                        whiteSpace: 'nowrap'
                    }}
                />
            </ListItemButton>
        </ListItem>
    );
};

const NavGroup = ({ icon, label, children, activeCondition }: { icon: React.ReactNode, label: string, children: React.ReactNode, activeCondition: boolean }) => {
    const [open, setOpen] = React.useState(activeCondition);
    const theme = useTheme();

    React.useEffect(() => {
        if (activeCondition) setOpen(true);
    }, [activeCondition]);

    return (
        <>
            <ListItem disablePadding sx={{ mb: 1, px: 3 }}>
                <ListItemButton
                    onClick={() => setOpen(!open)}
                    sx={{
                        borderRadius: '6px',
                        backgroundColor: open ? 'rgba(47, 43, 61, 0.04)' : 'transparent',
                        color: activeCondition ? 'primary.main' : 'text.primary',
                        '&:hover': {
                            backgroundColor: 'rgba(47, 43, 61, 0.04)',
                        },
                        '& .MuiListItemIcon-root': {
                            color: activeCondition ? 'primary.main' : 'inherit',
                            minWidth: 32,
                            mr: 2,
                            fontSize: '1.375rem',
                            '& svg, & i': {
                                fontSize: 'inherit'
                            }
                        },
                    }}
                >
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText
                        primary={label}
                        primaryTypographyProps={{
                            fontSize: '0.9375rem',
                            fontWeight: activeCondition ? 600 : 400
                        }}
                    />
                    {open ? <ExpandLess sx={{ fontSize: '1.25rem', color: 'text.secondary' }} /> : <ExpandMore sx={{ fontSize: '1.25rem', color: 'text.secondary' }} />}
                </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ mt: 1 }}>
                    {children}
                </List>
            </Collapse>
        </>
    );
};

const NavSubItem = ({ label, href }: { label: string, href: string }) => {
    const pathname = usePathname();
    const active = pathname === href;
    const theme = useTheme();

    return (
        <ListItem disablePadding sx={{ mb: 1, px: 2 }}>
            <ListItemButton
                component={Link}
                href={href}
                sx={{
                    py: '4px',
                    px: 6,
                    borderRadius: '6px',
                    backgroundColor: 'transparent',
                    color: active ? 'primary.main' : 'text.secondary',
                    '&:hover': {
                        backgroundColor: 'transparent',
                        color: 'primary.main',
                    },
                    '& .MuiListItemIcon-root': {
                        color: 'inherit',
                        minWidth: 28,
                    },
                }}
            >
                <ListItemIcon>
                    <CircleOutlined sx={{ fontSize: '0.5rem', color: active ? 'primary.main' : 'text.secondary' }} />
                </ListItemIcon>
                <ListItemText
                    primary={label}
                    primaryTypographyProps={{
                        fontSize: '0.9375rem',
                        fontWeight: active ? 600 : 400
                    }}
                />
            </ListItemButton>
        </ListItem>
    );
};

export default function Sidebar() {
    const theme = useTheme();
    const pathname = usePathname();

    return (
        <SidebarWrapper>
            <Box sx={{ p: '18px 24px', display: 'flex', alignItems: 'center', height: 64 }}>
                <Logo />
            </Box>

            <Box sx={{ flex: 1, py: 2, overflowY: 'auto', overflowX: 'hidden' }}>
                <List>
                    <NavItem icon={<DashboardOutlined />} label="Dashboard" href="/dashboard" />

                    <NavItem icon={<PeopleOutlined />} label="Users" href="/users" />

                    <NavItem icon={<FeedbackOutlined />} label="Feedback" href="/feedback" />

                    <NavItem icon={<ListAltOutlined />} label="IPO List" href="/ipo-list" />

                    <NavItem icon={<AddCircleOutlineOutlined />} label="Add IPO" href="/add-ipo" />

                    {/* <NavGroup
                        icon={<ListAltOutlined />}
                        label="IPO"
                        activeCondition={pathname.includes('ipo')}
                    >
                        <NavSubItem label="IPO List" href="/ipo-list" />
                        <NavSubItem label="Add IPO" href="/add-ipo" />
                    </NavGroup> */}


                    {/* <NavItem icon={<SettingsOutlined />} label="Settings" href="/settings" /> */}
                </List>
            </Box>
        </SidebarWrapper>
    );
}
