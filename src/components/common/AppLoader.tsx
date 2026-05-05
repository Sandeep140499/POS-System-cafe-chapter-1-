import { Box, CircularProgress, LinearProgress, Skeleton, Typography } from '@mui/material';
import type React from 'react';

export type LoaderProps = {
  size?: number | 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
  thickness?: number;
};

export default function AppLoader({ size = 40, color = 'primary', thickness = 3.6 }: LoaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <CircularProgress size={size} color={color} thickness={thickness} />
    </Box>
  );
}

export function FullPageLoader({ message }: { message?: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        gap: 2,
      }}
    >
      <CircularProgress size={48} color="primary" />
      {message && (
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      )}
    </Box>
  );
}

export function InlineLoader({ size = 20 }: { size?: number }) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        ml: 1,
      }}
    >
      <CircularProgress size={size} color="inherit" thickness={2} />
    </Box>
  );
}

export function ButtonLoader() {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      <CircularProgress size={16} color="inherit" thickness={2} />
    </Box>
  );
}

export function LinearLoader({
  color = 'primary',
}: {
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit';
}) {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress color={color} />
    </Box>
  );
}

export function TableLoader({ rows = 5 }: { rows?: number }) {
  return (
    <Box sx={{ p: 2 }}>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={40} sx={{ mb: 1, borderRadius: 1 }} />
      ))}
    </Box>
  );
}

export function CardLoader() {
  return (
    <Box sx={{ p: 3 }}>
      <Skeleton variant="text" height={32} width="60%" sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
    </Box>
  );
}

export function ContentLoader() {
  return (
    <Box sx={{ p: 3 }}>
      <Skeleton variant="text" height={40} width="40%" sx={{ mb: 2 }} />
      <Skeleton variant="text" height={20} width="80%" sx={{ mb: 1 }} />
      <Skeleton variant="text" height={20} width="60%" sx={{ mb: 1 }} />
      <Skeleton variant="text" height={20} width="70%" />
    </Box>
  );
}

export function SkeletonAvatar({ size = 40 }: { size?: number }) {
  return <Skeleton variant="circular" width={size} height={size} />;
}

export function SkeletonText({
  lines = 1,
  width = '100%',
}: {
  lines?: number;
  width?: string | number;
}) {
  return (
    <>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} variant="text" width={width} sx={{ mb: i < lines - 1 ? 0.5 : 0 }} />
      ))}
    </>
  );
}
