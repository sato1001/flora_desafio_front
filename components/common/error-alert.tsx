'use client';

import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
  title?: string;
}

export default function ErrorAlert({ message, onRetry, title = 'Erro' }: ErrorAlertProps) {
  return (
    <Box my={2} width="100%">
      <Alert
        severity="error"
        action={
          onRetry && (
            <Button color="inherit" size="small" onClick={onRetry}>
              Tentar Novamente
            </Button>
          )
        }
        sx={{ borderRadius: 3 }}
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
}
