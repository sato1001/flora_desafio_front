'use client';

import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8b5cf6', // Violet
      light: '#a78bfa',
      dark: '#7c3aed',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ec4899', // Pink
      light: '#f472b6',
      dark: '#db2777',
      contrastText: '#ffffff',
    },
    background: {
      default: '#070709', // Deep dark page background
      paper: '#0f0f13', // Slightly lighter container background
    },
    text: {
      primary: '#f3f4f6',
      secondary: '#9ca3af',
      disabled: '#6b7280',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
  },
  typography: {
    fontFamily: 'var(--font-inter), sans-serif',
    h1: {
      fontFamily: 'var(--font-outfit), sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'var(--font-outfit), sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'var(--font-outfit), sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: 'var(--font-outfit), sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: 'var(--font-outfit), sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'var(--font-outfit), sans-serif',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#070709',
          color: '#f3f4f6',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 20px',
          fontSize: '0.875rem',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(1px)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
          boxShadow: '0 4px 14px 0 rgba(139, 92, 246, 0.25)',
          '&:hover': {
            background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
            boxShadow: '0 6px 20px 0 rgba(139, 92, 246, 0.35)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: 'rgba(15, 15, 19, 0.75)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          backgroundImage: 'none',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            transition: 'all 0.2s',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#8b5cf6',
              borderWidth: '1.5px',
            },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: '4px 8px',
          padding: '10px 16px',
          transition: 'all 0.15s ease-in-out',
          '&.Mui-selected': {
            backgroundColor: 'rgba(139, 92, 246, 0.12)',
            color: '#a78bfa',
            '& .MuiListItemIcon-root': {
              color: '#a78bfa',
            },
            '&:hover': {
              backgroundColor: 'rgba(139, 92, 246, 0.18)',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(7, 7, 9, 0.75)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: 'none',
          color: '#f3f4f6',
        },
      },
    },
  },
});
