'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/Book';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { clearSession } from '@/lib/auth/session';
import { useRouter } from 'next/navigation';

interface SidebarNavProps {
  onCloseMobileDrawer?: () => void;
}

export default function SidebarNav({ onCloseMobileDrawer }: SidebarNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard' },
    { text: 'Dicionário', icon: <BookIcon />, href: '/dictionary' },
    { text: 'Favoritos', icon: <FavoriteIcon />, href: '/favorites' },
    { text: 'Histórico', icon: <HistoryIcon />, href: '/history' },
    { text: 'Perfil', icon: <PersonIcon />, href: '/profile' },
  ];

  const handleLogout = () => {
    clearSession();
    router.push('/login');
    router.refresh();
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Brand Header */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          width={40}
          height={40}
          borderRadius={2}
          sx={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px 0 rgba(139, 92, 246, 0.2)',
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="white" sx={{ fontSize: '1.2rem', lineHeight: 1 }}>
            L
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            Lexicon
          </Typography>
          <Typography variant="caption" sx={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'text.secondary', fontWeight: 'bold', fontSize: '0.625rem' }}>
            Dicionário
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Nav Links */}
      <Box sx={{ flexGrow: 1, px: 1, py: 2 }}>
        <List component="nav" disablePadding>
          {menuItems.map((item) => {
            const isSelected = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={isSelected}
                  onClick={onCloseMobileDrawer}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: isSelected ? 'primary.main' : 'text.secondary' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: isSelected ? 600 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider />

      {/* Footer / Logout */}
      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            color: 'error.main',
            '& .MuiListItemIcon-root': { color: 'error.main' },
            '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.08)' },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText
            primary="Sair"
            primaryTypographyProps={{
              fontSize: '0.875rem',
              fontWeight: 600,
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );
}
