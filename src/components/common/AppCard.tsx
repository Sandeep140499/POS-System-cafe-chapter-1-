import { Paper, PaperProps, Stack, Typography, Box } from "@mui/material";
import type React from "react";

export type AppCardProps = PaperProps & {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  headerSx?: React.CSSProperties;
  contentSx?: React.CSSProperties;
  noPadding?: boolean;
};

export default function AppCard({
  title,
  subtitle,
  action,
  children,
  headerSx,
  contentSx,
  noPadding = false,
  sx,
  ...props
}: AppCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        border: "1px solid rgba(255,255,255,0.04)",
        overflow: "hidden",
        ...sx,
      }}
      {...props}
    >
      {(title || action) && (
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            px: noPadding ? 0 : 3,
            py: noPadding ? 0 : 2,
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            ...headerSx,
          }}
        >
          <Box>
            {title && (
              <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1.1rem" }}>
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {action && <Box>{action}</Box>}
        </Stack>
      )}
      <Box sx={{ px: noPadding ? 0 : 3, py: noPadding ? 0 : 2, ...contentSx }}>
        {children}
      </Box>
    </Paper>
  );
}

export function AuthCard({ children, sx, ...props }: PaperProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, md: 3 },
        width: "100%",
        maxWidth: 420,
        mx: "auto",
        bgcolor: "#1b1f36",
        borderRadius: 2,
        border: "1px solid rgba(255,255,255,0.04)",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
}

export function DashboardCard({
  children,
  sx,
  ...props
}: PaperProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "#21222D",
        borderRadius: 3,
        p: 3,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
}

export function StatCard({
  title,
  value,
  trend,
  trendUp,
  icon,
  sx,
}: {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon?: React.ReactNode;
  sx?: React.CSSProperties;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "#21222D",
        borderRadius: 3,
        p: 2.5,
        ...sx,
      }}
    >
      <Stack spacing={1}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {title}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 700, fontSize: "1.75rem" }}>
          {value}
        </Typography>
        {trend && (
          <Typography
            variant="body2"
            sx={{
              color: trendUp ? "success.main" : "error.main",
            }}
          >
            {trendUp ? "↑" : "↓"} {trend}
          </Typography>
        )}
      </Stack>
    </Paper>
  );
}

export function InfoCard({
  title,
  description,
  action,
  sx,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
  sx?: React.CSSProperties;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        p: 3,
        ...sx,
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
        {action && <Box>{action}</Box>}
      </Stack>
    </Paper>
  );
}

export function ListCard({
  children,
  sx,
  ...props
}: PaperProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        overflow: "hidden",
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
}
