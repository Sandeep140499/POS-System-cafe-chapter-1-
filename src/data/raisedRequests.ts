export interface RaisedRequest {
  id: number;
  name: string;
  phone: string;
  orderNumber: string;
  reason: string;
  status: "PENDING" | "RESOLVED";
  createdAt: string;
}

const STORAGE_KEY = "cc1_raised_requests";

export function getRaisedRequests(): RaisedRequest[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INIT_DATA;
    return JSON.parse(raw) as RaisedRequest[];
  } catch {
    return INIT_DATA;
  }
}

export function saveRaisedRequests(data: RaisedRequest[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function addRaisedRequest(req: Omit<RaisedRequest, "id" | "status" | "createdAt">): RaisedRequest {
  const all = getRaisedRequests();
  const newItem: RaisedRequest = {
    id: Date.now(),
    ...req,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };
  all.unshift(newItem);
  saveRaisedRequests(all);
  return newItem;
}

export function deleteRaisedRequest(id: number) {
  const all = getRaisedRequests().filter(r => r.id !== id);
  saveRaisedRequests(all);
}

export function updateRaisedRequestStatus(id: number, status: RaisedRequest["status"]) {
  const all = getRaisedRequests().map(r => r.id === id ? { ...r, status } : r);
  saveRaisedRequests(all);
}

const INIT_DATA: RaisedRequest[] = [
  { id: 1, name: "Aarav Mehta", phone: "9876543210", orderNumber: "ORD-2104", reason: "Wrong item delivered", status: "PENDING", createdAt: "2025-04-30T10:00:00Z" },
  { id: 2, name: "Priya Singh", phone: "9123456789", orderNumber: "ORD-2103", reason: "Order took too long", status: "PENDING", createdAt: "2025-04-29T14:30:00Z" },
  { id: 3, name: "Rohan Khanna", phone: "9988776655", orderNumber: "ORD-2102", reason: "Cold food received", status: "RESOLVED", createdAt: "2025-04-28T09:15:00Z" },
];
