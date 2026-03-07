'use client';

import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Public_Sans } from 'next/font/google';

const publicSans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#7367F0',
      light: '#8F85F3',
      dark: '#675DD8',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#808390',
      light: '#999BA6',
      dark: '#737682',
      contrastText: '#FFF',
    },
    background: {
      default: '#F8F7FA',
      paper: '#FFFFFF',
    },
    text: {
      primary: 'rgba(47, 43, 61, 0.78)',
      secondary: 'rgba(47, 43, 61, 0.68)',
      disabled: 'rgba(47, 43, 61, 0.42)',
    },
    divider: 'rgba(47, 43, 61, 0.12)',
  },
  typography: {
    fontFamily: publicSans.style.fontFamily,
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.58334,
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          fontWeight: 500,
          '&:hover': {
            boxShadow: '0 2px 4px 0 rgba(115, 103, 240, 0.4)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#675DD8',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'medium',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(47, 43, 61, 0.22)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(47, 43, 61, 0.35)',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '1px',
            },
          },
        },
      },
    },
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
