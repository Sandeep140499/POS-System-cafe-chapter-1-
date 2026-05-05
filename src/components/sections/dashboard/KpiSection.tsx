import { Box, Stack, Typography } from "@mui/material";
import SectionPaperCard from "components/base/SectionPaperCard";
import CardHeaderText from "components/common/CardHeaderText";

export default function KpiSection() {
  const bars = [68, 75, 65, 48, 72, 85];
  const maxValue = Math.max(...bars);

  return (
    <SectionPaperCard>
      <CardHeaderText title="Level" subtitle=" " />
      <Box
        sx={{
          borderRadius: 3,
          p: 2.5,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "inset 0 2px 10px rgba(0,0,0,0.02)",
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-end", justifyContent: "space-around" }}>
          {bars.map((value, idx) => (
            <Stack
              key={idx}
              sx={{
                width: 20,
                height: 120,
                borderRadius: "8px",
                bgcolor: "background.default",
                justifyContent: "flex-end",
                position: "relative",
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box
                sx={{
                  height: `${(value / maxValue) * 100}%`,
                  borderRadius: "6px",
                  background: idx % 2 
                    ? "linear-gradient(180deg, #42a5f5, #1e88e5)" 
                    : "linear-gradient(180deg, #ab47bc, #8e24aa)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    filter: "brightness(1.1)",
                    boxShadow: "0 0 8px rgba(0,0,0,0.2)",
                  },
                }}
              />
            </Stack>
          ))}
        </Stack>
        <Stack direction="row" sx={{ mt: 2, justifyContent: "space-between" }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            Volume
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            Service
          </Typography>
        </Stack>
      </Box>
    </SectionPaperCard>
  );
}
