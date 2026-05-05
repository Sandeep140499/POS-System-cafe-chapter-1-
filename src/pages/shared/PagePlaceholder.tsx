import { Box, Button, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type PagePlaceholderProps = {
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
};

export default function PagePlaceholder({
  title,
  description,
  actionLabel,
  actionTo,
}: PagePlaceholderProps) {
  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 120px)',
        display: 'grid',
        placeItems: 'center',
        px: 2,
      }}
    >
      <Stack spacing={2} sx={{ maxWidth: 700 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
        {actionLabel && actionTo ? (
          <Button
            component={RouterLink}
            to={actionTo}
            variant="contained"
            sx={{ width: 'fit-content' }}
          >
            {actionLabel}
          </Button>
        ) : null}
      </Stack>
    </Box>
  );
}
