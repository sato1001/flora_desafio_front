'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMe, getFavorites, getHistory } from '@/lib/api/user';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HistoryIcon from '@mui/icons-material/History';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LoadingSpinner from '@/components/common/loading-spinner';
import ErrorAlert from '@/components/common/error-alert';

export default function DashboardPage() {
  const { data: user, isLoading: userLoading, error: userError } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });

  const { data: favorites, isLoading: favLoading } = useQuery({
    queryKey: ['favorites', { limit: 5 }],
    queryFn: () => getFavorites({ limit: 5 }),
  });

  const { data: history, isLoading: histLoading } = useQuery({
    queryKey: ['history', { limit: 5 }],
    queryFn: () => getHistory({ limit: 5 }),
  });

  if (userLoading) {
    return <LoadingSpinner message="Carregando painel..." minHeight="60vh" />;
  }

  if (userError) {
    return <ErrorAlert message={userError.message} />;
  }

  return (
    <Box sx={{ py: 2 }}>
      {/* Welcome Card */}
      <Card
        sx={{
          mb: 4,
          p: { xs: 2, sm: 3 },
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.1) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Olá, {user?.name || 'Explorador'}!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
            Bem-vindo ao seu painel pessoal de estudos. Explore novas palavras, gerencie seus favoritos e acompanhe seu histórico de busca no dicionário de inglês.
          </Typography>
        </Box>
      </Card>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 3 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  bgcolor: 'rgba(236, 72, 153, 0.1)',
                  color: 'secondary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FavoriteIcon fontSize="large" />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {favorites?.totalDocs ?? 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Palavras Favoritadas
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 3, p: 3 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 3,
                  bgcolor: 'rgba(139, 92, 246, 0.1)',
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <HistoryIcon fontSize="large" />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {history?.totalDocs ?? 0}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Palavras Consultadas
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent History & Favorites Lists */}
      <Grid container spacing={4}>
        {/* History List */}
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              Buscas Recentes
            </Typography>
            {history?.results && history.results.length > 0 && (
              <Button
                component={Link}
                href="/history"
                size="small"
                endIcon={<ArrowForwardIcon />}
                sx={{ color: 'primary.light' }}
              >
                Ver tudo
              </Button>
            )}
          </Box>

          <Card sx={{ p: 1 }}>
            {histLoading ? (
              <LoadingSpinner minHeight={150} message="" />
            ) : !history?.results || history.results.length === 0 ? (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Nenhuma palavra pesquisada ainda.
                </Typography>
                <Button component={Link} href="/dictionary" variant="outlined" size="small" sx={{ mt: 1 }}>
                  Ir para o Dicionário
                </Button>
              </Box>
            ) : (
              <List disablePadding>
                {history.results.map((item, idx) => (
                  <ListItem
                    key={`${item.word}-${idx}`}
                    disablePadding
                    divider={idx < history.results.length - 1}
                  >
                    <ListItemButton component={Link} href={`/dictionary/${item.word}`} sx={{ borderRadius: 2 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <HistoryIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.word}
                        primaryTypographyProps={{ textTransform: 'capitalize', fontWeight: 500 }}
                      />
                      <ArrowForwardIcon fontSize="small" sx={{ color: 'text.disabled' }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </Card>
        </Grid>

        {/* Favorites List */}
        <Grid item xs={12} md={6}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" fontWeight="bold">
              Favoritos Recentes
            </Typography>
            {favorites?.results && favorites.results.length > 0 && (
              <Button
                component={Link}
                href="/favorites"
                size="small"
                endIcon={<ArrowForwardIcon />}
                sx={{ color: 'primary.light' }}
              >
                Ver tudo
              </Button>
            )}
          </Box>

          <Card sx={{ p: 1 }}>
            {favLoading ? (
              <LoadingSpinner minHeight={150} message="" />
            ) : !favorites?.results || favorites.results.length === 0 ? (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Nenhuma palavra favoritada ainda.
                </Typography>
                <Button component={Link} href="/dictionary" variant="outlined" size="small" sx={{ mt: 1 }}>
                  Buscar palavras
                </Button>
              </Box>
            ) : (
              <List disablePadding>
                {favorites.results.map((item, idx) => (
                  <ListItem
                    key={`${item.word}-${idx}`}
                    disablePadding
                    divider={idx < favorites.results.length - 1}
                  >
                    <ListItemButton component={Link} href={`/dictionary/${item.word}`} sx={{ borderRadius: 2 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <FavoriteIcon fontSize="small" sx={{ color: 'secondary.main' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.word}
                        primaryTypographyProps={{ textTransform: 'capitalize', fontWeight: 500 }}
                      />
                      <ArrowForwardIcon fontSize="small" sx={{ color: 'text.disabled' }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
