import RegisterForm from '@/components/forms/register-form';
import Box from '@mui/material/Box';

export default function RegisterPage() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 10% 20%, rgba(139, 92, 246, 0.08) 0%, rgba(0,0,0,0) 50%), radial-gradient(circle at 90% 80%, rgba(236, 72, 153, 0.08) 0%, rgba(0,0,0,0) 50%)',
      }}
    >
      <Box sx={{ zIndex: 10, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <RegisterForm />
      </Box>
    </Box>
  );
}
