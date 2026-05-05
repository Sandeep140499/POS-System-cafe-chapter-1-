import { useState, useMemo, useEffect } from "react";
import { Box, Typography, Button, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, TextField, InputAdornment, IconButton, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { SimplePagination } from "components/common/AppPagination";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PageHeader from "components/common/PageHeader";
import { TableLoader } from "components/common/AppLoader";

const ORDERS_DATA = [
  { id: "ORD-2119", customer: "Aarav Mehta", phone: "98XXX12345", items: 3, txn: "TXN84034", time: "02:15 pm", date: "2025-04-30", status: "PAID", totalRaw: 690 },
  { id: "ORD-2118", customer: "Priya Singh", phone: "98XXX22341", items: 2, txn: "TXN84033", time: "01:48 pm", date: "2025-04-30", status: "PENDING", totalRaw: 410 },
  { id: "ORD-2117", customer: "Rohan Khanna", phone: "98XXX98712", items: 1, txn: "TXN84032", time: "01:22 pm", date: "2025-04-30", status: "PAID", totalRaw: 180 },
  { id: "ORD-2116", customer: "Ananya Rao", phone: "98XXX55501", items: 4, txn: "TXN84031", time: "12:55 pm", date: "2025-04-30", status: "PAID", totalRaw: 924 },
  { id: "ORD-2115", customer: "Karan Patel", phone: "98XXX44120", items: 2, txn: "TXN84030", time: "12:10 pm", date: "2025-04-30", status: "PENDING", totalRaw: 380 },
  { id: "ORD-2114", customer: "Neha Gupta", phone: "98XXX11223", items: 3, txn: "TXN84029", time: "11:42 am", date: "2025-04-30", status: "PAID", totalRaw: 520 },
  { id: "ORD-2113", customer: "Vikram Rao", phone: "98XXX33445", items: 5, txn: "TXN84028", time: "11:05 am", date: "2025-04-30", status: "PAID", totalRaw: 1150 },
  { id: "ORD-2112", customer: "Sneha Verma", phone: "98XXX55667", items: 2, txn: "TXN84027", time: "10:38 am", date: "2025-04-30", status: "PENDING", totalRaw: 290 },
  { id: "ORD-2111", customer: "Ravi Kumar", phone: "98XXX77889", items: 1, txn: "TXN84026", time: "10:15 am", date: "2025-04-30", status: "PAID", totalRaw: 150 },
  { id: "ORD-2110", customer: "Pooja Sharma", phone: "98XXX99001", items: 4, txn: "TXN84025", time: "09:50 am", date: "2025-04-30", status: "PAID", totalRaw: 780 },
  { id: "ORD-2109", customer: "Amit Joshi", phone: "98XXX22334", items: 2, txn: "TXN84024", time: "09:20 am", date: "2025-04-30", status: "REJECT", totalRaw: 340 },
  { id: "ORD-2108", customer: "Divya Nair", phone: "98XXX44556", items: 3, txn: "TXN84023", time: "08:55 am", date: "2025-04-30", status: "PAID", totalRaw: 610 },
  { id: "ORD-2107", customer: "Suresh Gupta", phone: "98XXX66778", items: 1, txn: "TXN84022", time: "08:30 am", date: "2025-04-30", status: "PAID", totalRaw: 120 },
  { id: "ORD-2106", customer: "Meena Das", phone: "98XXX88990", items: 2, txn: "TXN84021", time: "08:05 am", date: "2025-04-30", status: "PENDING", totalRaw: 260 },
  { id: "ORD-2105", customer: "Rajesh Iyer", phone: "98XXX00112", items: 6, txn: "TXN84020", time: "07:40 am", date: "2025-04-30", status: "PAID", totalRaw: 1420 },
  { id: "ORD-2104", customer: "Aarav Mehta", phone: "98XXX12345", items: 3, txn: "TXN84019", time: "11:42 am", date: "2025-04-29", status: "PAID", totalRaw: 690 },
  { id: "ORD-2103", customer: "Priya Singh", phone: "98XXX22341", items: 2, txn: "TXN84018", time: "11:18 am", date: "2025-04-29", status: "PENDING", totalRaw: 410 },
  { id: "ORD-2102", customer: "Rohan Khanna", phone: "98XXX98712", items: 1, txn: "TXN84017", time: "10:55 am", date: "2025-04-29", status: "PAID", totalRaw: 180 },
  { id: "ORD-2101", customer: "Ananya Rao", phone: "98XXX55501", items: 4, txn: "TXN84016", time: "10:31 am", date: "2025-04-29", status: "PAID", totalRaw: 924 },
  { id: "ORD-2100", customer: "Karan Patel", phone: "98XXX44120", items: 2, txn: "TXN84015", time: "09:48 am", date: "2025-04-29", status: "PENDING", totalRaw: 380 },
  { id: "ORD-2099", customer: "Neha Gupta", phone: "98XXX11223", items: 3, txn: "TXN84014", time: "09:15 am", date: "2025-04-28", status: "PAID", totalRaw: 520 },
  { id: "ORD-2098", customer: "Vikram Rao", phone: "98XXX33445", items: 5, txn: "TXN84013", time: "08:50 am", date: "2025-04-28", status: "PAID", totalRaw: 1150 },
  { id: "ORD-2097", customer: "Sneha Verma", phone: "98XXX55667", items: 2, txn: "TXN84012", time: "08:20 am", date: "2025-04-28", status: "PENDING", totalRaw: 290 },
  { id: "ORD-2096", customer: "Ravi Kumar", phone: "98XXX77889", items: 1, txn: "TXN84011", time: "07:55 am", date: "2025-04-28", status: "PAID", totalRaw: 150 },
  { id: "ORD-2095", customer: "Pooja Sharma", phone: "98XXX99001", items: 4, txn: "TXN84010", time: "07:30 am", date: "2025-04-27", status: "PAID", totalRaw: 780 },
  { id: "ORD-2094", customer: "Amit Joshi", phone: "98XXX22334", items: 2, txn: "TXN84009", time: "07:05 am", date: "2025-04-27", status: "PENDING", totalRaw: 340 },
  { id: "ORD-2093", customer: "Divya Nair", phone: "98XXX44556", items: 3, txn: "TXN84008", time: "06:40 am", date: "2025-04-27", status: "PAID", totalRaw: 610 },
  { id: "ORD-2092", customer: "Suresh Gupta", phone: "98XXX66778", items: 1, txn: "TXN84007", time: "06:15 am", date: "2025-04-26", status: "PAID", totalRaw: 120 },
  { id: "ORD-2091", customer: "Meena Das", phone: "98XXX88990", items: 2, txn: "TXN84006", time: "05:50 am", date: "2025-04-26", status: "PENDING", totalRaw: 260 },
  { id: "ORD-2090", customer: "Rajesh Iyer", phone: "98XXX00112", items: 6, txn: "TXN84005", time: "05:25 am", date: "2025-04-26", status: "PAID", totalRaw: 1420 },
];

const tabs = ["All", "Paid", "Pending", "Reject"];

const hSx = {
  fontSize: 10,
  fontWeight: 700,
  color: "#999",
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  borderBottom: "1px solid #eae7e2",
  py: 1.5,
  fontFamily: "Inter, sans-serif",
};

const cSx = { borderBottom: "1px solid #eae7e2", py: 2, fontFamily: "Inter, sans-serif" };

function formatINR(n: number) {
  return "\u20B9" + n.toLocaleString("en-IN");
}

function parseDate(d: string) {
  return new Date(d + "T00:00:00");
}

export default function AllOrdersPage() {
  const [tab, setTab] = useState("All");
  const [month, setMonth] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const PAGE_SIZE = 10;

  useEffect(() => { const t = setTimeout(() => setLoading(false), 400); return () => clearTimeout(t); }, []);

  const months = useMemo(() => {
    const m = new Set<string>();
    ORDERS_DATA.forEach((o) => {
      const d = parseDate(o.date);
      const label = d.toLocaleString("default", { month: "long", year: "numeric" });
      m.add(label);
    });
    return ["All", ...Array.from(m)];
  }, []);

  const filtered = useMemo(() => {
    let list = ORDERS_DATA.filter((o) => (tab === "All" ? true : o.status === tab.toUpperCase()));

    if (month !== "All") {
      list = list.filter((o) => {
        const d = parseDate(o.date);
        return d.toLocaleString("default", { month: "long", year: "numeric" }) === month;
      });
    }

    if (startDate) {
      const s = parseDate(startDate);
      list = list.filter((o) => parseDate(o.date) >= s);
    }
    if (endDate) {
      const e = parseDate(endDate);
      list = list.filter((o) => parseDate(o.date) <= e);
    }

    return list;
  }, [tab, month, startDate, endDate]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handlePageChange = (value: number) => {
    setPage(value);
  };

  const exportCSV = () => {
    const rows = [
      "Order,Customer,Phone,Items,TXN,Date,Time,Status,Total",
      ...filtered.map((o) => `${o.id},${o.customer},${o.phone},${o.items},${o.txn},${o.date},${o.time},${o.status},${o.totalRaw}`),
    ];
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "orders.csv";
    a.click();
  };

  return (
    <Box>
      <PageHeader label="ALL ORDERS" title="All Orders" />

      {/* Filter tabs + controls */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mb: 2, alignItems: "center" }}>
        <Box sx={{ display: "flex", gap: 0.5 }}>
          {tabs.map((t) => (
            <Button
              key={t}
              onClick={() => { setTab(t); setPage(1); }}
              variant={t === tab ? "contained" : "text"}
              sx={{
                borderRadius: "20px",
                px: 2.5,
                py: 0.5,
                minHeight: 36,
                fontSize: 13.5,
                fontWeight: t === tab ? 600 : 400,
                textTransform: "none",
                color: t === tab ? "#fff" : "#555",
                bgcolor: t === tab ? "#1a1a1a" : "transparent",
                "&:hover": { bgcolor: t === tab ? "#000" : "rgba(0,0,0,0.05)" },
                fontFamily: "Inter, sans-serif",
              }}
            >
              {t}
            </Button>
          ))}
        </Box>

        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel sx={{ fontFamily: "Inter, sans-serif", fontSize: 13.5 }}>Month</InputLabel>
          <Select
            value={month}
            label="Month"
            onChange={(e) => { setMonth(e.target.value); setPage(1); }}
            sx={{ borderRadius: "10px", fontFamily: "Inter, sans-serif", bgcolor: "#fff", height: 36, "& .MuiOutlinedInput-notchedOutline": { borderColor: "#eae7e2" } }}
          >
            {months.map((m) => (
              <MenuItem key={m} value={m} sx={{ fontFamily: "Inter, sans-serif" }}>{m}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          type="date"
          label="From"
          value={startDate}
          onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
          size="small"
          sx={{
            width: 150,
            "& .MuiOutlinedInput-root": { borderRadius: "10px", bgcolor: "#fff", height: 36, fontSize: 13.5, fontFamily: "Inter, sans-serif", "& fieldset": { borderColor: "#eae7e2" } },
            "& .MuiInputLabel-root": { fontFamily: "Inter, sans-serif", fontSize: 13.5 },
          }}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          type="date"
          label="To"
          value={endDate}
          onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
          size="small"
          sx={{
            width: 150,
            "& .MuiOutlinedInput-root": { borderRadius: "10px", bgcolor: "#fff", height: 36, fontSize: 13.5, fontFamily: "Inter, sans-serif", "& fieldset": { borderColor: "#eae7e2" } },
            "& .MuiInputLabel-root": { fontFamily: "Inter, sans-serif", fontSize: 13.5 },
          }}
          slotProps={{ inputLabel: { shrink: true } }}
        />

        <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<FileDownloadIcon sx={{ fontSize: 16 }} />}
            onClick={exportCSV}
            sx={{
              bgcolor: "#1a1a1a",
              color: "#fff",
              borderRadius: "20px",
              px: 2.5,
              textTransform: "none",
              fontSize: 13.5,
              fontWeight: 500,
              fontFamily: "Inter, sans-serif",
              height: 36,
              "&:hover": { bgcolor: "#000" },
            }}
          >
            Export
          </Button>
        </Box>
      </Box>

      {/* Table */}
      <Box sx={{ bgcolor: "#fff", borderRadius: "20px", border: "1px solid #eae7e2", overflow: "hidden" }}>
        {loading ? (
          <TableLoader rows={5} />
        ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={hSx}>Order</TableCell>
                <TableCell sx={hSx}>Customer</TableCell>
                <TableCell sx={hSx}>Phone</TableCell>
                <TableCell sx={hSx}>Items</TableCell>
                <TableCell sx={hSx}>TXN</TableCell>
                <TableCell sx={hSx}>Date</TableCell>
                <TableCell sx={hSx}>Time</TableCell>
                <TableCell sx={hSx}>Status</TableCell>
                <TableCell sx={{ ...hSx, textAlign: "right" }}>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((o) => (
                <TableRow key={o.id} sx={{ "&:hover": { bgcolor: "#faf9f7" }, "&:last-child td": { border: 0 } }}>
                  <TableCell sx={cSx}>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", fontFamily: "Inter, sans-serif" }}>{o.id}</Typography>
                  </TableCell>
                  <TableCell sx={cSx}>
                    <Typography sx={{ fontSize: 14, color: "#333", fontFamily: "Inter, sans-serif" }}>{o.customer}</Typography>
                  </TableCell>
                  <TableCell sx={cSx}>
                    <Typography sx={{ fontSize: 14, color: "#666", fontFamily: "Inter, sans-serif" }}>{o.phone}</Typography>
                  </TableCell>
                  <TableCell sx={cSx}>
                    <Typography sx={{ fontSize: 14, color: "#333", fontFamily: "Inter, sans-serif" }}>{o.items}</Typography>
                  </TableCell>
                  <TableCell sx={cSx}>
                    <Typography sx={{ fontSize: 13, color: "#888", fontFamily: "Inter, sans-serif" }}>{o.txn}</Typography>
                  </TableCell>
                  <TableCell sx={cSx}>
                    <Typography sx={{ fontSize: 14, color: "#333", fontFamily: "Inter, sans-serif" }}>{o.date}</Typography>
                  </TableCell>
                  <TableCell sx={cSx}>
                    <Typography sx={{ fontSize: 14, color: "#333", fontFamily: "Inter, sans-serif" }}>{o.time}</Typography>
                  </TableCell>
                  <TableCell sx={cSx}>
                    <Chip
                      label={o.status}
                      size="small"
                      sx={{
                        bgcolor: o.status === "PAID" ? "#e3f0e8" : o.status === "REJECT" ? "#fce4e4" : "#fff8e1",
                        color: o.status === "PAID" ? "#2e7d32" : o.status === "REJECT" ? "#c62828" : "#f57c00",
                        fontWeight: 700,
                        fontSize: 11,
                        height: 24,
                        borderRadius: "12px",
                        fontFamily: "Inter, sans-serif",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ ...cSx, textAlign: "right" }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a", fontFamily: "Inter, sans-serif" }}>{formatINR(o.totalRaw)}</Typography>
                  </TableCell>
                </TableRow>
              ))}
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} sx={{ py: 4, textAlign: "center", fontFamily: "Inter, sans-serif", color: "#999", fontSize: 14 }}>
                    No orders found.
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
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <SimplePagination page={safePage} totalPages={totalPages} onPageChange={handlePageChange} />
        </Box>
      )}
    </Box>
  );
}
