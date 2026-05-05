import { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { paths } from 'routes/paths';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      bgcolor: '#faf9f7',
      fontSize: 14,
      fontFamily: 'Inter, sans-serif',
      '& fieldset': { borderColor: '#e8e4de' },
      '&:hover fieldset': { borderColor: '#c86030' },
      '&.Mui-focused fieldset': { borderColor: '#c86030', borderWidth: 1.5 },
    },
    '& .MuiInputLabel-root': { fontFamily: 'Inter, sans-serif', fontSize: 13.5 },
    '& .MuiInputLabel-root.Mui-focused': { color: '#c86030' },
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    navigate(`${paths.auth.resetPassword}?email=${encodeURIComponent(email.trim())}`);
  };

  return (
    <Box component="form" onSubmit={handleSend}>
      <Typography
        sx={{
          fontSize: 22,
          fontWeight: 700,
          color: '#1a1a1a',
          mb: 0.5,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        Forgot password?
      </Typography>
      <Typography sx={{ fontSize: 13.5, color: '#888', mb: 3, fontFamily: 'Inter, sans-serif' }}>
        Enter your email and we'll send you a reset link.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        <TextField
          label="Email address"
          type="email"
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          sx={inputSx}
        />
      </Box>

      <Button
        type="submit"
        fullWidth
        sx={{
          bgcolor: '#1a1a1a',
          color: '#fff',
          borderRadius: '12px',
          py: 1.4,
          fontSize: 14,
          fontWeight: 600,
          textTransform: 'none',
          fontFamily: 'Inter, sans-serif',
          mb: 2,
          '&:hover': { bgcolor: '#333' },
        }}
      >
        Send reset link
      </Button>

      <Typography
        sx={{ textAlign: 'center', fontSize: 13.5, color: '#888', fontFamily: 'Inter, sans-serif' }}
      >
        Remember your password?{' '}
        <Typography
          component={RouterLink}
          to={paths.auth.login}
          sx={{
            color: '#c86030',
            textDecoration: 'none',
            fontWeight: 500,
            fontFamily: 'Inter, sans-serif',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Sign in
        </Typography>
      </Typography>
    </Box>
  );
}
