import { createTheme } from "@mui/material/styles";
import { palette } from "./palette";

export const theme = createTheme({
  palette,
  shape: {
    borderRadius: 12,
  },
  typography: {
    // Base font sizes by device
    // Mobile (< 768px): 14px
    // Tablet (768px - 991px): 15px
    // Desktop/Laptop (≥992px): 16px
    fontSize: 14,
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    
    // Body text: 400 (Regular)
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    
    // h1: 700-800 (Bold to Extra Bold)
    // Desktop: 2.5rem - 3rem (40-48px)
    // Tablet: 2rem - 2.5rem (32-40px)
    // Mobile: 1.75rem - 2rem (28-32px)
    h1: {
      fontWeight: 800,
      fontSize: "clamp(1.75rem, 4vw + 1rem, 3rem)",
      lineHeight: 1.2,
      '@media (max-width:768px)': {
        fontSize: "1.75rem",
      },
      '@media (min-width:768px) and (max-width:991px)': {
        fontSize: "2rem",
      },
      '@media (min-width:992px)': {
        fontSize: "2.5rem",
      },
      '@media (min-width:1200px)': {
        fontSize: "3rem",
      },
    },
    
    // h2: 600-700 (Semi-Bold to Bold)
    // Desktop: 2rem - 2.5rem (32-40px)
    // Tablet: 1.75rem - 2rem (28-32px)
    // Mobile: 1.5rem - 1.75rem (24-28px)
    h2: {
      fontWeight: 700,
      fontSize: "clamp(1.5rem, 3vw + 1rem, 2.5rem)",
      lineHeight: 1.25,
      '@media (max-width:768px)': {
        fontSize: "1.5rem",
      },
      '@media (min-width:768px) and (max-width:991px)': {
        fontSize: "1.75rem",
      },
      '@media (min-width:992px)': {
        fontSize: "2rem",
      },
      '@media (min-width:1200px)': {
        fontSize: "2.5rem",
      },
    },
    
    // h3: 600-700 (Semi-Bold to Bold)
    // Desktop: 1.75rem - 2rem (28-32px)
    // Tablet: 1.5rem - 1.75rem (24-28px)
    // Mobile: 1.25rem - 1.5rem (20-24px)
    h3: {
      fontWeight: 600,
      fontSize: "clamp(1.25rem, 2vw + 1rem, 2rem)",
      lineHeight: 1.3,
      '@media (max-width:768px)': {
        fontSize: "1.25rem",
      },
      '@media (min-width:768px) and (max-width:991px)': {
        fontSize: "1.5rem",
      },
      '@media (min-width:992px)': {
        fontSize: "1.75rem",
      },
      '@media (min-width:1200px)': {
        fontSize: "2rem",
      },
    },
    
    // h4: 500-600 (Medium to Semi-Bold)
    // Desktop: 1.5rem - 1.75rem (24-28px)
    // Tablet: 1.25rem - 1.5rem (20-24px)
    // Mobile: 1.125rem - 1.25rem (18-20px)
    h4: {
      fontWeight: 600,
      fontSize: "clamp(1.125rem, 1.5vw + 1rem, 1.75rem)",
      lineHeight: 1.35,
      '@media (max-width:768px)': {
        fontSize: "1.125rem",
      },
      '@media (min-width:768px) and (max-width:991px)': {
        fontSize: "1.25rem",
      },
      '@media (min-width:992px)': {
        fontSize: "1.5rem",
      },
      '@media (min-width:1200px)': {
        fontSize: "1.75rem",
      },
    },
    
    // h5: 500-600 (Medium to Semi-Bold)
    // Desktop: 1.25rem - 1.5rem (20-24px)
    // Tablet: 1.125rem - 1.25rem (18-20px)
    // Mobile: 1rem - 1.125rem (16-18px)
    h5: {
      fontWeight: 600,
      fontSize: "clamp(1rem, 1vw + 1rem, 1.5rem)",
      lineHeight: 1.4,
      '@media (max-width:768px)': {
        fontSize: "1rem",
      },
      '@media (min-width:768px) and (max-width:991px)': {
        fontSize: "1.125rem",
      },
      '@media (min-width:992px)': {
        fontSize: "1.25rem",
      },
      '@media (min-width:1200px)': {
        fontSize: "1.5rem",
      },
    },
    
    // h6: 500-600 (Medium to Semi-Bold)
    // Desktop: 1rem - 1.25rem (16-20px)
    // Tablet: 1rem (16px)
    // Mobile: 0.875rem - 1rem (14-16px)
    h6: {
      fontWeight: 600,
      fontSize: "clamp(0.875rem, 0.5vw + 1rem, 1.25rem)",
      lineHeight: 1.4,
      '@media (max-width:768px)': {
        fontSize: "0.875rem",
      },
      '@media (min-width:768px) and (max-width:991px)': {
        fontSize: "1rem",
      },
      '@media (min-width:992px)': {
        fontSize: "1rem",
      },
      '@media (min-width:1200px)': {
        fontSize: "1.25rem",
      },
    },
    
    subtitle1: {
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      fontSize: "0.875rem",
      lineHeight: 1.75,
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.66,
    },
    overline: {
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 2.66,
      letterSpacing: "0.08333em",
      textTransform: "uppercase",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 10,
        },
        contained: {
          backgroundColor: '#c86030',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#a8502a',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
          },
        },
      },
    },
  },
});
