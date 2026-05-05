import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

type PageHeaderProps = {
  label: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export default function PageHeader({ label, title, subtitle, action }: PageHeaderProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 1.5 }}>
        <Box>
          <Typography
            sx={{
              color: "#c86030",
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              mb: 0.5,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {label}
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 26, md: 34 },
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.15,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              sx={{
                fontSize: { xs: 13, md: 14 },
                color: "#888",
                mt: 0.5,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
        {action && <Box sx={{ mt: 0.5 }}>{action}</Box>}
      </Box>
    </Box>
  );
}
