import {
  Pagination,
  PaginationItem,
  PaginationProps,
  TablePagination,
  TablePaginationProps,
  Stack,
  Typography,
  Box,
  Button,
} from '@mui/material';

export type AppPaginationProps = PaginationProps & {
  totalPages?: number;
  page: number;
  onPageChange: (page: number) => void;
};

export default function AppPagination({
  page,
  onPageChange,
  count = 10,
  ...props
}: AppPaginationProps) {
  return (
    <Stack direction="row" sx={{ justifyContent: 'center', mt: 2 }}>
      <Pagination
        page={page}
        onChange={(_, value) => onPageChange(value)}
        count={count}
        shape="rounded"
        color="primary"
        sx={{
          '& .MuiPaginationItem-root': {
            color: 'text.secondary',
            borderColor: 'rgba(255,255,255,0.1)',
          },
          '& .Mui-selected': {
            bgcolor: 'primary.main',
            color: '#1c223b',
            fontWeight: 600,
          },
        }}
        {...props}
      />
    </Stack>
  );
}

export function SimplePagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 1.5,
        mt: 2,
      }}
    >
      <Button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        sx={{
          borderRadius: '20px',
          textTransform: 'none',
          fontFamily: 'Inter, sans-serif',
          color: '#1a1a1a',
          border: '1px solid #eae7e2',
          bgcolor: '#fff',
          minWidth: 90,
          height: 36,
          '&:disabled': { color: '#bbb', borderColor: '#eae7e2' },
        }}
      >
        Previous
      </Button>
      <Typography sx={{ fontSize: 13.5, fontFamily: 'Inter, sans-serif', color: '#555' }}>
        Page {page} of {totalPages}
      </Typography>
      <Button
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        sx={{
          borderRadius: '20px',
          textTransform: 'none',
          fontFamily: 'Inter, sans-serif',
          color: '#1a1a1a',
          border: '1px solid #eae7e2',
          bgcolor: '#fff',
          minWidth: 90,
          height: 36,
          '&:disabled': { color: '#bbb', borderColor: '#eae7e2' },
        }}
      >
        Next
      </Button>
    </Box>
  );
}

export function DataTablePagination(props: TablePaginationProps) {
  return (
    <TablePagination
      component="div"
      sx={{
        color: 'text.secondary',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        '& .MuiTablePagination-select': {
          color: 'text.primary',
        },
        '& .MuiTablePagination-selectIcon': {
          color: 'text.secondary',
        },
      }}
      {...props}
    />
  );
}

export function PaginationInfo({
  page,
  pageSize,
  total,
}: {
  page: number;
  pageSize: number;
  total: number;
}) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      Showing {start}–{end} of {total} results
    </Typography>
  );
}

export function PaginationContainer({
  children,
  showInfo,
  page,
  pageSize,
  total,
}: {
  children: React.ReactNode;
  showInfo?: boolean;
  page?: number;
  pageSize?: number;
  total?: number;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        mt: 3,
        pt: 2,
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {showInfo && page !== undefined && pageSize !== undefined && total !== undefined && (
        <PaginationInfo page={page} pageSize={pageSize} total={total} />
      )}
      <Box sx={{ ml: 'auto' }}>{children}</Box>
    </Box>
  );
}
