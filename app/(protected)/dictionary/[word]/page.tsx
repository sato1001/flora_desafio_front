'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getEntry } from '@/lib/api/entries';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DetailCard from '@/components/dictionary/detail-card';
import LoadingSpinner from '@/components/common/loading-spinner';
import ErrorAlert from '@/components/common/error-alert';

export default function WordDetailPage() {
  const params = useParams();
  const router = useRouter();
  const word = typeof params.word === 'string' ? params.word : '';

  const { data: detail, isLoading, error } = useQuery({
    queryKey: ['entry', word],
    queryFn: () => getEntry(word),
    enabled: !!word,
  });

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Box sx={{ py: 2 }}>
      {/* Back Button */}
      <Box sx={{ mb: 4 }}>
        <Button
          variant="text"
          color="inherit"
          onClick={handleGoBack}
          startIcon={<ArrowBackIcon />}
          sx={{ fontWeight: 'bold' }}
        >
          Voltar
        </Button>
      </Box>

      {isLoading ? (
        <LoadingSpinner message={`Carregando definição de "${word}"...`} minHeight="300px" />
      ) : error ? (
        <ErrorAlert message={error instanceof Error ? error.message : 'Erro ao recuperar definição da palavra'} />
      ) : !detail ? (
        <ErrorAlert message="Palavra não encontrada." title="Aviso" />
      ) : (
        <DetailCard word={word} detail={detail} />
      )}
    </Box>
  );
}
