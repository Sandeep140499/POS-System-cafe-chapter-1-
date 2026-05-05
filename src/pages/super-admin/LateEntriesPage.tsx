import {
  Box,
  Typography,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from '@mui/material';
import PageHeader from 'components/common/PageHeader';

const lateEntries = [
  {
    initials: 'ST',
    name: 'Shweta Tiwari',
    id: 'CC100002',
    color: '#8d6e63',
    scheduled: '03:30 pm',
    actual: '05:42 pm',
    late: '7 hr 42 min',
  },
  {
    initials: 'SK',
    name: 'Sandeep Kumar',
    id: 'CC100001',
    color: '#5c6bc0',
    scheduled: '03:30 pm',
    actual: '11:37 am',
    late: '1 hr 37 min',
  },
];

const hSx = {
  fontSize: 10,
  fontWeight: 700,
  color: '#999',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  borderBottom: '1px solid #eae7e2',
  py: 1.5,
  fontFamily: 'Inter, sans-serif',
};
const cSx = { borderBottom: '1px solid #eae7e2', py: 2, fontFamily: 'Inter, sans-serif' };

export default function LateEntriesPage() {
  return (
    <Box>
      <PageHeader
        label="LATE ENTRIES"
        title="Late Entries"
        subtitle="Employees who checked in after their scheduled shift time."
      />
      <Box
        sx={{
          bgcolor: '#fff',
          borderRadius: '20px',
          border: '1px solid #eae7e2',
          overflow: 'hidden',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={hSx}>Employee</TableCell>
                <TableCell sx={hSx}>Scheduled</TableCell>
                <TableCell sx={hSx}>Actual Login</TableCell>
                <TableCell sx={{ ...hSx, textAlign: 'right' }}>Late By</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lateEntries.map(e => (
                <TableRow
                  key={e.id}
                  sx={{ '&:hover': { bgcolor: '#faf9f7' }, '&:last-child td': { border: 0 } }}
                >
                  <TableCell sx={cSx}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: e.color,
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {e.initials}
                      </Avatar>
                      <Box>
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: '#1a1a1a',
                            fontFamily: 'Inter, sans-serif',
                          }}
                        >
                          {e.name}
                        </Typography>
                        <Typography
                          sx={{ fontSize: 11.5, color: '#999', fontFamily: 'Inter, sans-serif' }}
                        >
                          {e.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={cSx}>
                    <Typography
                      sx={{ fontSize: 14, color: '#333', fontFamily: 'Inter, sans-serif' }}
                    >
                      {e.scheduled}
                    </Typography>
                  </TableCell>
                  <TableCell sx={cSx}>
                    <Typography
                      sx={{ fontSize: 14, color: '#333', fontFamily: 'Inter, sans-serif' }}
                    >
                      {e.actual}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ ...cSx, textAlign: 'right' }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#c86030',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {e.late}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
