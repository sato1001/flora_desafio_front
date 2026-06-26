'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import SidebarNav from '@/components/layout/sidebar-nav';
import HeaderBar from '@/components/layout/header-bar';

const DRAWER_WIDTH = 280;

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Navigation Header */}
      <HeaderBar onToggleDrawer={handleDrawerToggle} drawerWidth={DRAWER_WIDTH} />

      {/* Responsive Drawers */}
      <Box
        component="nav"
        sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}
        aria-label="opções de navegação"
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            },
          }}
        >
          <SidebarNav onCloseMobileDrawer={handleDrawerClose} />
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
            },
          }}
          open
        >
          <SidebarNav />
        </Drawer>
      </Box>

      {/* Main Content Pane */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 3, md: 5 },
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toolbar /> {/* Offsets the fixed AppBar */}
        <Box sx={{ flexGrow: 1, maxWidth: 1000, width: '100%', mx: 'auto' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
