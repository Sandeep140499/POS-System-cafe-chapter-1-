import { Box, Stack, Typography } from '@mui/material';
import SectionPaperCard from 'components/base/SectionPaperCard';
import CardHeaderText from 'components/common/CardHeaderText';

export default function EndOfDaySummarySection() {
  const summaries = [
    { label: 'Total Orders', value: '0' },
    { label: 'Total Revenue', value: '₹0' },
    { label: 'Pending', value: '0' },
    { label: 'Items Sold', value: '0' },
  ];

  return (
    <SectionPaperCard>
      <CardHeaderText title="End of Day Summary" subtitle="Daily closure metrics" />

      <Box sx={{ mt: 2 }}>
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
          {summaries.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 3,
                bgcolor: 'background.default',
                border: '1px solid',
                borderColor: 'divider',
                textAlign: 'center',
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5, fontWeight: '600' }}
              >
                {item.label}
              </Typography>
              <Typography variant="h5" color="text.primary" sx={{ fontWeight: '700' }}>
                {item.value}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </SectionPaperCard>
  );
}
