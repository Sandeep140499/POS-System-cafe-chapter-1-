import { Box, Typography } from "@mui/material";

export default function PaidPendingPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Paid & Pending
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Track payment status of orders.
      </Typography>
    </Box>
  );
}
