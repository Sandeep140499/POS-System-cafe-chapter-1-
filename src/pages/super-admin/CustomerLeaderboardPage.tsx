import { useState, useMemo, useEffect } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Avatar } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import PageHeader from "components/common/PageHeader";
import { SimplePagination } from "components/common/AppPagination";
import { TableLoader } from "components/common/AppLoader";
import { 
  getCustomers, 
  deleteCustomer as deleteCustomerApi, 
  downloadCustomersCSV,
  type Customer 
} from "services/customerService";

const COLORS = ["#c86030","#5c6bc0","#4caf50","#ff9800","#e91e63","#00bcd4","#795548","#607d8b","#9c27b0","#ff5722"];

const hSx = { fontSize:10, fontWeight:700, color:"#999", letterSpacing:"0.08em", textTransform:"uppercase" as const, borderBottom:"1px solid #eae7e2", py:1.5, fontFamily:"Inter, sans-serif" };
const cSx = { borderBottom:"1px solid #eae7e2", py:1.8, fontFamily:"Inter, sans-serif" };

function RankBadge({ rank }: { rank: number }) {
  const gold = rank === 1 ? "#FFD700" : rank === 2 ? "#C0C0C0" : rank === 3 ? "#CD7F32" : null;
  if (gold) return <Box sx={{ width:28, height:28, borderRadius:"50%", bgcolor:gold, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:13, fontFamily:"Inter, sans-serif" }}>#{rank}</Box>;
  return <Typography sx={{ fontSize:14, color:"#888", fontFamily:"Inter, sans-serif", pl:0.5 }}>#{rank}</Typography>;
}

const PAGE_SIZE = 10;

export function CustomerLeaderboardPage() {
  const [data, setData] = useState<Customer[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch customers from API (mock or real)
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setError(null);
        const customers = await getCustomers();
        setData(customers);
      } catch (err) {
        console.error("Failed to fetch customers:", err);
        setError("Failed to load customers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const sorted = useMemo(() => [...data].sort((a, b) => b.spent - a.spent), [data]);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = sorted.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const ranked = paginated.map((r, i) => ({ ...r, rank: (safePage - 1) * PAGE_SIZE + i + 1 }));

  // Download CSV using service function
  const handleDownloadCSV = () => {
    downloadCustomersCSV(sorted, "leaderboard.csv");
  };

  // Delete customer via API
  const handleDeleteCustomer = async (id: number) => {
    try {
      await deleteCustomerApi(id);
      // Refresh data after delete
      const updatedCustomers = await getCustomers();
      setData(updatedCustomers);
    } catch (err) {
      console.error("Failed to delete customer:", err);
      // Fallback: remove from local state if API fails
      setData(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <Box>
      <PageHeader label="CUSTOMER LEADERBOARD" title="Customer Leaderboard" subtitle="Top customers ranked by total spend." />
      <Box sx={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2, mb:3 }}>
        {[
          { label:"TOTAL CUSTOMERS", value:data.length },
          { label:"TOTAL ORDERS", value:data.reduce((s,r) => s+r.orders, 0) },
          { label:"TOTAL REVENUE", value:`₹${data.reduce((s,r) => s+r.spent, 0).toLocaleString("en-IN")}` },
        ].map(s => (
          <Box key={s.label} sx={{ bgcolor:"#fff", borderRadius:"20px", border:"1px solid #eae7e2", p:2.5 }}>
            <Typography sx={{ fontSize:10.5, fontWeight:700, color:"#c86030", letterSpacing:"0.1em", textTransform:"uppercase", mb:0.5, fontFamily:"Inter, sans-serif" }}>{s.label}</Typography>
            <Typography sx={{ fontSize:28, fontWeight:700, color:"#1a1a1a", fontFamily:"Inter, sans-serif" }}>{s.value}</Typography>
          </Box>
        ))}
      </Box>

      {error && (
        <Box sx={{ bgcolor: "#fce4e4", color: "#c62828", p: 2, borderRadius: "10px", mb: 2 }}>
          <Typography sx={{ fontFamily: "Inter, sans-serif", fontSize: 14 }}>{error}</Typography>
        </Box>
      )}

      <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", mb:2.5 }}>
        <Button startIcon={<FileDownloadOutlinedIcon sx={{ fontSize:17 }} />} onClick={handleDownloadCSV} sx={{ bgcolor:"#1a1a1a", color:"#fff", borderRadius:"20px", px:2, textTransform:"none", fontSize:13.5, fontFamily:"Inter, sans-serif", height:36, "&:hover": { bgcolor:"#333" } }}>Download CSV</Button>
      </Box>

      <Box sx={{ bgcolor:"#fff", borderRadius:"20px", border:"1px solid #eae7e2", overflow:"hidden" }}>
        {loading ? (
          <TableLoader rows={5} />
        ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={hSx}>Rank</TableCell>
                <TableCell sx={hSx}>Customer</TableCell>
                <TableCell sx={hSx}>Number</TableCell>
                <TableCell sx={{ ...hSx, textAlign:"center" }}>Orders</TableCell>
                <TableCell sx={{ ...hSx, textAlign:"right" }}>Total Spent</TableCell>
                <TableCell sx={{ ...hSx, textAlign:"center" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ranked.map(r => (
                <TableRow key={r.id} sx={{ "&:hover": { bgcolor:"#faf9f7" }, "&:last-child td": { border:0 }, bgcolor: r.rank <= 3 ? "rgba(200,96,48,0.02)" : "transparent" }}>
                  <TableCell sx={cSx}><RankBadge rank={r.rank} /></TableCell>
                  <TableCell sx={cSx}>
                    <Box sx={{ display:"flex", alignItems:"center", gap:1.2 }}>
                      <Avatar sx={{ width:32, height:32, bgcolor:COLORS[(r.rank-1) % COLORS.length], fontSize:12, fontWeight:700 }}>{r.name.charAt(0)}</Avatar>
                      <Typography sx={{ fontSize:14, fontWeight:600, color:"#1a1a1a", fontFamily:"Inter, sans-serif" }}>{r.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={cSx}><Typography sx={{ fontSize:14, color:"#666", fontFamily:"Inter, sans-serif" }}>{r.mobile}</Typography></TableCell>
                  <TableCell sx={{ ...cSx, textAlign:"center" }}><Typography sx={{ fontSize:14, fontWeight:600, color:"#333", fontFamily:"Inter, sans-serif" }}>{r.orders}</Typography></TableCell>
                  <TableCell sx={{ ...cSx, textAlign:"right" }}><Typography sx={{ fontSize:15, fontWeight:700, color:"#2e7d32", fontFamily:"Inter, sans-serif" }}>₹{r.spent.toLocaleString("en-IN")}</Typography></TableCell>
                  <TableCell sx={{ ...cSx, textAlign:"center" }}>
                    <IconButton size="small" onClick={() => handleDeleteCustomer(r.id)} sx={{ color:"#888", "&:hover": { color:"#c62828", bgcolor:"#fce4e4" } }}><DeleteOutlineRoundedIcon sx={{ fontSize:17 }} /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        )}
      </Box>

      {/* Pagination */}
      {sorted.length > 0 && (
        <SimplePagination page={safePage} totalPages={totalPages} onPageChange={(p) => setPage(p)} />
      )}
    </Box>
  );
}
