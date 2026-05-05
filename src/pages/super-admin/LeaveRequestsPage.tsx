import { Box, Typography, Chip, Avatar, Button } from '@mui/material';
import PageHeader from 'components/common/PageHeader';

const requests = [
  {
    initials: 'SS',
    name: 'Shivam Sagar Mishra',
    id: 'CC100003',
    color: '#4caf50',
    type: 'Sick Leave',
    from: 'Apr 25, 2026',
    to: 'Apr 26, 2026',
    days: 2,
    status: 'PENDING',
  },
  {
    initials: 'SK',
    name: 'Suman Kumar',
    id: 'CC100004',
    color: '#ff9800',
    type: 'Casual Leave',
    from: 'Apr 28, 2026',
    to: 'Apr 28, 2026',
    days: 1,
    status: 'APPROVED',
  },
];

export default function LeaveRequestsPage() {
  return (
    <Box>
      <PageHeader
        label="LEAVE REQUESTS"
        title="Leave Requests"
        subtitle="Employee leave applications awaiting review."
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {requests.map(r => (
          <Box
            key={r.id}
            sx={{
              bgcolor: '#fff',
              borderRadius: '20px',
              border: '1px solid #eae7e2',
              p: 2.5,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{ width: 40, height: 40, bgcolor: r.color, fontSize: 13, fontWeight: 700 }}
              >
                {r.initials}
              </Avatar>
              <Box>
                <Typography
                  sx={{
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: '#1a1a1a',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {r.name}
                </Typography>
                <Typography sx={{ fontSize: 12, color: '#999', fontFamily: 'Inter, sans-serif' }}>
                  {r.id} · {r.type}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                sx={{
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: '#333',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {r.from} → {r.to}
              </Typography>
              <Typography sx={{ fontSize: 12, color: '#888', fontFamily: 'Inter, sans-serif' }}>
                {r.days} {r.days === 1 ? 'day' : 'days'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Chip
                label={r.status}
                size="small"
                sx={{
                  bgcolor: r.status === 'PENDING' ? '#f5e6d8' : '#e3f0e8',
                  color: r.status === 'PENDING' ? '#9a5a20' : '#2e7d32',
                  fontWeight: 600,
                  fontSize: 11,
                  height: 24,
                  borderRadius: '12px',
                  fontFamily: 'Inter, sans-serif',
                }}
              />
              {r.status === 'PENDING' && (
                <>
                  <Button
                    size="small"
                    sx={{
                      bgcolor: '#e3f0e8',
                      color: '#2e7d32',
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontSize: 12,
                      fontFamily: 'Inter, sans-serif',
                      '&:hover': { bgcolor: '#c8e6c9' },
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    size="small"
                    sx={{
                      bgcolor: '#fce4e4',
                      color: '#c62828',
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontSize: 12,
                      fontFamily: 'Inter, sans-serif',
                      '&:hover': { bgcolor: '#ffcdd2' },
                    }}
                  >
                    Reject
                  </Button>
                </>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
