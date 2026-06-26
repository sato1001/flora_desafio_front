'use client';

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/lib/api/user';
import { clearSession } from '@/lib/auth/session';
import { useRouter, usePathname } from 'next/navigation';
import { useColorMode } from '@/app/providers';

interface HeaderBarProps {
  onToggleDrawer: () => void;
  drawerWidth: number;
}

export default function HeaderBar({ onToggleDrawer, drawerWidth }: HeaderBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { mode, toggleColorMode } = useColorMode();

  // Fetch current user
  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    retry: false,
  });

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    clearSession();
    router.push('/login');
    router.refresh();
  };

  const handleGoProfile = () => {
    handleCloseUserMenu();
    router.push('/profile');
  };

  // Determine section name based on pathname
  const getSectionName = () => {
    if (pathname.startsWith('/dashboard')) return 'Dashboard';
    if (pathname.startsWith('/dictionary')) return 'Dicionário';
    if (pathname.startsWith('/favorites')) return 'Favoritos';
    if (pathname.startsWith('/history')) return 'Histórico';
    if (pathname.startsWith('/profile')) return 'Perfil';
    return 'Dicionário';
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        transition: (theme) =>
          theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 3 } }}>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            color="inherit"
            aria-label="abrir menu de navegação"
            edge="start"
            onClick={onToggleDrawer}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold" component="div" sx={{ letterSpacing: '-0.01em' }}>
            {getSectionName()}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={2}>
          <Tooltip title={mode === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}>
            <IconButton onClick={toggleColorMode} color="inherit">
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          {user && (
            <Box display={{ xs: 'none', sm: 'block' }} textAlign="right">
              <Typography variant="body2" fontWeight="bold">
                {user.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          )}

          <Tooltip title="Opções do usuário">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  width: 36,
                  height: 36,
                  fontSize: '0.95rem',
                  fontWeight: 'bold',
                  boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)',
                }}
              >
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseUserMenu}
            onClick={handleCloseUserMenu}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                bgcolor: 'background.paper',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 3,
                minWidth: 160,
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  borderLeft: '1px solid rgba(255,255,255,0.08)',
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleGoProfile} sx={{ borderRadius: 2, mx: 1, my: 0.5 }}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              Meu Perfil
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main', borderRadius: 2, mx: 1, my: 0.5 }}>
              <ListItemIcon sx={{ color: 'error.main' }}>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Sair
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
