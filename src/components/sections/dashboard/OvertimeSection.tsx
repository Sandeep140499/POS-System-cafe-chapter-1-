import { Box, Typography, Avatar } from '@mui/material';
import SectionPaperCard from 'components/base/SectionPaperCard';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';

export default function OvertimeSection() {
  return (
    <SectionPaperCard>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 10.5,
              fontWeight: 700,
              color: '#c86030',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              mb: 0.3,
            }}
          >
            OVERTIME RUNNING
          </Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a' }}>
            1 over 10h
          </Typography>
        </Box>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            bgcolor: '#f7e8e3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AccessTimeRoundedIcon sx={{ fontSize: 16, color: '#c86030' }} />
        </Box>
      </Box>

      <Typography sx={{ fontSize: 12.5, color: '#888', mb: 2, lineHeight: 1.5 }}>
        These employees have been on shift for more than 10 hours.
      </Typography>

      {/* Employee card */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1.5,
          borderRadius: 2.5,
          bgcolor: '#f5f3ef',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 34, height: 34, bgcolor: '#8d6e63', fontSize: 12, fontWeight: 600 }}>
            ST
          </Avatar>
          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.3 }}>
              Shweta Tiwari
            </Typography>
            <Typography sx={{ fontSize: 10.5, color: '#999' }}>CC100002</Typography>
          </Box>
        </Box>
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
          90 hr 41 min
        </Typography>
      </Box>
    </SectionPaperCard>
  );
}
