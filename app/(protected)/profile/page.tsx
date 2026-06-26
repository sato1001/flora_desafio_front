'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/lib/api/user';
import { clearSession } from '@/lib/auth/session';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LoadingSpinner from '@/components/common/loading-spinner';
import ErrorAlert from '@/components/common/error-alert';

export default function ProfilePage() {
  const router = useRouter();

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });

  const handleLogout = () => {
    clearSession();
    router.push('/login');
    router.refresh();
  };

  if (isLoading) {
    return <LoadingSpinner message="Carregando dados do perfil..." minHeight="300px" />;
  }

  if (error) {
    return <ErrorAlert message={error instanceof Error ? error.message : 'Erro ao recuperar perfil'} />;
  }

  return (
    <Box sx={{ py: 2, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: '100%', maxWidth: 600, p: { xs: 2, sm: 4 } }}>
        <CardContent>
          <Stack spacing={4} alignItems="center">
            {/* User Avatar */}
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: 'primary.main',
                fontSize: '2.5rem',
                fontWeight: 'bold',
                boxShadow: '0 8px 24px rgba(139, 92, 246, 0.25)',
              }}
            >
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </Avatar>

            <Box textAlign="center">
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {user?.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Estudante de Inglês
              </Typography>
            </Box>

            <Stack spacing={2} width="100%" sx={{ mt: 2 }}>
              {/* Name field */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: 3,
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <PersonIcon color="primary" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Nome Completo
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {user?.name}
                  </Typography>
                </Box>
              </Box>

              {/* Email field */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  bgcolor: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: 3,
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <MailOutlineIcon color="primary" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Endereço de E-mail
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {user?.email}
                  </Typography>
                </Box>
              </Box>
            </Stack>

            <Button
              variant="outlined"
              color="error"
              fullWidth
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                py: 1.5,
                borderRadius: 3,
                borderColor: 'rgba(239, 68, 68, 0.3)',
                '&:hover': {
                  bgcolor: 'rgba(239, 68, 68, 0.05)',
                  borderColor: 'error.main',
                },
              }}
            >
              Sair da Conta
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
