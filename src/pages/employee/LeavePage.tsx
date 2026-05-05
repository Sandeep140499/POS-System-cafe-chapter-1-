import { Box, Typography } from '@mui/material';

export default function LeavePage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Leave
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Manage your leave requests and history.
      </Typography>
    </Box>
  );
}
