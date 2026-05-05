import { Box, Typography } from '@mui/material';

export default function AddOrderPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Add Order
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Create new customer orders.
      </Typography>
    </Box>
  );
}
