'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFavorites } from '@/lib/api/user';
import { unfavoriteWord } from '@/lib/api/entries';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LoadingSpinner from '@/components/common/loading-spinner';
import ErrorAlert from '@/components/common/error-alert';
import PaginationControls from '@/components/common/pagination-controls';
import Link from 'next/link';

export default function FavoritesPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ['favorites', { page, limit }],
    queryFn: () => getFavorites({ page, limit }),
  });

  const unfavoriteMut = useMutation({
    mutationFn: (word: string) => unfavoriteWord(word),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const handleUnfavorite = (e: React.MouseEvent, word: string) => {
    e.preventDefault(); // Prevent navigating to the details page
    unfavoriteMut.mutate(word);
  };

  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Palavras Favoritas
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gerencie e revise as palavras que você favoritou para estudar mais tarde.
        </Typography>
      </Box>

      {isLoading ? (
        <LoadingSpinner message="Carregando favoritos..." minHeight="300px" />
      ) : error ? (
        <ErrorAlert message={error instanceof Error ? error.message : 'Erro ao recuperar favoritos'} />
      ) : !data?.results || data.results.length === 0 ? (
        <Card sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Você ainda não favoritou nenhuma palavra.
          </Typography>
          <Typography variant="body2" color="text.disabled">
            Pesquise palavras no dicionário e marque-as como favoritas para que apareçam aqui!
          </Typography>
        </Card>
      ) : (
        <>
          <Card sx={{ p: 1, mb: 2 }}>
            <List disablePadding>
              {data.results.map((item, idx) => (
                <ListItem
                  key={item.word}
                  disablePadding
                  divider={idx < data.results.length - 1}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="remover favorito"
                      color="secondary"
                      onClick={(e) => handleUnfavorite(e, item.word)}
                      disabled={unfavoriteMut.isPending}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemButton
                    component={Link}
                    href={`/dictionary/${item.word}`}
                    sx={{ borderRadius: 2, py: 1.5, pr: 8 }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <FavoriteIcon sx={{ color: 'secondary.main' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.word}
                      secondary={`Adicionado em ${new Date(item.addedAt).toLocaleDateString('pt-BR')}`}
                      primaryTypographyProps={{
                        variant: 'body1',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                      }}
                      secondaryTypographyProps={{
                        variant: 'caption',
                        color: 'text.secondary',
                      }}
                    />
                    <ArrowForwardIosIcon sx={{ fontSize: '0.85rem', color: 'text.disabled', mr: 2 }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Card>

          <PaginationControls
            page={data.page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </Box>
  );
}
