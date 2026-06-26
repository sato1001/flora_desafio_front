'use client';

import React from 'react';
import { WordDetail } from '@/lib/types/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { favoriteWord, unfavoriteWord } from '@/lib/api/entries';
import { getFavorites } from '@/lib/api/user';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface DetailCardProps {
  word: string;
  detail: WordDetail;
}

export default function DetailCard({ word, detail }: DetailCardProps) {
  const queryClient = useQueryClient();

  // Fetch favorites (limit 100) to check if the word is favorited
  const { data: favoritesData } = useQuery({
    queryKey: ['favorites', { limit: 100 }],
    queryFn: () => getFavorites({ limit: 100 }),
  });

  const isFavorite = React.useMemo(() => {
    return (
      favoritesData?.results.some(
        (fav) => fav.word.toLowerCase() === word.toLowerCase()
      ) ?? false
    );
  }, [favoritesData, word]);

  // Favorite / unfavorite mutations
  const favoriteMut = useMutation({
    mutationFn: () => favoriteWord(word),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const unfavoriteMut = useMutation({
    mutationFn: () => unfavoriteWord(word),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  const toggleFavorite = () => {
    if (isFavorite) {
      unfavoriteMut.mutate();
    } else {
      favoriteMut.mutate();
    }
  };

  // Find phonetic text & audio
  const phoneticWithAudio = detail.phonetics?.find((p) => p.audio);
  const audioUrl = phoneticWithAudio?.audio;
  const phoneticText = detail.phonetic || detail.phonetics?.find((p) => p.text)?.text;

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play().catch((err) => console.error('Erro ao reproduzir áudio:', err));
    }
  };

  const isMutating = favoriteMut.isPending || unfavoriteMut.isPending;

  return (
    <Stack spacing={4} sx={{ width: '100%' }}>
      {/* Header Info */}
      <Card
        sx={{
          p: { xs: 2, sm: 3 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Soft background glow */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 180,
            height: 180,
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          gap={3}
          sx={{ position: 'relative', zIndex: 1 }}
        >
          <Box display="flex" flexDirection="column" gap={1}>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography
                variant="h3"
                component="h1"
                fontWeight="bold"
                sx={{
                  textTransform: 'capitalize',
                  letterSpacing: '-0.02em',
                }}
              >
                {detail.word}
              </Typography>
              {audioUrl && (
                <IconButton
                  onClick={playAudio}
                  sx={{
                    bgcolor: 'rgba(139, 92, 246, 0.1)',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'rgba(139, 92, 246, 0.2)',
                    },
                  }}
                  title="Ouvir pronúncia"
                >
                  <VolumeUpIcon />
                </IconButton>
              )}
            </Box>

            {phoneticText && (
              <Chip
                label={phoneticText}
                color="secondary"
                variant="outlined"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 600,
                  alignSelf: 'flex-start',
                  borderColor: 'rgba(236, 72, 153, 0.3)',
                  bgcolor: 'rgba(236, 72, 153, 0.03)',
                }}
              />
            )}
          </Box>

          <Button
            variant={isFavorite ? 'outlined' : 'contained'}
            color={isFavorite ? 'secondary' : 'primary'}
            onClick={toggleFavorite}
            disabled={isMutating}
            startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            sx={{
              alignSelf: { xs: 'stretch', sm: 'auto' },
              borderRadius: 3,
              borderColor: isFavorite ? 'rgba(236, 72, 153, 0.3)' : 'transparent',
              bgcolor: isFavorite ? 'rgba(236, 72, 153, 0.05)' : undefined,
              color: isFavorite ? 'secondary.main' : undefined,
              '&:hover': {
                bgcolor: isFavorite ? 'rgba(236, 72, 153, 0.12)' : undefined,
              },
            }}
          >
            {isFavorite ? 'Favoritado' : 'Favoritar'}
          </Button>
        </Box>
      </Card>

      {/* Meanings */}
      <Stack spacing={3}>
        {detail.meanings?.map((meaning, index) => (
          <Card key={`${meaning.partOfSpeech}-${index}`} sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <Chip
                label={meaning.partOfSpeech}
                color="primary"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                }}
              />
              <Divider sx={{ flexGrow: 1 }} />
            </Box>

            <List disablePadding>
              {meaning.definitions?.map((def, defIdx) => (
                <ListItem
                  key={defIdx}
                  alignItems="flex-start"
                  sx={{
                    flexDirection: 'column',
                    px: 0,
                    py: 2,
                    borderBottom: defIdx < meaning.definitions.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}
                >
                  <Box display="flex" gap={2} width="100%">
                    <Typography
                      variant="body2"
                      fontFamily="monospace"
                      color="text.secondary"
                      sx={{ select: 'none', mt: 0.3 }}
                    >
                      {String(defIdx + 1).padStart(2, '0')}.
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={1.5} flexGrow={1}>
                      <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                        {def.definition}
                      </Typography>

                      {def.example && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontStyle: 'italic',
                            borderLeft: '2px solid rgba(255,255,255,0.1)',
                            pl: 2,
                            my: 0.5,
                          }}
                        >
                          &ldquo;{def.example}&rdquo;
                        </Typography>
                      )}

                      {def.synonyms && def.synonyms.length > 0 && (
                        <Box display="flex" flexWrap="wrap" gap={1} alignItems="center" mt={1}>
                          <Typography variant="caption" color="text.secondary" fontWeight="bold" sx={{ mr: 1, textTransform: 'uppercase', fontSize: '0.65rem' }}>
                            Sinônimos:
                          </Typography>
                          {def.synonyms.slice(0, 5).map((syn) => (
                            <Chip
                              key={syn}
                              label={syn}
                              size="small"
                              sx={{
                                fontSize: '0.7rem',
                                bgcolor: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                color: 'primary.light',
                              }}
                            />
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
