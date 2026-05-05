import { useState, useEffect } from 'react';
import { Box, Typography, LinearProgress, Chip } from '@mui/material';
import SectionPaperCard from 'components/base/SectionPaperCard';
import { getCurrentMonthTarget } from 'data/salesTargets';

export default function SalesTargetWidget() {
  const [current, setCurrent] = useState(getCurrentMonthTarget);

  useEffect(() => {
    const handler = () => setCurrent(getCurrentMonthTarget());
    window.addEventListener('storage', handler);
    const id = setInterval(handler, 2000);
    return () => {
      window.removeEventListener('storage', handler);
      clearInterval(id);
    };
  }, []);

  const month = current.month;
  const targetRaw = current.targetRaw || 0;
  const collectedRaw = current.collectedRaw || 0;
  const reached = targetRaw > 0 ? Math.min(100, Math.round((collectedRaw / targetRaw) * 100)) : 0;
  const daysLeft = Math.max(
    0,
    new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() -
      new Date().getDate()
  );

  const target = `₹${targetRaw.toLocaleString('en-IN')}`;
  const collected = `₹${collectedRaw.toLocaleString('en-IN')}`;

  const statusLabel =
    reached >= 100
      ? 'ACHIEVED'
      : reached >= 75
        ? 'ON TRACK'
        : reached >= 50
          ? 'BEHIND'
          : 'CRITICAL';
  const statusColor =
    reached >= 100 ? '#2e7d32' : reached >= 75 ? '#558b2f' : reached >= 50 ? '#f57c00' : '#c62828';
  const statusBg =
    reached >= 100 ? '#e3f0e8' : reached >= 75 ? '#e8f5e9' : reached >= 50 ? '#fff8e1' : '#fce4e4';

  const dailyPace =
    daysLeft > 0 && targetRaw > collectedRaw ? Math.ceil((targetRaw - collectedRaw) / daysLeft) : 0;

  return (
    <SectionPaperCard>
      {/* Header */}
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
            SALES TARGET
          </Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a' }}>{month}</Typography>
        </Box>
        <Chip
          label={statusLabel}
          size="small"
          sx={{
            bgcolor: statusBg,
            color: statusColor,
            fontWeight: 700,
            fontSize: 9,
            height: 22,
            letterSpacing: '0.04em',
            borderRadius: 2.5,
          }}
        />
      </Box>

      {/* Stats row */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 2, mt: 2.5, mb: 1.5 }}>
        {[
          { label: 'TARGET', value: target, color: '#1a1a1a' },
          { label: 'COLLECTED', value: collected, color: '#c86030' },
          { label: 'REACHED', value: `${reached}%`, color: '#1a1a1a' },
          { label: 'DAYS LEFT', value: String(daysLeft), color: '#1a1a1a' },
        ].map(s => (
          <Box key={s.label}>
            <Typography
              sx={{
                fontSize: 9.5,
                fontWeight: 600,
                color: '#999',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                mb: 0.3,
              }}
            >
              {s.label}
            </Typography>
            <Typography sx={{ fontSize: 20, fontWeight: 700, color: s.color, lineHeight: 1 }}>
              {s.value}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Progress bar */}
      <LinearProgress
        variant="determinate"
        value={reached}
        sx={{
          height: 5,
          borderRadius: 3,
          bgcolor: '#eeedea',
          mb: 1.5,
          '& .MuiLinearProgress-bar': {
            bgcolor: reached >= 100 ? '#2e7d32' : '#c86030',
            borderRadius: 3,
          },
        }}
      />

      {/* Pace text */}
      <Typography sx={{ fontSize: 11.5, color: '#888', lineHeight: 1.5 }}>
        {daysLeft > 0 && dailyPace > 0
          ? `To reach goal (paid sales): ~₹${dailyPace.toLocaleString('en-IN')} per day on average over the next ${daysLeft} calendar days (linear pace).`
          : reached >= 100
            ? 'Monthly target achieved! Great work.'
            : 'No target set or month ended.'}
      </Typography>
    </SectionPaperCard>
  );
}
