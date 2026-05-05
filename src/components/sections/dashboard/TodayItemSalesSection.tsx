import { Box, Typography } from "@mui/material";
import SectionPaperCard from "components/base/SectionPaperCard";
import HistoryIcon from "@mui/icons-material/History";

export default function TodayItemSalesSection() {
  return (
    <SectionPaperCard sx={{ height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a" }}>
          Today's Item Sales
        </Typography>
        <Typography sx={{ fontSize: 10, fontWeight: 600, color: "#999", letterSpacing: "0.06em", textTransform: "uppercase" }}>
          0 ITEMS SOLD
        </Typography>
      </Box>
      <Typography sx={{ fontSize: 12.5, color: "#888", mb: 4 }}>
        Today's orders, paid only
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 5 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            bgcolor: "#f5f3ef",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1.5,
          }}
        >
          <HistoryIcon sx={{ fontSize: 22, color: "#aaa" }} />
        </Box>
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", mb: 0.3 }}>
          No sales yet today
        </Typography>
        <Typography sx={{ fontSize: 11.5, color: "#999", textAlign: "center" }}>
          Item-level breakdown appears as orders are paid.
        </Typography>
      </Box>
    </SectionPaperCard>
  );
}
