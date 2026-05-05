import { Box, Typography, Divider } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function PrivacyPolicyPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f3ef", fontFamily: "Inter, sans-serif" }}>
      {/* ── HEADER ── */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          bgcolor: "rgba(245,243,239,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #e8e4de",
          px: { xs: 2, md: 5 },
          py: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mr: 2,
            textDecoration: "none",
          }}
        >
          <Box component="img" src="/logo.png" alt="Cafe Chapter 1" sx={{ width: 40, height: 40, objectFit: "contain" }} />
          <Box>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 13.5,
                color: "#1a1a1a",
                lineHeight: 1.1,
              }}
            >
              Cafe Chapter 1
            </Typography>
            <Typography
              sx={{
                fontSize: 8.5,
                color: "#999",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              RESTRO PVT. LTD.
            </Typography>
          </Box>
        </Box>

        <Typography
          component={RouterLink}
          to="/"
          sx={{
            fontSize: 14,
            color: "#555",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            ml: "auto",
            "&:hover": { color: "#1a1a1a" },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          Back to Menu
        </Typography>
      </Box>

      {/* ── MAIN CONTENT ── */}
      <Box sx={{ maxWidth: 800, mx: "auto", px: { xs: 3, md: 5 }, py: 5 }}>
        {/* Logo & Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Box
            component="img"
            src="/logo.png"
            alt="Cafe Chapter 1 Logo"
            sx={{ width: 80, height: 80, objectFit: "contain" }}
          />
          <Box>
            <Typography
              sx={{
                fontSize: 22,
                fontWeight: 700,
                color: "#1a1a1a",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Privacy Policy
            </Typography>
            <Typography sx={{ fontSize: 14, color: "#888" }}>
              Cafe Chapter 1 Restaurant Pvt. Ltd.
            </Typography>
          </Box>
        </Box>

        <Typography sx={{ fontSize: 13, color: "#666", mb: 4, lineHeight: 1.7 }}>
          Last updated: April 2026
        </Typography>

        <Divider sx={{ borderColor: "#e8e4de", mb: 4 }} />

        {/* Section 1 */}
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: "#1a1a1a",
            mb: 2,
            fontFamily: "Inter, sans-serif",
          }}
        >
          1. Information We Collect
        </Typography>
        <Typography sx={{ fontSize: 14, color: "#555", mb: 3, lineHeight: 1.7 }}>
          When you place an order through our table ordering system, we collect the
          following information:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 3 }}>
          <Typography component="li" sx={{ fontSize: 14, color: "#555", mb: 1, lineHeight: 1.7 }}>
            <strong>Your Name</strong> — to identify your order
          </Typography>
          <Typography component="li" sx={{ fontSize: 14, color: "#555", mb: 1, lineHeight: 1.7 }}>
            <strong>Phone Number</strong> — to notify you when your order is ready
          </Typography>
          <Typography component="li" sx={{ fontSize: 14, color: "#555", mb: 1, lineHeight: 1.7 }}>
            <strong>Table Number</strong> — to deliver your order to the correct table
          </Typography>
        </Box>

        {/* Section 2 */}
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: "#1a1a1a",
            mb: 2,
            mt: 4,
            fontFamily: "Inter, sans-serif",
          }}
        >
          2. How We Use Your Information
        </Typography>
        <Typography sx={{ fontSize: 14, color: "#555", mb: 3, lineHeight: 1.7 }}>
          We use your personal information solely for the purpose of processing your
          order within our restaurant. Specifically:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 3 }}>
          <Typography component="li" sx={{ fontSize: 14, color: "#555", mb: 1, lineHeight: 1.7 }}>
            To prepare and deliver your order to the correct table
          </Typography>
          <Typography component="li" sx={{ fontSize: 14, color: "#555", mb: 1, lineHeight: 1.7 }}>
            To contact you via phone when your order is ready for pickup or delivery to your table
          </Typography>
          <Typography component="li" sx={{ fontSize: 14, color: "#555", mb: 1, lineHeight: 1.7 }}>
            To maintain records of orders for operational and accounting purposes
          </Typography>
        </Box>

        {/* Section 3 */}
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: "#1a1a1a",
            mb: 2,
            mt: 4,
            fontFamily: "Inter, sans-serif",
          }}
        >
          3. Data Sharing
        </Typography>
        <Typography sx={{ fontSize: 14, color: "#555", mb: 3, lineHeight: 1.7 }}>
          <strong>We do not share your data with any third parties.</strong> Your
          information is used exclusively within Cafe Chapter 1 Restaurant Pvt. Ltd.
          for order processing purposes. We do not sell, rent, or trade your personal
          information to any external organizations.
        </Typography>

        {/* Section 4 */}
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: "#1a1a1a",
            mb: 2,
            mt: 4,
            fontFamily: "Inter, sans-serif",
          }}
        >
          4. Data Retention
        </Typography>
        <Typography sx={{ fontSize: 14, color: "#555", mb: 3, lineHeight: 1.7 }}>
          We retain your order information for a reasonable period necessary for
          business operations, accounting, and legal compliance. Typically, order
          records are retained for up to one year, after which they are securely
          deleted or anonymized.
        </Typography>

        {/* Section 5 */}
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: "#1a1a1a",
            mb: 2,
            mt: 4,
            fontFamily: "Inter, sans-serif",
          }}
        >
          5. Your Rights
        </Typography>
        <Typography sx={{ fontSize: 14, color: "#555", mb: 3, lineHeight: 1.7 }}>
          You have the right to:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 3 }}>
          <Typography component="li" sx={{ fontSize: 14, color: "#555", mb: 1, lineHeight: 1.7 }}>
            Request access to the personal information we hold about you
          </Typography>
          <Typography component="li" sx={{ fontSize: 14, color: "#555", mb: 1, lineHeight: 1.7 }}>
            Request correction of any inaccurate information
          </Typography>
          <Typography component="li" sx={{ fontSize: 14, color: "#555", mb: 1, lineHeight: 1.7 }}>
            Request deletion of your personal information
          </Typography>
        </Box>

        {/* Section 6 */}
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: "#1a1a1a",
            mb: 2,
            mt: 4,
            fontFamily: "Inter, sans-serif",
          }}
        >
          6. Contact Us
        </Typography>
        <Typography sx={{ fontSize: 14, color: "#555", mb: 3, lineHeight: 1.7 }}>
          If you have any questions about this Privacy Policy or how we handle your
          data, please contact us:
        </Typography>
        <Box sx={{ bgcolor: "#faf9f7", borderRadius: "12px", p: 3, mb: 3 }}>
          <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", mb: 1 }}>
            Cafe Chapter 1 Restaurant Pvt. Ltd.
          </Typography>
          <Typography sx={{ fontSize: 13, color: "#666", mb: 0.5 }}>
            📍 135/3, Gautam Nagar, Yusuf Sarai, New Delhi, Delhi 110049
          </Typography>
          <Typography sx={{ fontSize: 13, color: "#666", mb: 0.5 }}>
            📞 +91-7800327061
          </Typography>
          <Typography sx={{ fontSize: 13, color: "#666" }}>
            ✉ chapteronecafe11@gmail.com
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "#e8e4de", my: 4 }} />

        <Typography sx={{ fontSize: 12, color: "#bbb", textAlign: "center" }}>
          © 2023 Cafe Chapter 1 Restaurant Pvt. Ltd. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
