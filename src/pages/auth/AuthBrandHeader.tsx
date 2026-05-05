import { Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

type AuthBrandHeaderProps = {
  title: string;
  subtitle?: ReactNode;
};

export default function AuthBrandHeader({ title, subtitle }: AuthBrandHeaderProps) {
  return (
    <Stack spacing={1.1} sx={{ alignItems: "center" }}>
      <Typography sx={{ fontSize: 24, fontWeight: 700, color: "#f5f7ff", lineHeight: 1.1 }}>{title}</Typography>
      {subtitle ? (
        <Typography sx={{ color: "rgba(214,219,235,0.7)", textAlign: "center", fontSize: 13 }}>{subtitle}</Typography>
      ) : null}
    </Stack>
  );
}
