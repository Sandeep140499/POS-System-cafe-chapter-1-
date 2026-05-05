import {
  Box,
  Typography,
  Chip,
  Button,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import StopIcon from '@mui/icons-material/Stop';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CoffeeOutlinedIcon from '@mui/icons-material/CoffeeOutlined';

const statCards = [
  {
    label: 'MY SALES',
    value: '₹1,804',
    sub: 'Today, paid only',
    icon: CurrencyRupeeIcon,
    bg: '#f7e8e3',
    ic: '#c86030',
  },
  {
    label: 'MY ORDERS',
    value: '5',
    sub: '3 paid · 2 pending',
    icon: ShoppingCartOutlinedIcon,
    bg: '#eeedea',
    ic: '#666',
  },
  {
    label: 'ON SHIFT SINCE',
    value: '05:42 pm',
    sub: '90 hr 41 min live',
    icon: AccessTimeOutlinedIcon,
    bg: '#eeedea',
    ic: '#666',
  },
  {
    label: 'AVG TICKET',
    value: '₹361',
    sub: 'Per order today',
    icon: CoffeeOutlinedIcon,
    bg: '#eeedea',
    ic: '#666',
  },
];

const recentTickets = [
  {
    order: 'ORD-2104',
    customer: 'Aarav Mehta',
    items: 3,
    time: '11:42 am',
    status: 'PAID',
    total: '₹690',
  },
  {
    order: 'ORD-2103',
    customer: 'Priya Singh',
    items: 2,
    time: '11:18 am',
    status: 'PENDING',
    total: '₹410',
  },
  {
    order: 'ORD-2102',
    customer: 'Rohan Khanna',
    items: 1,
    time: '10:55 am',
    status: 'PAID',
    total: '₹180',
  },
  {
    order: 'ORD-2101',
    customer: 'Ananya Rao',
    items: 4,
    time: '10:31 am',
    status: 'PAID',
    total: '₹924',
  },
  {
    order: 'ORD-2100',
    customer: 'Karan Patel',
    items: 2,
    time: '09:48 am',
    status: 'PENDING',
    total: '₹380',
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

export function EmployeeDashboardPage() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'flex-start' },
          mb: 3,
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              color: '#c86030',
              fontSize: 10.5,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              mb: 0.5,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            MY DAY
          </Typography>
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 700,
              color: '#1a1a1a',
              lineHeight: 1.15,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Welcome back, Shweta
          </Typography>
          <Typography
            sx={{ fontSize: 14, color: '#888', mt: 0.3, fontFamily: 'Inter, sans-serif' }}
          >
            {dateStr}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 1 }}>
          <Chip
            label="ACTIVE"
            sx={{
              bgcolor: '#eeedea',
              color: '#555',
              fontWeight: 600,
              fontSize: 11,
              height: 26,
              borderRadius: '13px',
              fontFamily: 'Inter, sans-serif',
            }}
          />
          <Button
            startIcon={<StopIcon sx={{ fontSize: 16 }} />}
            sx={{
              bgcolor: '#c86030',
              color: '#fff',
              borderRadius: '20px',
              px: 2.5,
              py: 0.8,
              textTransform: 'none',
              fontSize: 13.5,
              fontWeight: 500,
              fontFamily: 'Inter, sans-serif',
              '&:hover': { bgcolor: '#a8502a' },
            }}
          >
            End shift
          </Button>
        </Box>
      </Box>

      {/* Stat cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 2,
          mb: 3,
        }}
      >
        {statCards.map(s => {
          const Icon = s.icon;
          return (
            <Box
              key={s.label}
              sx={{ bgcolor: '#fff', borderRadius: '20px', border: '1px solid #eae7e2', p: 2.5 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 10.5,
                    fontWeight: 600,
                    color: '#888',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {s.label}
                </Typography>
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    bgcolor: s.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon sx={{ fontSize: 15, color: s.ic }} />
                </Box>
              </Box>
              <Typography
                sx={{
                  fontSize: 28,
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
            </Box>
          );
        })}
      </Box>

      {/* Recent tickets */}
      <Box
        sx={{
          bgcolor: '#fff',
          borderRadius: '20px',
          border: '1px solid #eae7e2',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2.5,
            py: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: 17,
              fontWeight: 700,
              color: '#1a1a1a',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Recent tickets
          </Typography>
          <Typography sx={{ fontSize: 12.5, color: '#888', fontFamily: 'Inter, sans-serif' }}>
            Last 5 orders
          </Typography>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={hSx}>Order</TableCell>
                <TableCell sx={hSx}>Customer</TableCell>
                <TableCell sx={hSx}>Items</TableCell>
                <TableCell sx={hSx}>Time</TableCell>
                <TableCell sx={hSx}>Status</TableCell>
                <TableCell sx={{ ...hSx, textAlign: 'right' }}>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentTickets.map(r => (
                <TableRow
                  key={r.order}
                  sx={{ '&:hover': { bgcolor: '#faf9f7' }, '&:last-child td': { border: 0 } }}
                >
                  <TableCell sx={cSx}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: '#1a1a1a',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {r.order}
                    </Typography>
                  </TableCell>
                  <TableCell sx={cSx}>
                    <Typography
                      sx={{ fontSize: 14, color: '#333', fontFamily: 'Inter, sans-serif' }}
                    >
                      {r.customer}
                    </Typography>
                  </TableCell>
                  <TableCell sx={cSx}>
                    <Typography
                      sx={{ fontSize: 14, color: '#333', fontFamily: 'Inter, sans-serif' }}
                    >
                      {r.items}
                    </Typography>
                  </TableCell>
                  <TableCell sx={cSx}>
                    <Typography
                      sx={{ fontSize: 14, color: '#333', fontFamily: 'Inter, sans-serif' }}
                    >
                      {r.time}
                    </Typography>
                  </TableCell>
                  <TableCell sx={cSx}>
                    <Chip
                      label={r.status}
                      size="small"
                      sx={{
                        bgcolor: r.status === 'PAID' ? '#e8e8e4' : '#f5e6d8',
                        color: r.status === 'PAID' ? '#444' : '#9a5a20',
                        fontWeight: 600,
                        fontSize: 11,
                        height: 24,
                        borderRadius: '12px',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ ...cSx, textAlign: 'right' }}>
                    <Typography
                      sx={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: '#1a1a1a',
                        fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      {r.total}
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

export function EmployeeProfilePage() {
  return (
    <Box>
      <Typography
        sx={{
          color: '#c86030',
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          mb: 0.5,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        PROFILE
      </Typography>
      <Typography
        sx={{
          fontSize: 34,
          fontWeight: 700,
          color: '#1a1a1a',
          fontFamily: 'Inter, sans-serif',
          mb: 1,
        }}
      >
        My Profile
      </Typography>
      <Typography sx={{ fontSize: 14, color: '#888', fontFamily: 'Inter, sans-serif' }}>
        Manage your profile information and account settings.
      </Typography>
    </Box>
  );
}

export function EmployeeLeaderboardPage() {
  return (
    <Box>
      <Typography
        sx={{
          color: '#c86030',
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          mb: 0.5,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        LEADERBOARD
      </Typography>
      <Typography
        sx={{ fontSize: 34, fontWeight: 700, color: '#1a1a1a', fontFamily: 'Inter, sans-serif' }}
      >
        Leaderboard
      </Typography>
    </Box>
  );
}

export function EmployeeOrdersPage() {
  return (
    <Box>
      <Typography
        sx={{
          color: '#c86030',
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          mb: 0.5,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        ORDERS
      </Typography>
      <Typography
        sx={{ fontSize: 34, fontWeight: 700, color: '#1a1a1a', fontFamily: 'Inter, sans-serif' }}
      >
        Orders
      </Typography>
    </Box>
  );
}

export function EmployeeProductsPage() {
  return (
    <Box>
      <Typography
        sx={{
          color: '#c86030',
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          mb: 0.5,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        PRODUCTS
      </Typography>
      <Typography
        sx={{ fontSize: 34, fontWeight: 700, color: '#1a1a1a', fontFamily: 'Inter, sans-serif' }}
      >
        Products
      </Typography>
    </Box>
  );
}

export function EmployeeSalesReportPage() {
  return (
    <Box>
      <Typography
        sx={{
          color: '#c86030',
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          mb: 0.5,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        SALES REPORT
      </Typography>
      <Typography
        sx={{ fontSize: 34, fontWeight: 700, color: '#1a1a1a', fontFamily: 'Inter, sans-serif' }}
      >
        Sales Report
      </Typography>
    </Box>
  );
}

export function EmployeeMessagesPage() {
  return (
    <Box>
      <Typography
        sx={{
          color: '#c86030',
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          mb: 0.5,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        MESSAGES
      </Typography>
      <Typography
        sx={{ fontSize: 34, fontWeight: 700, color: '#1a1a1a', fontFamily: 'Inter, sans-serif' }}
      >
        Messages
      </Typography>
    </Box>
  );
}

export function EmployeeSettingsPage() {
  return (
    <Box>
      <Typography
        sx={{
          color: '#c86030',
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          mb: 0.5,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        SETTINGS
      </Typography>
      <Typography
        sx={{ fontSize: 34, fontWeight: 700, color: '#1a1a1a', fontFamily: 'Inter, sans-serif' }}
      >
        Settings
      </Typography>
    </Box>
  );
}

export { default as LiveOrdersPage } from './LiveOrdersPage';
export { default as AddOrderPage } from './AddOrderPage';
export { default as EmployeeAllOrdersPage } from './AllOrdersPage';
export { default as PaidPendingPage } from './PaidPendingPage';
export { default as MyShiftPage } from './MyShiftPage';
export { default as LeavePage } from './LeavePage';
