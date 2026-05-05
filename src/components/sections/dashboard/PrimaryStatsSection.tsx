import { Box, Typography } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';

const stats = [
  {
    label: 'TOTAL REVENUE',
    value: '₹5,960',
    sub: 'Today, paid only',
    icon: CurrencyRupeeIcon,
    ic: '#c86030',
    bg: '#f7e8e3',
  },
  {
    label: 'TOTAL ORDERS',
    value: '23',
    sub: '19 paid · 4 pending',
    icon: ShoppingCartOutlinedIcon,
    ic: '#666',
    bg: '#eeedea',
  },
  {
    label: 'PENDING',
    value: '4',
    sub: 'Awaiting confirmation',
    icon: HourglassEmptyOutlinedIcon,
    ic: '#c08040',
    bg: '#f8edd8',
  },
  {
    label: 'PAID ORDERS',
    value: '19',
    sub: 'Settled today',
    icon: CheckCircleOutlineOutlinedIcon,
    ic: '#4a9a6a',
    bg: '#e3f0e8',
  },
  {
    label: 'EMPLOYEES',
    value: '5',
    sub: 'Active 5 · On shift 2 · OT 1',
    icon: PeopleOutlineOutlinedIcon,
    ic: '#666',
    bg: '#eeedea',
  },
  {
    label: 'AVG ORDER',
    value: '₹259',
    sub: 'Per ticket today',
    icon: ReceiptOutlinedIcon,
    ic: '#666',
    bg: '#eeedea',
  },
  {
    label: 'ITEMS SOLD',
    value: '47',
    sub: 'Top: Cortado',
    icon: Inventory2OutlinedIcon,
    ic: '#666',
    bg: '#eeedea',
  },
  {
    label: 'NETWORK TRAFFIC',
    value: '623',
    sub: 'Menu views (this session)',
    icon: WifiOutlinedIcon,
    ic: '#c86030',
    bg: '#f7e8e3',
  },
];

function StatCard({ s }: { s: (typeof stats)[0] }) {
  const Icon = s.icon;
  return (
    <Box
      sx={{
        bgcolor: '#fff',
        borderRadius: '20px',
        border: '1px solid #eae7e2',
        p: 2.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      {/* top row: label + icon */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          sx={{
            fontSize: 10.5,
            fontWeight: 600,
            color: '#888',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
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
      {/* value + subtext */}
      <Box>
        <Typography sx={{ fontSize: 30, fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>
          {s.value}
        </Typography>
        <Typography sx={{ fontSize: 11.5, color: '#999', mt: 0.5 }}>{s.sub}</Typography>
      </Box>
    </Box>
  );
}

export default function PrimaryStatsSection() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2,1fr)', md: 'repeat(4,1fr)' },
        gap: 2,
      }}
    >
      {stats.map((s, i) => (
        <StatCard key={i} s={s} />
      ))}
    </Box>
  );
}
