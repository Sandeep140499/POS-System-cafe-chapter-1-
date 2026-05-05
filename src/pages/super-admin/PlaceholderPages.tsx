import { Box, Typography } from '@mui/material';
import PageHeader from 'components/common/PageHeader';
import SectionPaperCard from 'components/base/SectionPaperCard';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

function PlaceholderPage({
  label,
  title,
  subtitle,
  icon,
}: {
  label: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}) {
  return (
    <Box>
      <PageHeader label={label} title={title} subtitle={subtitle} />
      <SectionPaperCard>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 6 }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              bgcolor: '#f5f3ef',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            {icon}
          </Box>
          <Typography
            sx={{
              fontSize: 15,
              fontWeight: 600,
              color: '#1a1a1a',
              mb: 0.5,
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Coming soon
          </Typography>
          <Typography sx={{ fontSize: 13, color: '#999', fontFamily: 'Inter, sans-serif' }}>
            This section is under active development.
          </Typography>
        </Box>
      </SectionPaperCard>
    </Box>
  );
}

export function HappyHourOffersPage() {
  return (
    <PlaceholderPage
      label="HAPPY HOUR OFFERS"
      title="Happy Hour Offers"
      subtitle="Configure time-based discounts and promotional pricing."
      icon={<AutoAwesomeOutlinedIcon sx={{ fontSize: 24, color: '#c86030' }} />}
    />
  );
}

export function CustomerLeaderboardPage() {
  return (
    <PlaceholderPage
      label="CUSTOMER LEADERBOARD"
      title="Customer Leaderboard"
      subtitle="Top customers ranked by orders and spend."
      icon={<EmojiEventsOutlinedIcon sx={{ fontSize: 24, color: '#c86030' }} />}
    />
  );
}

export function RemovedItemsPage() {
  return (
    <PlaceholderPage
      label="REMOVED ITEMS"
      title="Removed Items"
      subtitle="Order items that were cancelled or removed by staff."
      icon={<DeleteOutlineRoundedIcon sx={{ fontSize: 24, color: '#c86030' }} />}
    />
  );
}

export function CertificatesPage() {
  return (
    <PlaceholderPage
      label="CERTIFICATES"
      title="Certificates"
      subtitle="Employee training certificates and credentials."
      icon={<SchoolOutlinedIcon sx={{ fontSize: 24, color: '#c86030' }} />}
    />
  );
}

export function RevenuePage() {
  return (
    <PlaceholderPage
      label="REVENUE"
      title="Revenue"
      subtitle="Detailed revenue breakdown by period, category, and employee."
      icon={<AccountBalanceOutlinedIcon sx={{ fontSize: 24, color: '#c86030' }} />}
    />
  );
}

export function SalarySlipsPage() {
  return (
    <PlaceholderPage
      label="SALARY SLIPS"
      title="Salary Slips"
      subtitle="Monthly salary statements and payout history."
      icon={<ReceiptOutlinedIcon sx={{ fontSize: 24, color: '#c86030' }} />}
    />
  );
}

export function SuperAdminSettingsPage() {
  return (
    <PlaceholderPage
      label="SETTINGS"
      title="Settings"
      subtitle="System configuration, branch settings, and preferences."
      icon={<SettingsOutlinedIcon sx={{ fontSize: 24, color: '#c86030' }} />}
    />
  );
}
