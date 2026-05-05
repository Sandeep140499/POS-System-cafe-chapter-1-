import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PageHeader from 'components/common/PageHeader';
import SectionPaperCard from 'components/base/SectionPaperCard';

const COLORS = ['#5c6bc0', '#8d6e63', '#4caf50', '#ff9800', '#e91e63', '#00bcd4'];

interface Employee {
  name: string;
  id: string;
  orders: number;
  revenueRaw: number;
  target: number;
}

const INIT_EMP: Employee[] = [
  { name: 'Shweta Tiwari', id: 'CC100002', orders: 12, revenueRaw: 4156, target: 78 },
  { name: 'Sandeep Kumar', id: 'CC100001', orders: 11, revenueRaw: 1804, target: 55 },
  { name: 'Shivam Sagar Mishra', id: 'CC100003', orders: 0, revenueRaw: 0, target: 0 },
  { name: 'Suman Kumar', id: 'CC100004', orders: 0, revenueRaw: 0, target: 0 },
  { name: 'Ravi Verma', id: 'CC100005', orders: 0, revenueRaw: 0, target: 0 },
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

const cSx = { borderBottom: '1px solid #eae7e2', py: 1.8, fontFamily: 'Inter, sans-serif' };

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(n => n[0]?.toUpperCase() ?? '')
    .join('');
}

function formatINR(n: number) {
  return '\u20B9' + n.toLocaleString('en-IN');
}

function RankBadge({ rank }: { rank: number }) {
  const gold = rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : rank === 3 ? '#CD7F32' : null;
  if (gold)
    return (
      <Box
        sx={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          bgcolor: gold,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: 13,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        #{rank}
      </Box>
    );
  return (
    <Typography sx={{ fontSize: 14, color: '#888', fontFamily: 'Inter, sans-serif', pl: 0.5 }}>
      #{rank}
    </Typography>
  );
}

export default function PerformancePage() {
  const [employees] = useState<Employee[]>(INIT_EMP);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('revenue');

  const totalRevenue = useMemo(() => employees.reduce((s, e) => s + e.revenueRaw, 0), [employees]);
  const totalOrders = useMemo(() => employees.reduce((s, e) => s + e.orders, 0), [employees]);
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
  const activeStaff = useMemo(() => employees.filter(e => e.orders > 0).length, [employees]);

  const filtered = useMemo(() => {
    let list = employees.filter(
      e =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.id.toLowerCase().includes(search.toLowerCase())
    );
    list = [...list].sort((a, b) => {
      if (sortBy === 'revenue') return b.revenueRaw - a.revenueRaw;
      if (sortBy === 'orders') return b.orders - a.orders;
      if (sortBy === 'target') return b.target - a.target;
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [employees, search, sortBy]);

  const ranked = filtered.map((e, i) => ({ ...e, rank: i + 1 }));

  const downloadCSV = () => {
    const rows = [
      'Rank,Name,ID,Orders,Revenue,Target%',
      ...ranked.map(e => `${e.rank},${e.name},${e.id},${e.orders},${e.revenueRaw},${e.target}`),
    ];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'performance.csv';
    a.click();
  };

  const stats = [
    { label: 'TOTAL REVENUE', value: formatINR(totalRevenue), sub: 'Today, paid only' },
    { label: 'TOTAL ORDERS', value: String(totalOrders), sub: `${activeStaff} staff active` },
    { label: 'AVG ORDER VALUE', value: formatINR(avgOrderValue), sub: 'Per ticket today' },
  ];

  return (
    <Box>
      <PageHeader label="PERFORMANCE" title="Performance" />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 2,
          mb: 3,
        }}
      >
        {stats.map(s => (
          <SectionPaperCard key={s.label}>
            <Typography
              sx={{
                fontSize: 10.5,
                fontWeight: 700,
                color: '#c86030',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                mb: 1,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {s.label}
            </Typography>
            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 700,
                color: '#1a1a1a',
                lineHeight: 1,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {s.value}
            </Typography>
            <Typography
              sx={{ fontSize: 12, color: '#999', mt: 0.5, fontFamily: 'Inter, sans-serif' }}
            >
              {s.sub}
            </Typography>
          </SectionPaperCard>
        ))}
      </Box>

      <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          placeholder="Search name or ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          size="small"
          sx={{
            width: 260,
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              bgcolor: '#fff',
              height: 38,
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              '& fieldset': { borderColor: '#eae7e2' },
              '&.Mui-focused fieldset': { borderColor: '#c86030' },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 17, color: '#999' }} />
                </InputAdornment>
              ),
            },
          }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel sx={{ fontFamily: 'Inter, sans-serif', fontSize: 13.5 }}>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={e => setSortBy(e.target.value)}
            sx={{
              borderRadius: '10px',
              fontFamily: 'Inter, sans-serif',
              bgcolor: '#fff',
              height: 38,
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#eae7e2' },
            }}
          >
            <MenuItem value="revenue">Revenue</MenuItem>
            <MenuItem value="orders">Orders</MenuItem>
            <MenuItem value="target">Target %</MenuItem>
            <MenuItem value="name">Name</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
          <Button
            startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 17 }} />}
            onClick={downloadCSV}
            sx={{
              bgcolor: '#1a1a1a',
              color: '#fff',
              borderRadius: '20px',
              px: 2,
              textTransform: 'none',
              fontSize: 13.5,
              fontFamily: 'Inter, sans-serif',
              height: 38,
              '&:hover': { bgcolor: '#333' },
            }}
          >
            Download CSV
          </Button>
        </Box>
      </Box>

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
                <TableCell sx={hSx}>Rank</TableCell>
                <TableCell sx={hSx}>Employee</TableCell>
                <TableCell sx={{ ...hSx, textAlign: 'center' }}>Orders</TableCell>
                <TableCell sx={{ ...hSx, textAlign: 'right' }}>Revenue</TableCell>
                <TableCell sx={{ ...hSx, textAlign: 'center' }}>Target %</TableCell>
                <TableCell sx={hSx}>Progress</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ranked.map(e => (
                <TableRow
                  key={e.id}
                  sx={{ '&:hover': { bgcolor: '#faf9f7' }, '&:last-child td': { border: 0 } }}
                >
                  <TableCell sx={cSx}>
                    <RankBadge rank={e.rank} />
                  </TableCell>
                  <TableCell sx={cSx}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: avatarColor(e.name),
                          fontSize: 11,
                          fontWeight: 700,
                        }}
                      >
                        {initials(e.name)}
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
                  <TableCell sx={{ ...cSx, textAlign: 'center' }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: '#1a1a1a',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {e.orders}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ ...cSx, textAlign: 'right' }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#1a1a1a',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {formatINR(e.revenueRaw)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ ...cSx, textAlign: 'center' }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: e.target >= 70 ? '#2e7d32' : e.target >= 40 ? '#c86030' : '#999',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {e.target}%
                    </Typography>
                  </TableCell>
                  <TableCell sx={cSx}>
                    <LinearProgress
                      variant="determinate"
                      value={e.target}
                      sx={{
                        height: 5,
                        borderRadius: 3,
                        bgcolor: '#eeedea',
                        maxWidth: 160,
                        '& .MuiLinearProgress-bar': { bgcolor: '#c86030', borderRadius: 3 },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {ranked.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    sx={{
                      py: 4,
                      textAlign: 'center',
                      fontFamily: 'Inter, sans-serif',
                      color: '#999',
                      fontSize: 14,
                    }}
                  >
                    No employees found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
