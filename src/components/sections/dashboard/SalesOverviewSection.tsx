import { Box, Grid, Stack, Typography } from "@mui/material";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import SectionPaperCard from "components/base/SectionPaperCard";
import CardHeaderText from "components/common/CardHeaderText";
import { salesCards } from "data/dashboard";

export default function SalesOverviewSection() {
  return (
    <SectionPaperCard>
      <CardHeaderText title="Today's Sales" subtitle="Sales Summary" />
      <Grid container spacing={1.5}>
        {salesCards.map((item, idx) => (
          <Grid key={item.label} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Box
              sx={{
                borderRadius: 3,
                p: 1.5,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                minHeight: 'auto',
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  bgcolor: "background.paper",
                  transform: "translateY(-4px)",
                  boxShadow: "0px 8px 24px -8px rgba(0,0,0,0.12)",
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "3px",
                  background:
                    idx === 0
                      ? "linear-gradient(90deg, #ffa726, #fb8c00)" // warning
                      : idx === 1
                      ? "linear-gradient(90deg, #66bb6a, #43a047)" // success
                      : idx === 2
                      ? "linear-gradient(90deg, #ab47bc, #8e24aa)" // secondary
                      : "linear-gradient(90deg, #29b6f6, #039be5)", // info
                },
              }}
            >
              <Stack spacing={1}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    bgcolor:
                      idx === 0
                        ? "warning.lighter"
                        : idx === 1
                        ? "success.lighter"
                        : idx === 2
                        ? "secondary.lighter"
                        : "info.lighter",
                    color:
                      idx === 0
                        ? "warning.main"
                        : idx === 1
                        ? "success.main"
                        : idx === 2
                        ? "secondary.main"
                        : "info.main",
                    ...(idx === 0 && { bgcolor: 'rgba(255, 167, 38, 0.1)' }),
                    ...(idx === 1 && { bgcolor: 'rgba(102, 187, 106, 0.1)' }),
                    ...(idx === 2 && { bgcolor: 'rgba(171, 71, 188, 0.1)' }),
                    ...(idx === 3 && { bgcolor: 'rgba(41, 182, 246, 0.1)' }),
                  }}
                >
                  {idx === 0 && <AttachMoneyRoundedIcon fontSize="small" />}
                  {idx === 1 && <Inventory2OutlinedIcon fontSize="small" />}
                  {idx === 2 && <ShoppingBagOutlinedIcon fontSize="small" />}
                  {idx === 3 && <GroupOutlinedIcon fontSize="small" />}
                </Box>
                <Box>
                  <Typography variant="h6" color="text.primary" sx={{ mb: 0, fontWeight: "700" }}>
                    {item.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "500" }}>
                    {item.label}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: "primary.main", display: "inline-flex", alignItems: "center", fontWeight: "600" }}>
                  {item.delta}
                </Typography>
              </Stack>
            </Box>
          </Grid>
        ))}
      </Grid>
    </SectionPaperCard>
  );
}
