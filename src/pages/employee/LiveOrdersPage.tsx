import { Box, Typography } from '@mui/material';

export default function LiveOrdersPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Live Orders
      </Typography>
      <Typography variant="body1" color="text.secondary">
        View and manage active orders in real-time.
      </Typography>
    </Box>
  );
}
