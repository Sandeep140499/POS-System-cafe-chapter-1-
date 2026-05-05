import { Box, Stack } from '@mui/material';
import DashboardHeader from 'components/sections/dashboard/DashboardHeader';
import PrimaryStatsSection from 'components/sections/dashboard/PrimaryStatsSection';
import SalesTargetWidget from 'components/sections/dashboard/SalesTargetWidget';
import OvertimeSection from 'components/sections/dashboard/OvertimeSection';
import ActiveShiftSection from 'components/sections/dashboard/ActiveShiftSection';
import SalesByEmployeeSection from 'components/sections/dashboard/SalesByEmployeeSection';
import TodayItemSalesSection from 'components/sections/dashboard/TodayItemSalesSection';

export default function Dashboard() {
  return (
    <Box sx={{ pb: 4 }}>
      {/* Header: TODAY'S DASHBOARD + Date + Refresh */}
      <DashboardHeader />

      {/* 8 Stat Cards - 4 per row */}
      <Box sx={{ mt: 3 }}>
        <PrimaryStatsSection />
      </Box>

      {/* Sales Target (wider) + Overtime Running (narrower) */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
          gap: 3,
          mt: 3,
        }}
      >
        <SalesTargetWidget />
        <OvertimeSection />
      </Box>

      {/* Currently on Shift - full width table */}
      <Box sx={{ mt: 3 }}>
        <ActiveShiftSection />
      </Box>

      {/* Today's Item Sales + Sales by Employee - side by side */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: 3,
          mt: 3,
        }}
      >
        <TodayItemSalesSection />
        <SalesByEmployeeSection />
      </Box>
    </Box>
  );
}
