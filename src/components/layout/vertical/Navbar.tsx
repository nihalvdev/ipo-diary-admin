'use client';

import {
    styled,
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Avatar,
    Typography,
    useTheme
} from '@mui/material';
import {
    MenuOutlined,
    SearchOutlined,
    NotificationsOutlined,
    TranslateOutlined,
    DarkModeOutlined
} from '@mui/icons-material';

import UserDropdown from '@/components/layout/shared/UserDropdown';

const NavbarWrapper = styled(AppBar)(({ theme }) => ({
    backgroundColor: 'transparent',
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    color: theme.palette.text.primary,
    left: 260,
    width: '100%',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    minHeight: '64px !important',
    margin: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    boxShadow: '0 4px 18px 0 rgba(47, 43, 61, 0.1)',
    padding: theme.spacing(0, 4),
}));

export default function Navbar() {
    const theme = useTheme();

    return (
        <NavbarWrapper position="sticky">
            <StyledToolbar>
                <IconButton sx={{ display: { lg: 'none' } }}>
                    <MenuOutlined />
                </IconButton>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <Typography variant="body2" sx={{ color: 'text.disabled', ml: 2 }}>
                        Search (Ctrl+/)
                    </Typography> */}
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* <IconButton>
                        <TranslateOutlined />
                    </IconButton>
                    <IconButton>
                        <DarkModeOutlined />
                    </IconButton>
                    <IconButton>
                        <NotificationsOutlined />
                    </IconButton> */}
                    <UserDropdown />
                </Box>
            </StyledToolbar>
        </NavbarWrapper>
    );
}
