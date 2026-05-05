import { Box, Typography } from "@mui/material";

export default function AllOrdersPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        All Orders
      </Typography>
      <Typography variant="body1" color="text.secondary">
        View complete order history.
      </Typography>
    </Box>
  );
}
