'use client';

import { styled, Box } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const LayoutWrapper = styled(Box)({
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
});

const ContentWrapper = styled(Box)({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
});

const ActualContent = styled('main')(({ theme }) => ({
    flexGrow: 1,
    padding: '0px 27px 27px',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(4),
    },
}));

export default function VerticalLayout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutWrapper>
            <Sidebar />
            <ContentWrapper sx={{ ml: '260px' }}>
                <Navbar />
                <ActualContent>
                    {children}
                </ActualContent>
            </ContentWrapper>
        </LayoutWrapper>
    );
}
