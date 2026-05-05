import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // TODO: Replace with actual authentication check (e.g., check token in localStorage, context, or Redux)
  const isAuthenticated = localStorage.getItem("authToken") !== null;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}
