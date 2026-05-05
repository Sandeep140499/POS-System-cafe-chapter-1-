import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, Box, Button } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import type { ReactNode } from "react";

interface AppModalProps { open: boolean; onClose: () => void; title: string; subtitle?: string; children: ReactNode; actions?: ReactNode; maxWidth?: "xs"|"sm"|"md"|"lg"; }

export default function AppModal({ open, onClose, title, subtitle, children, actions, maxWidth = "sm" }: AppModalProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth sx={{ "& .MuiDialog-paper": { borderRadius: "20px", border: "1px solid #eae7e2", boxShadow: "0 8px 40px rgba(0,0,0,0.12)" } }}>
      <DialogTitle sx={{ pb: 0, pt: 2.5, px: 3, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <Box>
          <Typography sx={{ fontSize: 19, fontWeight: 700, color: "#1a1a1a", fontFamily: "Inter, sans-serif" }}>{title}</Typography>
          {subtitle && <Typography sx={{ fontSize: 13, color: "#888", mt: 0.3, fontFamily: "Inter, sans-serif" }}>{subtitle}</Typography>}
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ mt: -0.5, color: "#999" }}><CloseRoundedIcon sx={{ fontSize: 20 }} /></IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 3, pt: 2, pb: 0 }}>{children}</DialogContent>
      {actions && <DialogActions sx={{ px: 3, py: 2.5, gap: 1, borderTop: "1px solid #eae7e2", mt: 2 }}>{actions}</DialogActions>}
    </Dialog>
  );
}

export function ModalCancelBtn({ onClick }: { onClick: () => void }) {
  return <Button onClick={onClick} sx={{ color: "#555", border: "1px solid #e0ddd8", borderRadius: "10px", px: 2.5, py: 0.8, textTransform: "none", fontSize: 13.5, fontFamily: "Inter, sans-serif", "&:hover": { bgcolor: "#f5f3ef" } }}>Cancel</Button>;
}

export function ModalSubmitBtn({ children, loading }: { children: ReactNode; loading?: boolean }) {
  return <Button type="submit" sx={{ bgcolor: "#1a1a1a", color: "#fff", borderRadius: "10px", px: 2.5, py: 0.8, textTransform: "none", fontSize: 13.5, fontWeight: 600, fontFamily: "Inter, sans-serif", "&:hover": { bgcolor: "#333" } }}>{loading ? "Saving..." : children}</Button>;
}
