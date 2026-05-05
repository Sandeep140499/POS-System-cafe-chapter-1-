import { useState } from "react";
import { Box, Typography, TextField, Button, IconButton, InputAdornment, Divider } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { paths } from "routes/paths";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (email === "admin@test.com" && password === "admin123") {
        localStorage.setItem("authToken", "mock-admin-token");
        localStorage.setItem("userRole", "super-admin");
        navigate(paths.superAdmin.root);
      } else if (email === "employee@test.com" && password === "employee123") {
        localStorage.setItem("authToken", "mock-employee-token");
        localStorage.setItem("userRole", "employee");
        navigate(paths.employee.root);
      } else {
        setError("Invalid email or password. Try admin@test.com / admin123");
      }
    }, 600);
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      bgcolor: "#faf9f7",
      fontSize: 14,
      fontFamily: "Inter, sans-serif",
      "& fieldset": { borderColor: "#e8e4de" },
      "&:hover fieldset": { borderColor: "#c86030" },
      "&.Mui-focused fieldset": { borderColor: "#c86030", borderWidth: 1.5 },
    },
    "& .MuiInputLabel-root": { fontFamily: "Inter, sans-serif", fontSize: 13.5 },
    "& .MuiInputLabel-root.Mui-focused": { color: "#c86030" },
  };

  return (
    <Box component="form" onSubmit={handleLogin}>
      {/* Header */}
      <Typography
        sx={{
          fontSize: 22,
          fontWeight: 700,
          color: "#1a1a1a",
          mb: 0.5,
          fontFamily: "Inter, sans-serif",
        }}
      >
        Welcome back
      </Typography>
      <Typography sx={{ fontSize: 13.5, color: "#888", mb: 3, fontFamily: "Inter, sans-serif" }}>
        Sign in to your Cafe Chapter 1 account
      </Typography>

      {/* Fields */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2.5 }}>
        <TextField
          label="Email address"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={inputSx}
          placeholder="admin@test.com"
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          sx={inputSx}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                    {showPassword
                      ? <VisibilityOutlinedIcon sx={{ fontSize: 18, color: "#999" }} />
                      : <VisibilityOffOutlinedIcon sx={{ fontSize: 18, color: "#999" }} />
                    }
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      {/* Error */}
      {error && (
        <Box sx={{ bgcolor: "#fef3f0", border: "1px solid #fcd5c8", borderRadius: "10px", px: 2, py: 1.2, mb: 2 }}>
          <Typography sx={{ fontSize: 13, color: "#c86030", fontFamily: "Inter, sans-serif" }}>{error}</Typography>
        </Box>
      )}

      {/* Forgot password */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2.5 }}>
        <Typography
          component={RouterLink}
          to={paths.auth.forgotPassword}
          sx={{ fontSize: 13, color: "#c86030", textDecoration: "none", fontFamily: "Inter, sans-serif", "&:hover": { textDecoration: "underline" } }}
        >
          Forgot password?
        </Typography>
      </Box>

      {/* Submit */}
      <Button
        type="submit"
        fullWidth
        disabled={loading}
        sx={{
          bgcolor: "#1a1a1a",
          color: "#fff",
          borderRadius: "12px",
          py: 1.4,
          fontSize: 14,
          fontWeight: 600,
          textTransform: "none",
          fontFamily: "Inter, sans-serif",
          mb: 2,
          "&:hover": { bgcolor: "#333" },
          "&:disabled": { bgcolor: "#ccc" },
        }}
      >
        {loading ? "Signing in..." : "Sign in"}
      </Button>

      {/* Divider */}
      <Divider sx={{ mb: 2, borderColor: "#eae7e2" }}>
        <Typography sx={{ fontSize: 12, color: "#bbb", px: 1, fontFamily: "Inter, sans-serif" }}>or</Typography>
      </Divider>

      {/* Demo credentials */}
      <Box sx={{ bgcolor: "#f5f3ef", borderRadius: "12px", px: 2, py: 1.5 }}>
        <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: "0.06em", mb: 1, fontFamily: "Inter, sans-serif" }}>
          Demo Credentials
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
          {[
            { role: "Admin", email: "admin@test.com", pass: "admin123" },
            { role: "Employee", email: "employee@test.com", pass: "employee123" },
          ].map((c) => (
            <Button
              key={c.role}
              size="small"
              onClick={() => { setEmail(c.email); setPassword(c.pass); }}
              sx={{
                bgcolor: "#fff",
                color: "#555",
                borderRadius: "10px",
                border: "1px solid #e8e4de",
                textTransform: "none",
                fontSize: 12,
                fontFamily: "Inter, sans-serif",
                py: 0.8,
                "&:hover": { bgcolor: "#faf9f7", borderColor: "#c86030", color: "#c86030" },
              }}
            >
              {c.role}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
