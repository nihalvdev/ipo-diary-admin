'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
    styled,
    Box,
    Avatar,
    Typography,
    Divider,
    Button,
    Popper,
    Fade,
    Paper,
    ClickAwayListener,
    MenuList,
    MenuItem,
    Badge
} from '@mui/material';
import {
    PersonOutline,
    SettingsOutlined,
    HelpOutline,
    LogoutOutlined
} from '@mui/icons-material';

import { signOut } from 'next-auth/react';

// Styled component for badge content
const BadgeContentSpan = styled('span')(({ theme }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    cursor: 'pointer',
    backgroundColor: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

export default function UserDropdown() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleDropdownOpen = () => {
        setOpen((prev) => !prev);
    };

    const handleDropdownClose = (event?: MouseEvent | TouchEvent, url?: string) => {
        if (url) {
            router.push(url);
        }

        if (anchorRef.current && anchorRef.current.contains(event?.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: '/login' });
    };

    return (
        <>
            <Badge
                ref={anchorRef}
                overlap="circular"
                badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                sx={{ cursor: 'pointer', ml: 1 }}
            >
                <Avatar
                    alt="User Avatar"
                    src="/logo.png"
                    onClick={handleDropdownOpen}
                    sx={{ width: 38, height: 38 }}
                />
            </Badge>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                placement="bottom-end"
                transition
                disablePortal
                sx={{ zIndex: (theme) => theme.zIndex.appBar + 1, mt: 3 }}
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} style={{ transformOrigin: 'right top' }}>
                        <Paper sx={{ width: 230, mt: 1, boxShadow: '0 4px 18px 0 rgba(47, 43, 61, 0.1)' }}>
                            <ClickAwayListener onClickAway={handleDropdownClose}>
                                <MenuList sx={{ p: 0 }}>
                                    <Box sx={{ py: 1, px: 2 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar
                                                alt="User Avatar"
                                                src="/logo.png"
                                                sx={{ width: 38, height: 38, mr: 3 }}
                                            />
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography sx={{ fontWeight: 500 }}>Nihal Makwana</Typography>
                                                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                    Admin
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Divider sx={{ my: 1 }} />
                                    {/* <MenuItem sx={{ py: 2 }} onClick={(e) => handleDropdownClose(e as any, '/profile')}>
                                        <PersonOutline sx={{ mr: 3 }} />
                                        <Typography>My Profile</Typography>
                                    </MenuItem> */}
                                    {/* <MenuItem sx={{ py: 2 }} onClick={(e) => handleDropdownClose(e as any, '/settings')}>
                                        <SettingsOutlined sx={{ mr: 3 }} />
                                        <Typography>Settings</Typography>
                                    </MenuItem> */}
                                    {/* <MenuItem sx={{ py: 2 }} onClick={(e) => handleDropdownClose(e as any, '/faq')}>
                                        <HelpOutline sx={{ mr: 3 }} />
                                        <Typography>FAQ</Typography>
                                    </MenuItem> */}
                                    <Box sx={{ p: '8px 12px' }}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            endIcon={<LogoutOutlined />}
                                            onClick={handleLogout}
                                            sx={{ '& .MuiButton-endIcon': { ml: 1.5 } }}
                                        >
                                            Logout
                                        </Button>
                                    </Box>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </>
    );
}
