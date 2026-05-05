import { Box, Typography, Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function DashboardHeader() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).toLowerCase();

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 2 }}>
      <Box>
        <Typography
          sx={{
            color: "#c86030",
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            mb: 0.5,
            fontFamily: "Inter, sans-serif",
          }}
        >
          TODAY'S DASHBOARD
        </Typography>
        <Typography sx={{ fontSize: 26, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.2, fontFamily: "Inter, sans-serif" }}>
          {dateStr}
          <Typography component="span" sx={{ fontSize: 26, fontWeight: 400, color: "#999", ml: 0.5, fontFamily: "Inter, sans-serif" }}>
            · {timeStr}
          </Typography>
        </Typography>
      </Box>
      <Button
        variant="outlined"
        startIcon={<RefreshIcon sx={{ fontSize: 14 }} />}
        sx={{
          bgcolor: "#fff",
          color: "#555",
          borderColor: "#e0ddd8",
          borderRadius: "18px",
          px: 2,
          py: 0.5,
          textTransform: "none",
          fontWeight: 500,
          fontSize: 12,
          minHeight: 32,
          boxShadow: "none",
          fontFamily: "Inter, sans-serif",
          "&:hover": { bgcolor: "#fafafa", borderColor: "#ccc" },
        }}
      >
        Refresh
      </Button>
    </Box>
  );
}
