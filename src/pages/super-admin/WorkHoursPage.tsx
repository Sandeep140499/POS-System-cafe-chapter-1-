import { useState, useMemo, useEffect } from "react";
import {
  Box, Typography, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PageHeader from "components/common/PageHeader";
import { SimplePagination } from "components/common/AppPagination";
import { TableLoader } from "components/common/AppLoader";

interface ShiftRecord {
  initials: string;
  name: string;
  id: string;
  color: string;
  scheduled: string;
  login: string;
  logout: string;
  hours: string;
  status: "ACTIVE" | "DONE";
  date: string;
}

const SHIFTS: ShiftRecord[] = [
  { initials: "ST", name: "Shweta Tiwari", id: "CC100002", color: "#8d6e63", scheduled: "03:30 pm", login: "05:42 pm", logout: "—", hours: "90 hr 41 min", status: "ACTIVE", date: "2025-04-30" },
  { initials: "SK", name: "Sandeep Kumar", id: "CC100001", color: "#5c6bc0", scheduled: "03:30 pm", login: "11:37 am", logout: "—", hours: "47 min", status: "ACTIVE", date: "2025-04-30" },
  { initials: "SS", name: "Shivam Sagar Mishra", id: "CC100003", color: "#4caf50", scheduled: "09:00 am", login: "09:05 am", logout: "05:00 pm", hours: "7 hr 55 min", status: "DONE", date: "2025-04-29" },
  { initials: "SM", name: "Suman Kumar", id: "CC100004", color: "#ff9800", scheduled: "09:00 am", login: "08:55 am", logout: "05:05 pm", hours: "8 hr 10 min", status: "DONE", date: "2025-04-28" },
  { initials: "RK", name: "Ravi Kumar", id: "CC100005", color: "#e91e63", scheduled: "03:30 pm", login: "03:40 pm", logout: "11:30 pm", hours: "7 hr 50 min", status: "DONE", date: "2025-04-27" },
  { initials: "PS", name: "Priya Sharma", id: "CC100006", color: "#00bcd4", scheduled: "09:00 am", login: "09:10 am", logout: "05:00 pm", hours: "7 hr 50 min", status: "DONE", date: "2025-04-26" },
  { initials: "AK", name: "Amit Khanna", id: "CC100007", color: "#795548", scheduled: "03:30 pm", login: "03:25 pm", logout: "11:35 pm", hours: "8 hr 10 min", status: "DONE", date: "2025-04-25" },
  { initials: "NR", name: "Neha Rao", id: "CC100008", color: "#607d8b", scheduled: "09:00 am", login: "09:00 am", logout: "05:00 pm", hours: "8 hr", status: "DONE", date: "2025-04-24" },
  { initials: "DK", name: "Deepak Kumar", id: "CC100009", color: "#9c27b0", scheduled: "03:30 pm", login: "03:45 pm", logout: "11:45 pm", hours: "8 hr", status: "DONE", date: "2025-03-28" },
  { initials: "RA", name: "Riya Agarwal", id: "CC100010", color: "#c86030", scheduled: "09:00 am", login: "09:05 am", logout: "05:10 pm", hours: "8 hr 5 min", status: "DONE", date: "2025-03-15" },
  { initials: "VM", name: "Vikram Mehta", id: "CC100011", color: "#4caf50", scheduled: "03:30 pm", login: "03:30 pm", logout: "11:30 pm", hours: "8 hr", status: "DONE", date: "2025-03-10" },
  { initials: "ST", name: "Shweta Tiwari", id: "CC100002", color: "#8d6e63", scheduled: "03:30 pm", login: "03:35 pm", logout: "11:40 pm", hours: "8 hr 5 min", status: "DONE", date: "2025-03-05" },
];

const hSx = { fontSize: 10, fontWeight: 700, color: "#999", letterSpacing: "0.08em", textTransform: "uppercase" as const, borderBottom: "1px solid #eae7e2", py: 1.5, fontFamily: "Inter, sans-serif" };
const cSx = { borderBottom: "1px solid #eae7e2", py: 2, fontFamily: "Inter, sans-serif" };

const PAGE_SIZE = 10;

export default function WorkHoursPage() {
  const [search, setSearch] = useState("");
  const [month, setMonth] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 400); return () => clearTimeout(t); }, []);

  const months = useMemo(() => {
    const m = new Set<string>();
    SHIFTS.forEach((s) => {
      const d = new Date(s.date);
      m.add(d.toLocaleString("default", { month: "long", year: "numeric" }));
    });
    return ["All", ...Array.from(m)];
  }, []);

  const filtered = useMemo(() => {
    let list = [...SHIFTS];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q));
    }
    if (month !== "All") {
      list = list.filter((s) => {
        const d = new Date(s.date);
        return d.toLocaleString("default", { month: "long", year: "numeric" }) === month;
      });
    }
    if (startDate) {
      list = list.filter((s) => s.date >= startDate);
    }
    if (endDate) {
      list = list.filter((s) => s.date <= endDate);
    }
    return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [search, month, startDate, endDate]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <Box>
      <PageHeader label="WORK HOURS" title="Work Hours" subtitle="Shift logs and time tracking for all staff today." />

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 1.5, mb: 2.5, flexWrap: "wrap", alignItems: "center" }}>
        <TextField
          placeholder="Search name, code..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          size="small"
          sx={{
            width: 260,
            "& .MuiOutlinedInput-root": { borderRadius: "20px", bgcolor: "#fff", height: 38, fontSize: 14, fontFamily: "Inter, sans-serif", "& fieldset": { borderColor: "#eae7e2" }, "&.Mui-focused fieldset": { borderColor: "#c86030" } },
          }}
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 17, color: "#999" }} /></InputAdornment> } }}
        />
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel sx={{ fontFamily: "Inter, sans-serif", fontSize: 13.5 }}>Month</InputLabel>
          <Select value={month} label="Month" onChange={(e) => { setMonth(e.target.value); setPage(1); }} sx={{ borderRadius: "10px", fontFamily: "Inter, sans-serif", bgcolor: "#fff", height: 38, "& .MuiOutlinedInput-notchedOutline": { borderColor: "#eae7e2" } }}>
            {months.map((m) => (
              <MenuItem key={m} value={m}>{m}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="From"
          type="date"
          size="small"
          value={startDate}
          onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", bgcolor: "#fff", height: 38, fontSize: 13, fontFamily: "Inter, sans-serif" }, "& .MuiInputLabel-root": { fontSize: 12 } }}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          label="To"
          type="date"
          size="small"
          value={endDate}
          onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px", bgcolor: "#fff", height: 38, fontSize: 13, fontFamily: "Inter, sans-serif" }, "& .MuiInputLabel-root": { fontSize: 12 } }}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </Box>

      <Box sx={{ bgcolor: "#fff", borderRadius: "20px", border: "1px solid #eae7e2", overflow: "hidden" }}>
        {loading ? (
          <TableLoader rows={5} />
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={hSx}>Employee</TableCell>
                  <TableCell sx={hSx}>Date</TableCell>
                  <TableCell sx={hSx}>Scheduled</TableCell>
                  <TableCell sx={hSx}>Login</TableCell>
                  <TableCell sx={hSx}>Logout</TableCell>
                  <TableCell sx={hSx}>Total Hours</TableCell>
                  <TableCell sx={hSx}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginated.map((s) => (
                  <TableRow key={`${s.id}-${s.date}`} sx={{ "&:hover": { bgcolor: "#faf9f7" }, "&:last-child td": { border: 0 } }}>
                    <TableCell sx={cSx}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: s.color, fontSize: 11, fontWeight: 700 }}>{s.initials}</Avatar>
                        <Box>
                          <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", fontFamily: "Inter, sans-serif" }}>{s.name}</Typography>
                          <Typography sx={{ fontSize: 11.5, color: "#999", fontFamily: "Inter, sans-serif" }}>{s.id}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={cSx}><Typography sx={{ fontSize: 13, color: "#555", fontFamily: "Inter, sans-serif" }}>{s.date}</Typography></TableCell>
                    <TableCell sx={cSx}><Typography sx={{ fontSize: 14, color: "#333", fontFamily: "Inter, sans-serif" }}>{s.scheduled}</Typography></TableCell>
                    <TableCell sx={cSx}><Typography sx={{ fontSize: 14, color: "#333", fontFamily: "Inter, sans-serif" }}>{s.login}</Typography></TableCell>
                    <TableCell sx={cSx}><Typography sx={{ fontSize: 14, color: "#333", fontFamily: "Inter, sans-serif" }}>{s.logout}</Typography></TableCell>
                    <TableCell sx={cSx}><Typography sx={{ fontSize: 14, fontWeight: 500, color: "#c86030", fontFamily: "Inter, sans-serif" }}>{s.hours}</Typography></TableCell>
                    <TableCell sx={cSx}>
                      <Chip label={s.status} size="small" sx={{ bgcolor: s.status === "ACTIVE" ? "#e3f0e8" : "#eeedea", color: s.status === "ACTIVE" ? "#2e7d32" : "#666", fontWeight: 600, fontSize: 11, height: 24, borderRadius: "12px", fontFamily: "Inter, sans-serif" }} />
                    </TableCell>
                  </TableRow>
                ))}
                {paginated.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ py: 4, textAlign: "center", fontFamily: "Inter, sans-serif", color: "#999", fontSize: 14 }}>
                      No shift records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Pagination */}
      {filtered.length > 0 && (
        <SimplePagination page={safePage} totalPages={totalPages} onPageChange={(p) => setPage(p)} />
      )}
    </Box>
  );
}
