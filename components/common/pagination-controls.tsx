'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationControls({
  page,
  totalPages,
  onPageChange,
}: PaginationControlsProps) {
  if (totalPages <= 1) return null;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <Box display="flex" justifyContent="center" mt={4} mb={2}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        color="primary"
        shape="rounded"
        size="large"
        sx={{
          '& .MuiPaginationItem-root': {
            borderRadius: 2,
            transition: 'all 0.15s ease-in-out',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            '&:hover': {
              backgroundColor: 'rgba(139, 92, 246, 0.08)',
              borderColor: 'rgba(139, 92, 246, 0.2)',
            },
            '&.Mui-selected': {
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              color: '#ffffff',
              fontWeight: 'bold',
              borderColor: 'transparent',
              '&:hover': {
                background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
              },
            },
          },
        }}
      />
    </Box>
  );
}
