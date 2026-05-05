import { Box, Typography } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import PageHeader from "components/common/PageHeader";
import SectionPaperCard from "components/base/SectionPaperCard";
import { useNavigate } from "react-router-dom";

const cards = [
  { label: "All Orders", to: "/super-admin/all-orders", icon: <ShoppingCartOutlinedIcon sx={{ fontSize: 28, color: "#c86030" }} />, desc: "View every ticket served today." },
  { label: "Menu", to: "/super-admin/menu", icon: <RestaurantMenuIcon sx={{ fontSize: 28, color: "#c86030" }} />, desc: "Manage products and pricing." },
  { label: "Happy Hour Offers", to: "/super-admin/happy-hour", icon: <AutoAwesomeOutlinedIcon sx={{ fontSize: 28, color: "#c86030" }} />, desc: "Configure promotional discounts." },
  { label: "Customer Leaderboard", to: "/super-admin/customer-leaderboard", icon: <EmojiEventsOutlinedIcon sx={{ fontSize: 28, color: "#c86030" }} />, desc: "Top customers by spend." },
  { label: "Removed Items", to: "/super-admin/removed-items", icon: <DeleteOutlineRoundedIcon sx={{ fontSize: 28, color: "#c86030" }} />, desc: "Cancelled or removed order items." },
  { label: "Raised Requests", to: "/super-admin/raised-requests", icon: <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 28, color: "#c86030" }} />, desc: "Customer and staff escalations." },
];

export default function OperationsPage() {
  const navigate = useNavigate();

  return (
    <Box>
      <PageHeader label="OPERATIONS" title="Operations" />
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 2 }}>
        {cards.map((c) => (
          <SectionPaperCard
            key={c.label}
            sx={{ cursor: "pointer", transition: "box-shadow 0.2s", "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.06)" } }}
            onClick={() => navigate(c.to)}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
              <Box sx={{ width: 44, height: 44, borderRadius: "12px", bgcolor: "#f5f3ef", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {c.icon}
              </Box>
              <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", fontFamily: "Inter, sans-serif" }}>{c.label}</Typography>
            </Box>
            <Typography sx={{ fontSize: 13, color: "#999", fontFamily: "Inter, sans-serif" }}>{c.desc}</Typography>
          </SectionPaperCard>
        ))}
      </Box>
    </Box>
  );
}
