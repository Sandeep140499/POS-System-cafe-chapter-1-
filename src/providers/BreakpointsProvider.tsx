import { createContext, useContext, useMemo, type ReactNode } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

type BreakpointsContextValue = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

const BreakpointsContext = createContext<BreakpointsContextValue | null>(null);

export function BreakpointsProvider({ children }: { children: ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "lg"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const value = useMemo(
    () => ({ isMobile, isTablet, isDesktop }),
    [isDesktop, isMobile, isTablet],
  );

  return <BreakpointsContext.Provider value={value}>{children}</BreakpointsContext.Provider>;
}

export function useBreakpoints() {
  const context = useContext(BreakpointsContext);
  if (!context) {
    throw new Error("useBreakpoints must be used within BreakpointsProvider");
  }
  return context;
}
