import { useState, useMemo, useEffect } from "react";
import {
  Box, Typography, Button, Chip, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, TextField,
  InputAdornment, Select, MenuItem, FormControl, InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import PageHeader from "components/common/PageHeader";
import { SimplePagination } from "components/common/AppPagination";
import { TableLoader } from "components/common/AppLoader";
import {
  getRaisedRequests,
  deleteRaisedRequest,
  updateRaisedRequestStatus,
  type RaisedRequest,
} from "data/raisedRequests";

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

const cSx = { borderBottom: "1px solid #eae7e2", py: 1.8, fontFamily: "Inter, sans-serif" };

const PAGE_SIZE = 10;

export default function RaisedRequestsPage() {
  const [requests, setRequests] = useState<RaisedRequest[]>(getRaisedRequests);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 400); return () => clearTimeout(t); }, []);

  const filtered = useMemo(() => {
    let list = [...requests];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.phone.includes(q) ||
          r.orderNumber.toLowerCase().includes(q) ||
          r.reason.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "All") {
      list = list.filter((r) => r.status === statusFilter);
    }
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [requests, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleDelete = (id: number) => {
    deleteRaisedRequest(id);
    setRequests(getRaisedRequests());
  };

  const handleStatusToggle = (id: number, current: RaisedRequest["status"]) => {
    updateRaisedRequestStatus(id, current === "PENDING" ? "RESOLVED" : "PENDING");
    setRequests(getRaisedRequests());
  };

  const downloadCSV = () => {
    const rows = [
      "Name,Phone,Order Number,Reason,Status,Created At",
      ...filtered.map(
        (r) =>
          `${r.name},${r.phone},${r.orderNumber},"${r.reason}",${r.status},${new Date(r.createdAt).toLocaleString()}`
      ),
    ];
    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "raised_requests.csv";
    a.click();
  };

  const pendingCount = requests.filter((r) => r.status === "PENDING").length;
  const resolvedCount = requests.filter((r) => r.status === "RESOLVED").length;

  return (
    <Box>
      <PageHeader
        label="RAISED REQUESTS"
        title="Raised Requests"
        subtitle="Customer and staff escalations pending review."
      />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 2, mb: 3 }}>
        {[
          { label: "TOTAL REQUESTS", value: requests.length },
          { label: "PENDING", value: pendingCount },
          { label: "RESOLVED", value: resolvedCount },
        ].map((s) => (
          <Box key={s.label} sx={{ bgcolor: "#fff", borderRadius: "20px", border: "1px solid #eae7e2", p: 2.5 }}>
            <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: "#c86030", letterSpacing: "0.1em", textTransform: "uppercase", mb: 0.5, fontFamily: "Inter, sans-serif" }}>
              {s.label}
            </Typography>
            <Typography sx={{ fontSize: 28, fontWeight: 700, color: "#1a1a1a", fontFamily: "Inter, sans-serif" }}>{s.value}</Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: "flex", gap: 1.5, mb: 2.5, flexWrap: "wrap", alignItems: "center" }}>
        <TextField
          placeholder="Search name, phone, order, reason..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          size="small"
          sx={{
            width: 300,
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              bgcolor: "#fff",
              height: 38,
              fontSize: 14,
              fontFamily: "Inter, sans-serif",
              "& fieldset": { borderColor: "#eae7e2" },
              "&.Mui-focused fieldset": { borderColor: "#c86030" },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 17, color: "#999" }} />
                </InputAdornment>
              ),
            },
          }}
        />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel sx={{ fontFamily: "Inter, sans-serif", fontSize: 13.5 }}>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            sx={{
              borderRadius: "10px",
              fontFamily: "Inter, sans-serif",
              bgcolor: "#fff",
              height: 38,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#eae7e2" },
            }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="RESOLVED">Resolved</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
          <Button
            startIcon={<FileDownloadOutlinedIcon sx={{ fontSize: 17 }} />}
            onClick={downloadCSV}
            sx={{
              bgcolor: "#1a1a1a",
              color: "#fff",
              borderRadius: "20px",
              px: 2,
              textTransform: "none",
              fontSize: 13.5,
              fontFamily: "Inter, sans-serif",
              height: 36,
              "&:hover": { bgcolor: "#333" },
            }}
          >
            Download CSV
          </Button>
        </Box>
      </Box>

      <Box sx={{ bgcolor: "#fff", borderRadius: "20px", border: "1px solid #eae7e2", overflow: "hidden" }}>
        {loading ? (
          <TableLoader rows={5} />
        ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={hSx}>Name</TableCell>
                <TableCell sx={hSx}>Phone</TableCell>
                <TableCell sx={hSx}>Order #</TableCell>
                <TableCell sx={hSx}>Reason</TableCell>
                <TableCell sx={{ ...hSx, textAlign: "center" }}>Status</TableCell>
                <TableCell sx={hSx}>Date</TableCell>
                <TableCell sx={{ ...hSx, textAlign: "center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((r) => (
                <TableRow key={r.id} sx={{ "&:hover": { bgcolor: "#faf9f7" }, "&:last-child td": { border: 0 } }}>
                  <TableCell sx={cSx}>
                    <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", fontFamily: "Inter, sans-serif" }}>{r.name}</Typography>
                  </TableCell>
                  <TableCell sx={cSx}>
                    <Typography sx={{ fontSize: 14, color: "#555", fontFamily: "Inter, sans-serif" }}>{r.phone}</Typography>
                  </TableCell>
                  <TableCell sx={cSx}>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#c86030", fontFamily: "Inter, sans-serif" }}>{r.orderNumber}</Typography>
                  </TableCell>
                  <TableCell sx={cSx}>
                    <Typography sx={{ fontSize: 13, color: "#555", fontFamily: "Inter, sans-serif", maxWidth: 280, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={r.reason}>
                      {r.reason}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ ...cSx, textAlign: "center" }}>
                    <Chip
                      label={r.status}
                      size="small"
                      onClick={() => handleStatusToggle(r.id, r.status)}
                      sx={{
                        bgcolor: r.status === "PENDING" ? "#fef3f0" : "#e3f0e8",
                        color: r.status === "PENDING" ? "#c86030" : "#2e7d32",
                        fontWeight: 700,
                        fontSize: 11,
                        height: 24,
                        borderRadius: "12px",
                        fontFamily: "Inter, sans-serif",
                        cursor: "pointer",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={cSx}>
                    <Typography sx={{ fontSize: 13, color: "#888", fontFamily: "Inter, sans-serif" }}>
                      {new Date(r.createdAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ ...cSx, textAlign: "center" }}>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(r.id)}
                      sx={{ color: "#888", "&:hover": { color: "#c62828", bgcolor: "#fce4e4" } }}
                    >
                      <DeleteOutlineRoundedIcon sx={{ fontSize: 17 }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} sx={{ py: 4, textAlign: "center", fontFamily: "Inter, sans-serif", color: "#999", fontSize: 14 }}>
                    No requests found.
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
