import { Navigate, createBrowserRouter } from "react-router-dom";
import MainLayout from "layouts/main-layout";
import AuthLayout from "layouts/auth-layout";
import ProtectedRoute from "components/auth/ProtectedRoute";
import Landing from "pages/landing/Landing";
import {
  EmployeeDashboardPage,
  EmployeeLeaderboardPage,
  EmployeeMessagesPage,
  EmployeeOrdersPage,
  EmployeeProductsPage,
  EmployeeProfilePage,
  EmployeeSalesReportPage,
  EmployeeSettingsPage,
  LiveOrdersPage,
  AddOrderPage,
  EmployeeAllOrdersPage,
  PaidPendingPage,
  MyShiftPage,
  LeavePage,
} from "pages/employee";
import {
  SuperAdminDashboardPage,
  SuperAdminLeaderboardPage,
  SuperAdminMessagesPage,
  SuperAdminOrdersPage,
  SuperAdminProductsPage,
  SuperAdminProfilePage,
  SuperAdminSalesReportPage,
  SuperAdminSettingsPage,
  PerformancePage,
  OperationsPage,
  MenuPage,
  AllOrdersPage,
  HappyHourOffersPage,
  CustomerLeaderboardPage,
  RemovedItemsPage,
  RaisedRequestsPage,
  EmployeesPage,
  WorkHoursPage,
  OvertimePage,
  LateEntriesPage,
  LeaveRequestsPage,
  CertificatesPage,
  RevenuePage,
  SalarySlipsPage,
} from "pages/super-admin";
import LoginPage from "pages/auth/LoginPage";
import RegisterPage from "pages/auth/RegisterPage";
import ForgotPasswordPage from "pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "pages/auth/ResetPasswordPage";
import PortalPage from "pages/auth/PortalPage";
import PrivacyPolicyPage from "pages/landing/PrivacyPolicyPage";
import { paths } from "./paths";

export const router = createBrowserRouter(
  [
    {
      path: paths.landing,
      element: <Landing />,
    },
    {
      path: paths.privacyPolicy,
      element: <PrivacyPolicyPage />,
    },
    {
      path: "/portal",
      element: <PortalPage />,
    },
    {
      path: paths.employee.root,
      element: (
        <ProtectedRoute>
          <MainLayout role="employee" />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <EmployeeDashboardPage /> },
        // Dashboard
        { path: "dashboard", element: <EmployeeDashboardPage /> },
        // Orders
        { path: "live-orders", element: <LiveOrdersPage /> },
        { path: "add-order", element: <AddOrderPage /> },
        { path: "all-orders", element: <EmployeeAllOrdersPage /> },
        { path: "paid-pending", element: <PaidPendingPage /> },
        // My Shift
        { path: "my-shift", element: <MyShiftPage /> },
        { path: "leave", element: <LeavePage /> },
        // Profile
        { path: "profile", element: <EmployeeProfilePage /> },
      ],
    },
    {
      path: paths.superAdmin.root,
      element: (
        <ProtectedRoute>
          <MainLayout role="super-admin" />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <SuperAdminDashboardPage /> },
        // Dashboard
        { path: "dashboard", element: <SuperAdminDashboardPage /> },
        // Overview
        { path: "performance", element: <PerformancePage /> },
        { path: "operations", element: <OperationsPage /> },
        // Menu
        { path: "menu", element: <MenuPage /> },
        // Orders
        { path: "all-orders", element: <AllOrdersPage /> },
        // Menu
        { path: "happy-hour", element: <HappyHourOffersPage /> },
        // Leaderboard
        { path: "customer-leaderboard", element: <CustomerLeaderboardPage /> },
        // Management
        { path: "removed-items", element: <RemovedItemsPage /> },
        { path: "raised-requests", element: <RaisedRequestsPage /> },
        // Employees
        { path: "employees", element: <EmployeesPage /> },
        { path: "work-hours", element: <WorkHoursPage /> },
        { path: "overtime", element: <OvertimePage /> },
        { path: "late-entries", element: <LateEntriesPage /> },
        { path: "leave-requests", element: <LeaveRequestsPage /> },
        { path: "certificates", element: <CertificatesPage /> },
        // Revenue
        { path: "revenue", element: <RevenuePage /> },
        { path: "salary-slips", element: <SalarySlipsPage /> },
        // System
        { path: "settings", element: <SuperAdminSettingsPage /> },
      ],
    },
    {
      path: paths.auth.root,
      element: <AuthLayout />,
      children: [
        { index: true, element: <LoginPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "forgot-password", element: <ForgotPasswordPage /> },
        { path: "reset-password", element: <ResetPasswordPage /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to={paths.landing} replace />,
    },
  ],
  { basename: "/" },
);
