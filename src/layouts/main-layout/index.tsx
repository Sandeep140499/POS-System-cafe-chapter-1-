import { Link as RouterLink, Outlet, useLocation } from "react-router-dom";
import {
  AppBar, Avatar, Box, CssBaseline, Drawer, InputAdornment,
  IconButton, List, ListItemButton, ListItemIcon, ListItemText,
  Menu, MenuItem, TextField, Toolbar, Typography, Breadcrumbs, Link, useMediaQuery, useTheme,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import SpeedIcon from "@mui/icons-material/Speed";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState, useEffect, type ReactNode } from "react";
import { paths } from "routes/paths";
import { getNotifications, clearAllNotifications, markAllRead, type NotificationItem } from "data/notifications";

const DRAWER_W = 260;

type MenuSection = { label: string; items: { label: string; icon: ReactNode; to: string; dot?: boolean }[] };
type MainLayoutProps = { role: "employee" | "super-admin" };

function SectionLabel({ label }: { label: string }) {
  return (
    <Typography sx={{ color: "rgba(255,255,255,0.35)", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", px: 1.5, pt: 2.5, pb: 0.5, fontFamily: "Inter, sans-serif" }}>
      {label}
    </Typography>
  );
}

function SidebarItem({ item, active, isEmployee, onNavigate }: { item: MenuSection["items"][0]; active: boolean; isEmployee: boolean; onNavigate?: () => void }) {
  const activeBg = isEmployee ? "#1a1a1a" : "#c86030";
  const activeHoverBg = isEmployee ? "#000" : "#b55528";

  return (
    <ListItemButton
      selected={active}
      component={RouterLink}
      to={item.to}
      onClick={onNavigate}
      sx={{
        mb: 0.3, borderRadius: "10px", minHeight: 38, py: 0.7, px: 1.5, mx: 0.5,
        color: active ? "#fff" : "rgba(255,255,255,0.55)",
        bgcolor: active ? activeBg : "transparent",
        "&.Mui-selected": { bgcolor: activeBg },
        "&.Mui-selected:hover": { bgcolor: activeHoverBg },
        transition: "all 0.15s ease",
        "& .MuiListItemText-primary": { fontSize: 13.5, fontWeight: active ? 500 : 400, fontFamily: "Inter, sans-serif" },
        "& .MuiListItemIcon-root": { color: active ? "#fff" : "rgba(255,255,255,0.5)", minWidth: 32 },
        "&:hover": { bgcolor: active ? activeHoverBg : "rgba(255,255,255,0.06)", color: "#fff", "& .MuiListItemIcon-root": { color: "#fff" } },
      }}
    >
      <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
      <ListItemText primary={item.label} />
      {item.dot && !active && <FiberManualRecordIcon sx={{ fontSize: 8, color: "#c86030" }} />}
    </ListItemButton>
  );
}

export default function MainLayout({ role }: MainLayoutProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(getNotifications);
  const menuOpen = Boolean(anchorEl);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const rolePaths = role === "super-admin" ? paths.superAdmin : paths.employee;
  const isEmployee = role === "employee";

  const unread = notifications.filter((n) => !n.read).length;

  const handleClearAll = () => { clearAllNotifications(); setNotifications([]); };
  const handleMarkAllRead = () => { markAllRead(); setNotifications(getNotifications()); };

  useEffect(() => {
    const id = setInterval(() => setNotifications(getNotifications()), 2000);
    return () => clearInterval(id);
  }, []);

  const isActive = (to: string) =>
    location.pathname === to ||
    (to.endsWith("/dashboard") && location.pathname === to.replace("/dashboard", "")) ||
    (location.pathname.endsWith("/") && to.endsWith("/dashboard"));

  const adminSections: MenuSection[] = [
    {
      label: "DASHBOARD",
      items: [
        { label: "Overview", icon: <DashboardRoundedIcon sx={{ fontSize: 20 }} />, to: "/super-admin/dashboard" },
        { label: "Performance", icon: <SpeedIcon sx={{ fontSize: 20 }} />, to: "/super-admin/performance" },
        { label: "Operations", icon: <TuneOutlinedIcon sx={{ fontSize: 20 }} />, to: "/super-admin/operations" },
      ],
    },
    {
      label: "OPERATIONS",
      items: [
        { label: "All Orders", icon: <ShoppingCartOutlinedIcon sx={{ fontSize: 20 }} />, to: "/super-admin/all-orders" },
        { label: "Menu", icon: <RestaurantMenuIcon sx={{ fontSize: 20 }} />, to: "/super-admin/menu" },
        { label: "Happy Hour Offers", icon: <AutoAwesomeOutlinedIcon sx={{ fontSize: 20 }} />, to: "/super-admin/happy-hour" },
        { label: "Customer Leaderboard", icon: <LeaderboardOutlinedIcon sx={{ fontSize: 20 }} />, to: "/super-admin/customer-leaderboard" },
        { label: "Removed Items", icon: <DeleteOutlineRoundedIcon sx={{ fontSize: 20 }} />, to: "/super-admin/removed-items" },
        { label: "Raised Requests", icon: <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 20 }} />, to: "/super-admin/raised-requests" },
      ],
    },
    {
      label: "STAFF",
      items: [
        { label: "Employees", icon: <PeopleOutlineRoundedIcon sx={{ fontSize: 20 }} />, to: "/super-admin/employees" },
        { label: "Work Hours", icon: <AccessTimeIcon sx={{ fontSize: 20 }} />, to: "/super-admin/work-hours" },
        { label: "Overtime", icon: <TimerOutlinedIcon sx={{ fontSize: 20 }} />, to: "/super-admin/overtime" },
        { label: "Late Entries", icon: <WatchLaterOutlinedIcon sx={{ fontSize: 20 }} />, to: "/super-admin/late-entries" },
        { label: "Leave Requests", icon: <BeachAccessOutlinedIcon sx={{ fontSize: 20 }} />, to: "/super-admin/leave-requests" },
        { label: "Certificates", icon: <SchoolOutlinedIcon sx={{ fontSize: 20 }} />, to: "/super-admin/certificates" },
      ],
    },
    {
      label: "FINANCE",
      items: [
        { label: "Revenue", icon: <AccountBalanceOutlinedIcon sx={{ fontSize: 20 }} />, to: "/super-admin/revenue" },
        { label: "Salary Slips", icon: <ReceiptOutlinedIcon sx={{ fontSize: 20 }} />, to: "/super-admin/salary-slips" },
      ],
    },
    {
      label: "SYSTEM",
      items: [
        { label: "Settings", icon: <SettingsOutlinedIcon sx={{ fontSize: 20 }} />, to: "/super-admin/settings" },
      ],
    },
  ];

  const employeeSections: MenuSection[] = [
    {
      label: "WORKSPACE",
      items: [
        { label: "Dashboard", icon: <DashboardRoundedIcon sx={{ fontSize: 20 }} />, to: "/employee/dashboard" },
      ],
    },
    {
      label: "ORDERS",
      items: [
        { label: "Live Orders", icon: <LiveTvIcon sx={{ fontSize: 20 }} />, to: "/employee/live-orders", dot: true },
        { label: "Add Order", icon: <AddBoxOutlinedIcon sx={{ fontSize: 20 }} />, to: "/employee/add-order" },
        { label: "All Orders", icon: <ShoppingCartOutlinedIcon sx={{ fontSize: 20 }} />, to: "/employee/all-orders" },
        { label: "Paid & Pending", icon: <PaymentOutlinedIcon sx={{ fontSize: 20 }} />, to: "/employee/paid-pending" },
      ],
    },
    {
      label: "SHIFT",
      items: [
        { label: "My Shift", icon: <WorkHistoryOutlinedIcon sx={{ fontSize: 20 }} />, to: "/employee/my-shift" },
        { label: "Leave", icon: <BeachAccessOutlinedIcon sx={{ fontSize: 20 }} />, to: "/employee/leave" },
      ],
    },
    {
      label: "ACCOUNT",
      items: [
        { label: "Profile", icon: <PersonOutlineRoundedIcon sx={{ fontSize: 20 }} />, to: "/employee/profile" },
      ],
    },
  ];

  const sections = isEmployee ? employeeSections : adminSections;

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const currentPage = location.pathname.split("/").pop() ?? "Dashboard";
  const breadcrumbLabel = currentPage.charAt(0).toUpperCase() + currentPage.slice(1).replace(/-/g, " ");

  /* ── Sidebar content (shared between permanent and temporary drawers) ── */
  const sidebarContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Logo */}
      <Box sx={{ px: 2, py: 2, display: "flex", alignItems: "center", gap: 1.2 }}>
        <Box sx={{ bgcolor: "#f5f3ef", borderRadius: "10px", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <LocalCafeIcon sx={{ color: "#333", fontSize: 20 }} />
        </Box>
        <Box sx={{ overflow: "hidden" }}>
          <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.2, fontFamily: "Inter, sans-serif" }}>Cafe Chapter 1</Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.35)", fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>RESTRO PVT. LTD.</Typography>
        </Box>
      </Box>

      {/* Nav */}
      <Box sx={{ flex: 1, overflowY: "auto", overflowX: "hidden", scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.06) transparent" }}>
        <Box sx={{ px: 0.5, pb: 3 }}>
          {sections.map((section) => (
            <Box key={section.label}>
              <SectionLabel label={section.label} />
              <List disablePadding>
                {section.items.map((item) => (
                  <SidebarItem
                    key={item.to + item.label}
                    item={item}
                    active={isActive(item.to)}
                    isEmployee={isEmployee}
                    onNavigate={isMobile ? () => setMobileOpen(false) : undefined}
                  />
                ))}
              </List>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Bottom user info */}
      <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.08)", px: 2, py: 1.5, display: "flex", alignItems: "center", gap: 1.2 }}>
        <Avatar sx={{ width: 32, height: 32, bgcolor: isEmployee ? "#8d6e63" : "#c86030", fontSize: 12, fontWeight: 600 }}>
          {isEmployee ? "S" : "A"}
        </Avatar>
        <Box sx={{ flex: 1, overflow: "hidden" }}>
          <Typography sx={{ color: "#fff", fontSize: 12.5, fontWeight: 500, lineHeight: 1.3, fontFamily: "Inter, sans-serif" }}>
            {isEmployee ? "Shweta Tiwari" : "Admin · Owner"}
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: 10.5, fontFamily: "Inter, sans-serif" }}>
            {isEmployee ? "CC100002 · ON SHIFT" : "Cafe Chapter 1"}
          </Typography>
        </Box>
        <IconButton component={RouterLink} to={paths.auth.login} size="small" sx={{ color: "rgba(255,255,255,0.4)" }}>
          <LogoutRoundedIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f3ef" }}>
      <CssBaseline />

      {/* ═══ TOP BAR ═══ */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_W}px)` },
          ml: { md: `${DRAWER_W}px` },
          bgcolor: "#fff",
          boxShadow: "none",
          borderBottom: "1px solid #eae7e2",
          px: { xs: 1, md: 2.5 },
        }}
      >
        <Toolbar disableGutters sx={{ minHeight: "54px !important", gap: 1 }}>
          {/* Hamburger on mobile */}
          {isMobile && (
            <IconButton onClick={() => setMobileOpen(true)} size="small" sx={{ mr: 0.5 }}>
              <MenuRoundedIcon sx={{ fontSize: 22, color: "#333" }} />
            </IconButton>
          )}

          <Breadcrumbs separator={<ChevronRightIcon sx={{ fontSize: 14, color: "#bbb" }} />}>
            <Link underline="hover" color="#bbb" href="/" sx={{ display: "flex", alignItems: "center" }}>
              <HomeOutlinedIcon sx={{ fontSize: 17 }} />
            </Link>
            <Typography sx={{ color: "#333", fontSize: 14, fontWeight: 500, fontFamily: "Inter, sans-serif" }}>
              {breadcrumbLabel === "Dashboard" ? (isEmployee ? "Dashboard" : "Overview") : breadcrumbLabel}
            </Typography>
          </Breadcrumbs>

          <Box sx={{ flexGrow: 1 }} />

          {/* Search — hide on small mobile */}
          <TextField
            size="small"
            placeholder="Search orders, employees..."
            sx={{
              width: { xs: 0, sm: 240, md: 280 },
              display: { xs: "none", sm: "block" },
              "& .MuiOutlinedInput-root": {
                bgcolor: "#f5f3ef",
                borderRadius: 5,
                height: 36,
                fontSize: 13,
                color: "#333",
                fontFamily: "Inter, sans-serif",
                "& fieldset": { border: "none" },
              },
            }}
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 16, color: "#999" }} /></InputAdornment> } }}
          />

          {/* Date / Time — hide on mobile */}
          <Box sx={{ textAlign: "right", ml: 1, display: { xs: "none", lg: "block" } }}>
            <Typography sx={{ fontSize: 11, fontWeight: 500, color: "#555", lineHeight: 1.3, fontFamily: "Inter, sans-serif" }}>{dateStr}</Typography>
            <Typography sx={{ fontSize: 11, color: "#999", lineHeight: 1.2, fontFamily: "Inter, sans-serif" }}>{timeStr}</Typography>
          </Box>

          <IconButton size="small" sx={{ width: 34, height: 34 }} onClick={() => setNotifOpen(true)}>
            <Box sx={{ position: "relative" }}>
              <NotificationsNoneRoundedIcon sx={{ fontSize: 20, color: "#333" }} />
              {unread > 0 && (
                <Box sx={{ position: "absolute", top: -4, right: -4, width: 14, height: 14, borderRadius: "50%", bgcolor: "#c62828", color: "#fff", fontSize: 8, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
                  {unread}
                </Box>
              )}
            </Box>
          </IconButton>

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small" sx={{ p: 0 }}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: isEmployee ? "#8d6e63" : "#c86030", fontSize: 13, fontWeight: 600 }}>
              {isEmployee ? "S" : "A"}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={() => setAnchorEl(null)}
            onClick={() => setAnchorEl(null)}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            sx={{ "& .MuiPaper-root": { minWidth: 150 } }}
          >
            <MenuItem component={RouterLink} to={rolePaths.profile}><ListItemIcon><PersonIcon fontSize="small" /></ListItemIcon>Profile</MenuItem>
            <MenuItem component={RouterLink} to={rolePaths.settings}><ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>Settings</MenuItem>
            <MenuItem component={RouterLink} to={paths.auth.login}><ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Notification Drawer */}
      <Drawer anchor="right" open={notifOpen} onClose={() => setNotifOpen(false)} sx={{ "& .MuiDrawer-paper": { width: { xs: "100%", sm: 360 }, borderRadius: "20px 0 0 20px", borderLeft: "1px solid #eae7e2" } }}>
        <Box sx={{ p: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #eae7e2" }}>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", fontFamily: "Inter, sans-serif" }}>Notifications</Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {unread > 0 && (
              <Typography onClick={handleMarkAllRead} sx={{ fontSize: 12, color: "#c86030", cursor: "pointer", fontWeight: 600, fontFamily: "Inter, sans-serif", "&:hover": { textDecoration: "underline" } }}>
                Mark all read
              </Typography>
            )}
            {notifications.length > 0 && (
              <Typography onClick={handleClearAll} sx={{ fontSize: 12, color: "#999", cursor: "pointer", fontFamily: "Inter, sans-serif", "&:hover": { color: "#c62828" } }}>
                Clear all
              </Typography>
            )}
            <IconButton size="small" onClick={() => setNotifOpen(false)} sx={{ color: "#999", ml: 0.5 }}><CloseRoundedIcon sx={{ fontSize: 18 }} /></IconButton>
          </Box>
        </Box>
        <Box sx={{ p: 2 }}>
          {notifications.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 6 }}>
              <Typography sx={{ fontSize: 14, color: "#999", fontFamily: "Inter, sans-serif" }}>No notifications</Typography>
            </Box>
          ) : (
            notifications.map((n) => (
              <Box key={n.id} sx={{ mb: 1.5, p: 1.5, borderRadius: "12px", bgcolor: n.read ? "#faf9f7" : "#fef3f0", border: "1px solid #eae7e2" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 0.5 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", fontFamily: "Inter, sans-serif" }}>{n.title}</Typography>
                  {!n.read && <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "#c86030", mt: 0.5 }} />}
                </Box>
                <Typography sx={{ fontSize: 12, color: "#666", fontFamily: "Inter, sans-serif", mb: 0.5 }}>{n.message}</Typography>
                <Typography sx={{ fontSize: 10.5, color: "#bbb", fontFamily: "Inter, sans-serif" }}>{n.time}</Typography>
              </Box>
            ))
          )}
        </Box>
      </Drawer>

      {/* ═══ SIDEBAR — permanent on desktop, temporary drawer on mobile ═══ */}

      {/* Mobile temporary drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_W,
            bgcolor: "#2a2725",
            borderRight: "none",
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          width: DRAWER_W,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_W,
            bgcolor: "#2a2725",
            borderRight: "none",
            boxSizing: "border-box",
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* ═══ MAIN CONTENT ═══ */}
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          minWidth: 0,
          width: { md: `calc(100% - ${DRAWER_W}px)` },
        }}
      >
        <Toolbar sx={{ minHeight: "54px !important" }} />
        <Box sx={{ px: { xs: 2, sm: 2.5, md: 3 }, py: { xs: 2, md: 2.5 }, flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
