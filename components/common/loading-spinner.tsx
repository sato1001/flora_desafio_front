'use client';

import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

interface LoadingSpinnerProps {
  message?: string;
  minHeight?: string | number;
}

export default function LoadingSpinner({ message = 'Carregando...', minHeight = '200px' }: LoadingSpinnerProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight={minHeight}
      gap={2}
    >
      <CircularProgress color="primary" size={40} thickness={4} />
      {message && (
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
}
