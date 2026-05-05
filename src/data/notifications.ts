const STORAGE_KEY = "cc1_notifications";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

function defaultNotifications(): NotificationItem[] {
  return [
    { id: "1", title: "New Order", message: "Order #ORD-2119 placed by Aarav Mehta", time: "10 min ago", read: false },
    { id: "2", title: "Shift Alert", message: "Shweta Tiwari is 2 hrs late", time: "1 hr ago", read: false },
    { id: "3", title: "Low Stock", message: "Coffee beans running low", time: "3 hrs ago", read: true },
    { id: "4", title: "New Request", message: "Raised request from landing page", time: "5 hrs ago", read: true },
  ];
}

export function getNotifications(): NotificationItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  const defaults = defaultNotifications();
  saveNotifications(defaults);
  return defaults;
}

export function saveNotifications(items: NotificationItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function clearAllNotifications() {
  saveNotifications([]);
}

export function markAllRead() {
  const items = getNotifications().map((n) => ({ ...n, read: true }));
  saveNotifications(items);
}

export function unreadCount(): number {
  return getNotifications().filter((n) => !n.read).length;
}
