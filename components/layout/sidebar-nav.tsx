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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BookIcon from '@mui/icons-material/Book';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HistoryIcon from '@mui/icons-material/History';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


interface SidebarNavProps {
  onCloseMobileDrawer?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function SidebarNav({
  onCloseMobileDrawer,
  collapsed = false,
  onToggleCollapse,
}: SidebarNavProps) {
  const pathname = usePathname();


  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard' },
    { text: 'Dicionário', icon: <BookIcon />, href: '/dictionary' },
    { text: 'Favoritos', icon: <FavoriteIcon />, href: '/favorites' },
    { text: 'Histórico', icon: <HistoryIcon />, href: '/history' },
  ];


  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Brand Header */}
      <Box
        sx={{
          p: collapsed ? 2 : 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          gap: collapsed ? 0 : 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
              flexShrink: 0,
            }}
          >
            <Typography variant="h6" fontWeight="bold" color="white" sx={{ fontSize: '1.2rem', lineHeight: 1 }}>
              L
            </Typography>
          </Box>
          {!collapsed && (
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
          )}
        </Box>

        {onToggleCollapse && !collapsed && (
          <IconButton onClick={onToggleCollapse} sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
            <ChevronLeftIcon />
          </IconButton>
        )}
        {onToggleCollapse && collapsed && (
          <IconButton onClick={onToggleCollapse} sx={{ display: { xs: 'none', md: 'inline-flex' }, mt: 1 }}>
            <ChevronRightIcon />
          </IconButton>
        )}
      </Box>

      <Divider />

      {/* Nav Links */}
      <Box sx={{ flexGrow: 1, px: collapsed ? 0.5 : 1, py: 2 }}>
        <List component="nav" disablePadding>
          {menuItems.map((item) => {
            const isSelected = pathname === item.href || pathname.startsWith(`${item.href}/`);
            
            const buttonContent = (
              <ListItemButton
                component={Link}
                href={item.href}
                selected={isSelected}
                onClick={onCloseMobileDrawer}
                sx={{
                  justifyContent: collapsed ? 'center' : 'initial',
                  px: collapsed ? 1.5 : 2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: collapsed ? 0 : 40,
                    color: isSelected ? 'primary.main' : 'text.secondary',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: isSelected ? 600 : 500,
                    }}
                  />
                )}
              </ListItemButton>
            );

            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                {collapsed ? (
                  <Tooltip title={item.text} placement="right" arrow>
                    {buttonContent}
                  </Tooltip>
                ) : (
                  buttonContent
                )}
              </ListItem>
            );
          })}
        </List>
      </Box>

    </Box>
  );
}
