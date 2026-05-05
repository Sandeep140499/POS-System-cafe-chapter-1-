import { Box, Typography, TextField, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { paths } from 'routes/paths';

export default function RegisterPage() {
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

  return (
    <Box component="form">
      <Typography
        sx={{
          fontSize: 22,
          fontWeight: 700,
          color: '#1a1a1a',
          mb: 0.5,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        Create account
      </Typography>
      <Typography sx={{ fontSize: 13.5, color: '#888', mb: 3, fontFamily: 'Inter, sans-serif' }}>
        Already have an account?{' '}
        <Typography
          component={RouterLink}
          to={paths.auth.login}
          sx={{
            color: '#c86030',
            textDecoration: 'none',
            fontWeight: 500,
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Sign in
        </Typography>
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        <TextField label="Full name" fullWidth sx={inputSx} />
        <TextField label="Email address" type="email" fullWidth sx={inputSx} />
        <TextField label="Password" type="password" fullWidth sx={inputSx} />
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
          '&:hover': { bgcolor: '#333' },
        }}
      >
        Create account
      </Button>
    </Box>
  );
}
