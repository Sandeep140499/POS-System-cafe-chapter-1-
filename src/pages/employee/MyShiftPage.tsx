import { Box, Typography } from '@mui/material';

export default function MyShiftPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        My Shift
      </Typography>
      <Typography variant="body1" color="text.secondary">
        View your current shift details and schedule.
      </Typography>
    </Box>
  );
}
