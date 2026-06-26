'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { listEntries } from '@/lib/api/entries';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BookIcon from '@mui/icons-material/Book';
import SearchInput from '@/components/dictionary/search-input';
import PaginationControls from '@/components/common/pagination-controls';
import LoadingSpinner from '@/components/common/loading-spinner';
import ErrorAlert from '@/components/common/error-alert';
import Link from 'next/link';

export default function DictionaryPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const limit = 15;

  // Reset page to 1 when search query changes
  useEffect(() => {
    setPage(1);
  }, [search]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['entries', { search, page, limit }],
    queryFn: () => listEntries({ search, page, limit }),
  });

  return (
    <Box sx={{ py: 2 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Explorar Dicionário
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Pesquise por palavras em inglês para ouvir a pronúncia e visualizar definições completas.
        </Typography>
      </Box>

      {/* Search Input Box */}
      <Box sx={{ mb: 4 }}>
        <SearchInput value={search} onChange={setSearch} />
      </Box>

      {/* Results Section */}
      {isLoading ? (
        <LoadingSpinner message="Carregando palavras..." minHeight="300px" />
      ) : error ? (
        <ErrorAlert message={error instanceof Error ? error.message : 'Erro ao listar palavras'} />
      ) : !data?.results || data.results.length === 0 ? (
        <Card sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            Nenhuma palavra encontrada para a sua busca.
          </Typography>
        </Card>
      ) : (
        <>
          <Card sx={{ p: 1, mb: 2 }}>
            <List disablePadding>
              {data.results.map((word, idx) => (
                <ListItem
                  key={word}
                  disablePadding
                  divider={idx < data.results.length - 1}
                >
                  <ListItemButton
                    component={Link}
                    href={`/dictionary/${word}`}
                    sx={{ borderRadius: 2, py: 1.5 }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <BookIcon sx={{ color: 'primary.light' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={word}
                      primaryTypographyProps={{
                        variant: 'body1',
                        fontWeight: 600,
                        textTransform: 'capitalize',
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
