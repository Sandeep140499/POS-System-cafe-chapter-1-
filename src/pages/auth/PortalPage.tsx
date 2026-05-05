import { Box, Typography, IconButton } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";

const portals = [
  {
    id: "admin",
    label: "Admin",
    desc: "Operate the entire restaurant — revenue, staff, menu, finance.",
    icon: <ShieldOutlinedIcon sx={{ fontSize: 22, color: "#fff" }} />,
    iconBg: "#2a2725",
    to: "/auth/login",
  },
  {
    id: "employee",
    label: "Employee",
    desc: "Start a shift, take live orders, manage your day.",
    icon: <RoomServiceOutlinedIcon sx={{ fontSize: 22, color: "#fff" }} />,
    iconBg: "#c86030",
    to: "/auth/login",
  },
];

export default function PortalPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f3ef",
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2.5, md: 4 },
          py: 2,
          borderBottom: "1px solid #e8e4de",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 0.5 }}>
            <ArrowBackIcon sx={{ fontSize: 20, color: "#555" }} />
          </IconButton>
          <Box component="img" src="/logo.png" alt="Cafe Chapter 1" sx={{ width: 40, height: 40, objectFit: "contain" }} />
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a", lineHeight: 1.1, fontFamily: "Inter, sans-serif" }}>
              Cafe Chapter 1
            </Typography>
            <Typography sx={{ fontSize: 9, color: "#999", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>
              RESTRO PVT. LTD.
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ fontSize: 11, fontWeight: 700, color: "#999", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>
          STAFF ACCESS
        </Typography>
      </Box>

      {/* Main content */}
      <Box
        sx={{
          flex: 1,
          px: { xs: 2.5, sm: 4, md: 8 },
          py: { xs: 4, md: 7 },
          maxWidth: 1100,
          mx: "auto",
          width: "100%",
        }}
      >
        {/* Heading */}
        <Typography
          sx={{
            fontSize: 10.5,
            fontWeight: 700,
            color: "#c86030",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            mb: 2,
            fontFamily: "Inter, sans-serif",
          }}
        >
          CAFE CHAPTER 1 RESTRO PVT. LTD.
        </Typography>

        <Typography sx={{ fontSize: 15, color: "#666", mb: { xs: 4, md: 6 }, maxWidth: 420, lineHeight: 1.6, fontFamily: "Inter, sans-serif" }}>
          Select your role to access the system.
        </Typography>

        {/* Portal cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
            gap: { xs: 2, md: 2.5 },
          }}
        >
          {portals.map((p) => (
            <Box
              key={p.id}
              sx={{
                bgcolor: "#fff",
                borderRadius: "16px",
                border: "1px solid #e8e4de",
                p: { xs: 2.5, md: 3 },
                display: "flex",
                flexDirection: "column",
                gap: 2,
                transition: "box-shadow 0.2s, transform 0.2s",
                "&:hover": {
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {/* Icon */}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "12px",
                  bgcolor: p.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {p.icon}
              </Box>

              {/* Text */}
              <Box>
                <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", mb: 0.5, fontFamily: "Inter, sans-serif" }}>
                  {p.label}
                </Typography>
                <Typography sx={{ fontSize: 13.5, color: "#888", lineHeight: 1.5, fontFamily: "Inter, sans-serif" }}>
                  {p.desc}
                </Typography>
              </Box>

              {/* Enter portal link */}
              <Box
                component={RouterLink}
                to={p.to}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textDecoration: "none",
                  pt: 1,
                  borderTop: "1px solid #f0ede8",
                  color: "#1a1a1a",
                  "&:hover .arrow": { transform: "translate(2px, -2px)" },
                }}
              >
                <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>
                  ENTER PORTAL
                </Typography>
                <ArrowOutwardIcon className="arrow" sx={{ fontSize: 16, transition: "transform 0.15s" }} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
