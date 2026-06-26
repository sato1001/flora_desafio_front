'use client';

import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 3,
        bgcolor: 'background.default',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '6rem', sm: '8rem' },
          fontWeight: 900,
          background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1,
          mb: 2,
        }}
      >
        404
      </Typography>
      <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
        Página não encontrada
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 450, mb: 4 }}>
        A página que você está procurando não existe ou foi movida para outro endereço.
      </Typography>
      <Button
        component={Link}
        href="/dashboard"
        variant="contained"
        startIcon={<HomeIcon />}
        sx={{ px: 4, py: 1.5 }}
      >
        Voltar ao início
      </Button>
    </Box>
  );
}
