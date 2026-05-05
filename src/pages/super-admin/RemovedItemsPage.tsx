import { Box, Typography } from "@mui/material";

export default function RemovedItemsPage() {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Removed Items
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Track and manage discontinued or removed menu items.
      </Typography>
    </Box>
  );
}
