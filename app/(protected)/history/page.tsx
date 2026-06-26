'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHistory } from '@/lib/api/user';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import HistoryIcon from '@mui/icons-material/History';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LoadingSpinner from '@/components/common/loading-spinner';
import ErrorAlert from '@/components/common/error-alert';
import PaginationControls from '@/components/common/pagination-controls';
import Link from 'next/link';

export default function HistoryPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useQuery({
    queryKey: ['history', { page, limit }],
    queryFn: () => getHistory({ page, limit }),
  });

  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Histórico de Pesquisas
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Reveja as palavras que você pesquisou anteriormente.
        </Typography>
      </Box>

      {isLoading ? (
        <LoadingSpinner message="Carregando histórico..." minHeight="300px" />
      ) : error ? (
        <ErrorAlert message={error instanceof Error ? error.message : 'Erro ao recuperar histórico'} />
      ) : !data?.results || data.results.length === 0 ? (
        <Card sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Seu histórico de pesquisas está vazio.
          </Typography>
          <Typography variant="body2" color="text.disabled">
            Comece a pesquisar no dicionário e o seu histórico aparecerá aqui!
          </Typography>
        </Card>
      ) : (
        <>
          <Card sx={{ p: 1, mb: 2 }}>
            <List disablePadding>
              {data.results.map((item, idx) => (
                <ListItem
                  key={`${item.word}-${idx}`}
                  disablePadding
                  divider={idx < data.results.length - 1}
                >
                  <ListItemButton
                    component={Link}
                    href={`/dictionary/${item.word}`}
                    sx={{ borderRadius: 2, py: 1.5 }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <HistoryIcon sx={{ color: 'text.secondary' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.word}
                      secondary={`Acessado em ${new Date(item.accessedAt).toLocaleString('pt-BR')}`}
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
                    <ArrowForwardIosIcon sx={{ fontSize: '0.85rem', color: 'text.disabled' }} />
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
