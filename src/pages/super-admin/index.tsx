import Dashboard from "pages/dashboard/Dashboard";
import { Box, Typography } from "@mui/material";
import PageHeader from "components/common/PageHeader";

export function SuperAdminDashboardPage() {
  return <Dashboard />;
}

export function SuperAdminLeaderboardPage() {
  return (
    <Box>
      <PageHeader label="LEADERBOARD" title="Leaderboard" subtitle="Top-performing employees ranked by sales." />
    </Box>
  );
}

export function SuperAdminOrdersPage() {
  return (
    <Box>
      <PageHeader label="ORDERS" title="Orders" subtitle="All orders across the system." />
    </Box>
  );
}

export function SuperAdminProductsPage() {
  return (
    <Box>
      <PageHeader label="PRODUCTS" title="Products" subtitle="Product catalog and inventory." />
    </Box>
  );
}

export function SuperAdminSalesReportPage() {
  return (
    <Box>
      <PageHeader label="SALES REPORT" title="Sales Report" subtitle="Revenue and sales analytics." />
    </Box>
  );
}

export function SuperAdminMessagesPage() {
  return (
    <Box>
      <PageHeader label="MESSAGES" title="Messages" subtitle="Internal communications." />
    </Box>
  );
}

// Core pages — individual files
export { default as PerformancePage } from "./PerformancePage";
export { default as OperationsPage } from "./OperationsPage";
export { default as MenuPage } from "./MenuPage";
export { default as AllOrdersPage } from "./AllOrdersPage";
export { default as EmployeesPage } from "./EmployeesPage";
export { default as WorkHoursPage } from "./WorkHoursPage";
export { default as OvertimePage } from "./OvertimePage";
export { default as LateEntriesPage } from "./LateEntriesPage";
export { default as LeaveRequestsPage } from "./LeaveRequestsPage";
export { default as RaisedRequestsPage } from "./RaisedRequestsPage";

// Real pages (fully built)
export { HappyHourOffersPage } from "./HappyHourOffersPage";
export { CustomerLeaderboardPage } from "./CustomerLeaderboardPage";
export { SalarySlipsPage } from "./SalarySlipsPage";
export { default as SuperAdminSettingsPage } from "./SuperAdminSettingsPage";
export { default as SuperAdminProfilePage } from "./SuperAdminProfilePage";

// Remaining placeholders
export {
  RemovedItemsPage,
  CertificatesPage,
  RevenuePage,
} from "./PlaceholderPages";

