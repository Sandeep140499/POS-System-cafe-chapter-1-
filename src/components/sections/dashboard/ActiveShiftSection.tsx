import {
  Box,
  Typography,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SectionPaperCard from "components/base/SectionPaperCard";

const shiftData = [
  {
    name: "Shweta Tiwari",
    initials: "ST",
    id: "CC100002",
    avatarColor: "#8d6e63",
    branch: "Main",
    scheduled: "03:30 pm",
    login: "05:42 pm",
    late: "7 hr 42 min",
    status: "ACTIVE",
    hours: "90 hr 41 min (live)",
    orders: 5,
    sales: "₹1,804",
  },
  {
    name: "Sandeep Kumar",
    initials: "SK",
    id: "CC100001",
    avatarColor: "#5c6bc0",
    branch: "Main",
    scheduled: "03:30 pm",
    login: "11:37 am",
    late: "1 hr 37 min",
    status: "ACTIVE",
    hours: "47 min (live)",
    orders: 0,
    sales: "₹0",
  },
];

const hSx = {
  fontSize: 10,
  fontWeight: 700,
  color: "#999",
  letterSpacing: "0.06em",
  textTransform: "uppercase" as const,
  borderBottom: "1px solid #eae7e2",
  py: 1.2,
  px: 1,
};

export default function ActiveShiftSection() {
  return (
    <SectionPaperCard>
      <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a" }}>
        Currently on Shift
      </Typography>
      <Typography sx={{ fontSize: 12.5, color: "#888", mt: 0.3, mb: 2 }}>
        2 active · employees with an active shift right now
      </Typography>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={hSx}>Employee</TableCell>
              <TableCell sx={hSx}>Branch</TableCell>
              <TableCell sx={hSx}>Scheduled</TableCell>
              <TableCell sx={hSx}>Login</TableCell>
              <TableCell sx={hSx}>Late</TableCell>
              <TableCell sx={hSx}>Status</TableCell>
              <TableCell sx={hSx}>Hours</TableCell>
              <TableCell sx={{ ...hSx, textAlign: "center" }}>Orders</TableCell>
              <TableCell sx={{ ...hSx, textAlign: "right" }}>Sales</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shiftData.map((r) => {
              const cellSx = { borderBottom: "1px solid #eae7e2", py: 1.5, px: 1 };
              return (
                <TableRow key={r.id} sx={{ "&:hover": { bgcolor: "#faf9f7" } }}>
                  <TableCell sx={cellSx}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar sx={{ width: 30, height: 30, bgcolor: r.avatarColor, fontSize: 11, fontWeight: 600 }}>
                        {r.initials}
                      </Avatar>
                      <Box>
                        <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", lineHeight: 1.3 }}>
                          {r.name}
                        </Typography>
                        <Typography sx={{ fontSize: 10.5, color: "#999" }}>{r.id}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={cellSx}>
                    <Typography sx={{ fontSize: 13, color: "#333" }}>{r.branch}</Typography>
                  </TableCell>
                  <TableCell sx={cellSx}>
                    <Typography sx={{ fontSize: 13, color: "#333" }}>{r.scheduled}</Typography>
                  </TableCell>
                  <TableCell sx={cellSx}>
                    <Typography sx={{ fontSize: 13, color: "#333" }}>{r.login}</Typography>
                  </TableCell>
                  <TableCell sx={cellSx}>
                    <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#c86030" }}>{r.late}</Typography>
                  </TableCell>
                  <TableCell sx={cellSx}>
                    <Chip
                      label={r.status}
                      size="small"
                      sx={{
                        bgcolor: "#e3f0e8",
                        color: "#2e7d32",
                        fontWeight: 600,
                        fontSize: 10,
                        height: 22,
                        borderRadius: 2.5,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={cellSx}>
                    <Typography sx={{ fontSize: 13, color: "#333" }}>{r.hours}</Typography>
                  </TableCell>
                  <TableCell sx={{ ...cellSx, textAlign: "center" }}>
                    <Typography sx={{ fontSize: 13, color: "#333" }}>{r.orders}</Typography>
                  </TableCell>
                  <TableCell sx={{ ...cellSx, textAlign: "right" }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{r.sales}</Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </SectionPaperCard>
  );
}
