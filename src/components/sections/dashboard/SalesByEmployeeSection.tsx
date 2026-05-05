import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import SectionPaperCard from 'components/base/SectionPaperCard';

const employees = [
  { name: 'Cafe Chapter 1', orders: 0, revenue: '₹0' },
  { name: 'Shivam Sagar Mishra', orders: 0, revenue: '₹0' },
  { name: 'Suman Kumar', orders: 0, revenue: '₹0' },
  { name: 'Shweta Tiwari', orders: 12, revenue: '₹4,156' },
  { name: 'Sandeep Kumar', orders: 11, revenue: '₹1,804' },
];

const hSx = {
  fontSize: 10,
  fontWeight: 700,
  color: '#999',
  letterSpacing: '0.06em',
  textTransform: 'uppercase' as const,
  borderBottom: '1px solid #eae7e2',
  py: 1.2,
  px: 1,
};

export default function SalesByEmployeeSection() {
  return (
    <SectionPaperCard sx={{ height: '100%' }}>
      <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#1a1a1a', mb: 2 }}>
        Sales by Employee
      </Typography>

      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={hSx}>Employee</TableCell>
              <TableCell sx={{ ...hSx, textAlign: 'center' }}>Orders</TableCell>
              <TableCell sx={{ ...hSx, textAlign: 'right' }}>Revenue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map(e => {
              const cellSx = { borderBottom: '1px solid #eae7e2', py: 1.2, px: 1 };
              return (
                <TableRow key={e.name} sx={{ '&:hover': { bgcolor: '#faf9f7' } }}>
                  <TableCell sx={cellSx}>
                    <Typography sx={{ fontSize: 13, color: '#333', fontWeight: 500 }}>
                      {e.name}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ ...cellSx, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: 13, color: '#333' }}>{e.orders}</Typography>
                  </TableCell>
                  <TableCell sx={{ ...cellSx, textAlign: 'right' }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>
                      {e.revenue}
                    </Typography>
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
