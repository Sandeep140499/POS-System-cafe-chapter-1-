import { Box, Stack, Typography } from "@mui/material";
import SectionPaperCard from "components/base/SectionPaperCard";
import CardHeaderText from "components/common/CardHeaderText";
import { topProducts } from "data/dashboard";

export default function TopProductsSection() {
  return (
    <SectionPaperCard>
      <CardHeaderText title="Top Products" subtitle=" " />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "54px 1fr 1fr 100px",
          gap: 1.5,
          alignItems: "center",
          color: "text.secondary",
          mb: 2,
          px: 2,
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 600 }}>#</Typography>
        <Typography variant="caption" sx={{ fontWeight: 600 }}>Name</Typography>
        <Typography variant="caption" sx={{ fontWeight: 600 }}>Popularity</Typography>
        <Typography variant="caption" sx={{ fontWeight: 600 }}>Sales</Typography>
      </Box>
      <Box sx={{ display: "grid", gap: 1 }}>
        {topProducts.map((item, idx) => (
          <Box
            key={item.name}
            sx={{
              display: "grid",
              gridTemplateColumns: "54px 1fr 1fr 100px",
              gap: 1.5,
              alignItems: "center",
              p: 2,
              borderRadius: 3,
              transition: "background-color 0.2s ease",
              "&:hover": {
                bgcolor: "background.default",
              },
            }}
          >
            <Typography color="text.secondary" sx={{ fontWeight: 600 }}>{`0${idx + 1}`}</Typography>
            <Typography color="text.primary" sx={{ fontWeight: 600 }}>{item.name}</Typography>
            <Box sx={{ pr: 2 }}>
              <Box sx={{ height: 6, borderRadius: 999, bgcolor: "background.default", overflow: "hidden" }}>
                <Box
                  sx={{
                    height: "100%",
                    width: `${item.popularity}%`,
                    borderRadius: 999,
                    background:
                      idx === 0
                        ? "linear-gradient(90deg, #ffa726, #fb8c00)"
                        : idx === 1
                        ? "linear-gradient(90deg, #66bb6a, #43a047)"
                        : idx === 2
                        ? "linear-gradient(90deg, #29b6f6, #039be5)"
                        : "linear-gradient(90deg, #ab47bc, #8e24aa)",
                  }}
                />
              </Box>
            </Box>
            <Stack
              sx={{
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                bgcolor: "background.paper",
                border: 1,
                borderColor: "divider",
                width: "fit-content",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {item.sales}%
              </Typography>
            </Stack>
          </Box>
        ))}
      </Box>
    </SectionPaperCard>
  );
}
