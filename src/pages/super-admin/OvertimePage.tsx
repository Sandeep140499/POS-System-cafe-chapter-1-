import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Chip } from "@mui/material";
import PageHeader from "components/common/PageHeader";

const overtime = [
  { initials: "ST", name: "Shweta Tiwari", id: "CC100002", color: "#8d6e63", hours: "90 hr 41 min", threshold: "10h", date: "Today" },
];

const hSx = { fontSize: 10, fontWeight: 700, color: "#999", letterSpacing: "0.08em", textTransform: "uppercase" as const, borderBottom: "1px solid #eae7e2", py: 1.5, fontFamily: "Inter, sans-serif" };
const cSx = { borderBottom: "1px solid #eae7e2", py: 2, fontFamily: "Inter, sans-serif" };

export default function OvertimePage() {
  return (
    <Box>
      <PageHeader label="OVERTIME" title="Overtime" subtitle="Employees who have exceeded the 10-hour shift threshold." />
      <Box sx={{ bgcolor: "#fff", borderRadius: "20px", border: "1px solid #eae7e2", overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={hSx}>Employee</TableCell>
                <TableCell sx={hSx}>Date</TableCell>
                <TableCell sx={hSx}>Threshold</TableCell>
                <TableCell sx={{ ...hSx, textAlign: "right" }}>Total Hours</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {overtime.map((e) => (
                <TableRow key={e.id} sx={{ "&:last-child td": { border: 0 } }}>
                  <TableCell sx={cSx}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: e.color, fontSize: 11, fontWeight: 700 }}>{e.initials}</Avatar>
                      <Box>
                        <Typography sx={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a", fontFamily: "Inter, sans-serif" }}>{e.name}</Typography>
                        <Typography sx={{ fontSize: 11.5, color: "#999", fontFamily: "Inter, sans-serif" }}>{e.id}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={cSx}><Typography sx={{ fontSize: 14, color: "#333", fontFamily: "Inter, sans-serif" }}>{e.date}</Typography></TableCell>
                  <TableCell sx={cSx}><Typography sx={{ fontSize: 14, color: "#333", fontFamily: "Inter, sans-serif" }}>{e.threshold}</Typography></TableCell>
                  <TableCell sx={{ ...cSx, textAlign: "right" }}><Typography sx={{ fontSize: 14, fontWeight: 600, color: "#c86030", fontFamily: "Inter, sans-serif" }}>{e.hours}</Typography></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
