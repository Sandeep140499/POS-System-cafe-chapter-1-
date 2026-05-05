import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  /** Small uppercase orange label above the title */
  sectionLabel?: string;
  /** Element rendered on the right side of the header row */
  action?: ReactNode;
};

export default function CardHeaderText({ title, subtitle, sectionLabel, action }: Props) {
  return (
    <Box sx={{ mb: 2.5 }}>
      {sectionLabel && (
        <Typography
          variant="overline"
          color="primary.main"
          sx={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.08em", lineHeight: 1, mb: 0.5, fontWeight: "700" }}
        >
          {sectionLabel}
        </Typography>
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h5" color="text.primary" sx={{ lineHeight: 1.3, fontWeight: "700" }}>
          {title}
        </Typography>
        {action}
      </Box>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontWeight: "400" }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
