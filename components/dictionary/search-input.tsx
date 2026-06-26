'use client';

import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder = 'Pesquisar palavra...' }: SearchInputProps) {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: 'text.secondary' }} />
          </InputAdornment>
        ),
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton
              aria-label="limpar pesquisa"
              onClick={() => onChange('')}
              edge="end"
              size="small"
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          height: 56,
          fontSize: '1rem',
          bgcolor: 'rgba(255,255,255,0.01)',
          borderRadius: 4,
          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.08)',
        },
      }}
    />
  );
}
