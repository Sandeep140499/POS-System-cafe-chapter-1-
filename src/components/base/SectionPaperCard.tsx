import { Paper } from "@mui/material";
import type { ReactNode, MouseEvent } from "react";
import type { SxProps, Theme } from "@mui/material/styles";

type Props = {
  children: ReactNode;
  sx?: SxProps<Theme>;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
};

export default function SectionPaperCard({ children, sx, onClick }: Props) {
  return (
    <Paper
      elevation={0}
      onClick={onClick}
      sx={{
        p: { xs: 2, sm: 2.5 },
        bgcolor: "#fff",
        borderRadius: "20px",
        border: "1px solid #eae7e2",
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}
