import { Box, Typography } from '@mui/material';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';

export default function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f5f3ef',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, sm: 3 },
        py: 4,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Logo */}
      <Box
        component={RouterLink}
        to="/"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.2,
          textDecoration: 'none',
          mb: 3,
        }}
      >
        <Box
          sx={{
            bgcolor: '#2a2725',
            borderRadius: '10px',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LocalCafeIcon sx={{ color: '#fff', fontSize: 20 }} />
        </Box>
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 14,
              color: '#1a1a1a',
              lineHeight: 1.1,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Cafe Chapter 1
          </Typography>
          <Typography
            sx={{
              fontSize: 9,
              color: '#999',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            RESTRO PVT. LTD.
          </Typography>
        </Box>
      </Box>

      {/* Auth card */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 420,
          bgcolor: '#fff',
          borderRadius: '20px',
          border: '1px solid #eae7e2',
          p: { xs: 3, sm: 4 },
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        }}
      >
        <Outlet />
      </Box>

      {/* Back link */}
      <Typography
        component={RouterLink}
        to="/portal"
        sx={{
          mt: 2.5,
          fontSize: 13,
          color: '#888',
          textDecoration: 'none',
          fontFamily: 'Inter, sans-serif',
          '&:hover': { color: '#c86030' },
        }}
      >
        ← Back to portal selection
      </Typography>
    </Box>
  );
}
