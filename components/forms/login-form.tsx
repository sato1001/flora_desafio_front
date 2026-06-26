'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { signin } from '@/lib/api/auth';
import { setSessionToken } from '@/lib/auth/session';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Link from 'next/link';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const loginSchema = z.object({
  email: z.string().email('Insira um e-mail válido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await signin({
        email: data.email,
        password: data.password,
      });
      setSessionToken(response.token);
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'E-mail ou senha incorretos.';
      setError(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card sx={{ width: '100%', maxWidth: 450, p: 2 }}>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
          <Box
            width={48}
            height={48}
            borderRadius={3}
            sx={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px 0 rgba(139, 92, 246, 0.25)',
              mb: 2,
            }}
          >
            <Typography variant="h5" fontWeight="bold" color="white">
              L
            </Typography>
          </Box>
          <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
            Bem-vindo de volta
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Acesse sua conta para continuar seus estudos
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            autoComplete="email"
            autoFocus
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="alternar visibilidade da senha"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Entrar'}
          </Button>

          <Box mt={3} pt={2} borderTop="1px solid" borderColor="divider" textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Não tem uma conta?{' '}
              <Link href="/register" style={{ color: '#8b5cf6', textDecoration: 'none', fontWeight: 600 }}>
                Cadastre-se
              </Link>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
