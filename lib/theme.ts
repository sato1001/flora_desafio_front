'use client';

import { createTheme } from '@mui/material/styles';

export const getAppTheme = (mode: 'light' | 'dark') => {
  const isDark = mode === 'dark';
  
  return createTheme({
    palette: {
      mode,
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
        default: isDark ? '#070709' : '#f9fafb', // Deep dark vs soft gray
        paper: isDark ? '#0f0f13' : '#ffffff', // Slightly lighter container vs pure white
      },
      text: {
        primary: isDark ? '#f3f4f6' : '#111827',
        secondary: isDark ? '#9ca3af' : '#4b5563',
        disabled: isDark ? '#6b7280' : '#9ca3af',
      },
      divider: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
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
            backgroundColor: isDark ? '#070709' : '#f9fafb',
            color: isDark ? '#f3f4f6' : '#111827',
            transition: 'background-color 0.3s ease, color 0.3s ease',
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
            backgroundColor: isDark ? 'rgba(15, 15, 19, 0.75)' : '#ffffff',
            backdropFilter: 'blur(12px)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
            backgroundImage: 'none',
            boxShadow: isDark ? '0 8px 32px 0 rgba(0, 0, 0, 0.3)' : '0 8px 24px 0 rgba(0, 0, 0, 0.04)',
            transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            transition: 'background-color 0.3s ease',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)',
              transition: 'all 0.2s',
              '& fieldset': {
                borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              },
              '&:hover fieldset': {
                borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
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
              color: isDark ? '#a78bfa' : '#7c3aed',
              '& .MuiListItemIcon-root': {
                color: isDark ? '#a78bfa' : '#7c3aed',
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
            backgroundColor: isDark ? 'rgba(7, 7, 9, 0.75)' : 'rgba(249, 250, 251, 0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.06)',
            boxShadow: 'none',
            color: isDark ? '#f3f4f6' : '#111827',
            transition: 'background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease',
          },
        },
      },
    },
  });
};

// Default static fallback theme (dark)
export const theme = getAppTheme('dark');
