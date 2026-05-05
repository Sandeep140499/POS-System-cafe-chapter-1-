import { Box, Stack, Typography } from "@mui/material";
import SectionPaperCard from "components/base/SectionPaperCard";

import CardHeaderText from "components/common/CardHeaderText";

export default function FulfillmentSection() {
  return (
    <SectionPaperCard>
      <CardHeaderText title="Customer Fulfillment" subtitle=" " />
      <Box
        sx={{
          borderRadius: 3,
          p: 2.5,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "inset 0 2px 10px rgba(0,0,0,0.02)",
          minHeight: 250,
        }}
      >
        <Box
          sx={{
            position: "relative",
            height: 150,
            borderRadius: 2,
            bgcolor: "background.paper",
            overflow: "hidden",
            mb: 3,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(38, 171, 173, 0.24), rgba(38, 171, 173, 0.02)), linear-gradient(180deg, rgba(255, 255, 255, 0.18), transparent)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 18,
              left: 16,
              right: 16,
              height: 100,
              background:
                "linear-gradient(180deg, rgba(112, 148, 236, 0.45), transparent), linear-gradient(180deg, rgba(111, 95, 231, 0.35), transparent)",
              clipPath: "polygon(0 60%, 12% 50%, 24% 70%, 36% 40%, 48% 66%, 62% 35%, 76% 46%, 88% 28%, 100% 50%)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              left: 16,
              right: 16,
              height: 120,
              background:
                "linear-gradient(180deg, rgba(245, 190, 248, 0.32), transparent), linear-gradient(180deg, rgba(161, 237, 229, 0.16), transparent)",
              clipPath: "polygon(0 80%, 10% 58%, 22% 68%, 34% 52%, 46% 74%, 58% 58%, 70% 67%, 82% 40%, 94% 62%, 100% 48%)",
            }}
          />
        </Box>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="caption" color="text.secondary">
              This Month
            </Typography>
            <Typography variant="h6" color="common.white">
              $4,785
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">
              Last Month
            </Typography>
            <Typography variant="h6" color="common.white">
              $4,029
            </Typography>
          </Box>
        </Stack>
      </Box>
    </SectionPaperCard>
  );
}
