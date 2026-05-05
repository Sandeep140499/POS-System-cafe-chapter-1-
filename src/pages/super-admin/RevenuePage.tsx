import { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  LinearProgress,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import PageHeader from 'components/common/PageHeader';
import AppModal, { ModalCancelBtn, ModalSubmitBtn } from 'components/common/AppModal';
import {
  getSalesTargets,
  saveSalesTargets,
  updateOrAddTarget,
  type MonthlyTarget,
} from 'data/salesTargets';

const hSx = {
  fontSize: 10,
  fontWeight: 700,
  color: '#999',
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  borderBottom: '1px solid #eae7e2',
  py: 1.5,
  fontFamily: 'Inter, sans-serif',
};
const cSx = { borderBottom: '1px solid #eae7e2', py: 2, fontFamily: 'Inter, sans-serif' };
const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    bgcolor: '#faf9f7',
    fontSize: 14,
    fontFamily: 'Inter, sans-serif',
    '& fieldset': { borderColor: '#e8e4de' },
    '&:hover fieldset': { borderColor: '#c86030' },
    '&.Mui-focused fieldset': { borderColor: '#c86030', borderWidth: 1.5 },
  },
  '& .MuiInputLabel-root': { fontFamily: 'Inter, sans-serif', fontSize: 13.5 },
  '& .MuiInputLabel-root.Mui-focused': { color: '#c86030' },
};

export default function RevenuePage() {
  const [targets, setTargets] = useState<MonthlyTarget[]>(getSalesTargets);
  const [modalOpen, setModalOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [form, setForm] = useState({ month: '', targetRaw: '' });
  const [toast, setToast] = useState('');
  const showToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(''), 3000);
  };

  const now = new Date();
  const currentLabel = now.toLocaleString('default', { month: 'long', year: 'numeric' });

  const totalTarget = targets.reduce((s, t) => s + (t.targetRaw || 0), 0);
  const totalCollected = targets.reduce((s, t) => s + (t.collectedRaw || 0), 0);

  const openAdd = () => {
    setForm({ month: currentLabel, targetRaw: '' });
    setEditIdx(null);
    setModalOpen(true);
  };
  const openEdit = (t: MonthlyTarget, idx: number) => {
    setForm({ month: t.month, targetRaw: String(t.targetRaw) });
    setEditIdx(idx);
    setModalOpen(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(form.targetRaw);
    if (!form.month || !val || val <= 0) return;
    if (editIdx !== null) {
      const list = [...targets];
      list[editIdx] = { ...list[editIdx], month: form.month, targetRaw: val };
      setTargets(list);
      saveSalesTargets(list);
      showToast('Target updated!');
    } else {
      const list = [...targets];
      const existing = list.findIndex(t => t.month === form.month);
      if (existing >= 0) {
        list[existing] = { ...list[existing], targetRaw: val };
      } else {
        list.unshift({ month: form.month, targetRaw: val, collectedRaw: 0 });
      }
      setTargets(list);
      saveSalesTargets(list);
      showToast('Target added!');
    }
    setModalOpen(false);
  };

  const handleDelete = (idx: number) => {
    const list = targets.filter((_, i) => i !== idx);
    setTargets(list);
    saveSalesTargets(list);
    showToast('Target deleted');
  };

  const sorted = useMemo(() => {
    return [...targets].sort((a, b) => {
      const da = new Date(a.month + ' 1');
      const db = new Date(b.month + ' 1');
      return db.getTime() - da.getTime();
    });
  }, [targets]);

  return (
    <Box>
      {toast && (
        <Box
          sx={{
            position: 'fixed',
            top: 80,
            right: 24,
            zIndex: 9999,
            bgcolor: '#1a1a1a',
            color: '#fff',
            px: 3,
            py: 1.5,
            borderRadius: '12px',
            fontSize: 14,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {toast}
        </Box>
      )}
      <PageHeader
        label="REVENUE"
        title="Revenue"
        subtitle="Set monthly sales targets and track performance."
        action={
          <Button
            startIcon={<AddRoundedIcon />}
            onClick={openAdd}
            sx={{
              bgcolor: '#c86030',
              color: '#fff',
              borderRadius: '20px',
              px: 2.5,
              py: 1,
              textTransform: 'none',
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              '&:hover': { bgcolor: '#a8502a' },
            }}
          >
            Set Target
          </Button>
        }
      />

      {/* Stats */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3,1fr)' },
          gap: 2,
          mb: 3,
        }}
      >
        {[
          { label: 'TOTAL TARGETS', value: targets.length },
          { label: 'TOTAL TARGET AMOUNT', value: `₹${totalTarget.toLocaleString('en-IN')}` },
          { label: 'TOTAL COLLECTED', value: `₹${totalCollected.toLocaleString('en-IN')}` },
        ].map(s => (
          <Box
            key={s.label}
            sx={{ bgcolor: '#fff', borderRadius: '20px', border: '1px solid #eae7e2', p: 2.5 }}
          >
            <Typography
              sx={{
                fontSize: 10.5,
                fontWeight: 700,
                color: '#c86030',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                mb: 0.5,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {s.label}
            </Typography>
            <Typography
              sx={{
                fontSize: 28,
                fontWeight: 700,
                color: '#1a1a1a',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {s.value}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Targets Table */}
      <Box
        sx={{
          bgcolor: '#fff',
          borderRadius: '20px',
          border: '1px solid #eae7e2',
          overflow: 'hidden',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={hSx}>Month</TableCell>
                <TableCell sx={hSx}>Target</TableCell>
                <TableCell sx={hSx}>Collected</TableCell>
                <TableCell sx={hSx}>Progress</TableCell>
                <TableCell sx={hSx}>Status</TableCell>
                <TableCell sx={{ ...hSx, textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sorted.map((t, idx) => {
                const pct =
                  t.targetRaw > 0
                    ? Math.min(100, Math.round((t.collectedRaw / t.targetRaw) * 100))
                    : 0;
                const isCurrent = t.month === currentLabel;
                return (
                  <TableRow
                    key={t.month}
                    sx={{ '&:hover': { bgcolor: '#faf9f7' }, '&:last-child td': { border: 0 } }}
                  >
                    <TableCell sx={cSx}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: '#1a1a1a',
                            fontFamily: 'Inter, sans-serif',
                          }}
                        >
                          {t.month}
                        </Typography>
                        {isCurrent && (
                          <Chip
                            label="CURRENT"
                            size="small"
                            sx={{
                              bgcolor: '#c86030',
                              color: '#fff',
                              fontSize: 9,
                              height: 20,
                              borderRadius: '10px',
                              fontWeight: 700,
                            }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell sx={cSx}>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: '#1a1a1a',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        ₹{t.targetRaw.toLocaleString('en-IN')}
                      </Typography>
                    </TableCell>
                    <TableCell sx={cSx}>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: '#c86030',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        ₹{t.collectedRaw.toLocaleString('en-IN')}
                      </Typography>
                    </TableCell>
                    <TableCell sx={cSx}>
                      <Box sx={{ width: 120 }}>
                        <LinearProgress
                          variant="determinate"
                          value={pct}
                          sx={{
                            height: 5,
                            borderRadius: 3,
                            bgcolor: '#eeedea',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: pct >= 100 ? '#2e7d32' : '#c86030',
                              borderRadius: 3,
                            },
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: 11,
                            color: '#888',
                            mt: 0.3,
                            fontFamily: 'Inter, sans-serif',
                          }}
                        >
                          {pct}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={cSx}>
                      <Chip
                        label={
                          pct >= 100
                            ? 'ACHIEVED'
                            : pct >= 75
                              ? 'ON TRACK'
                              : pct >= 50
                                ? 'BEHIND'
                                : 'CRITICAL'
                        }
                        size="small"
                        sx={{
                          fontSize: 10,
                          height: 22,
                          borderRadius: '11px',
                          fontWeight: 700,
                          bgcolor:
                            pct >= 100
                              ? '#e3f0e8'
                              : pct >= 75
                                ? '#e8f5e9'
                                : pct >= 50
                                  ? '#fff8e1'
                                  : '#fce4e4',
                          color:
                            pct >= 100
                              ? '#2e7d32'
                              : pct >= 75
                                ? '#558b2f'
                                : pct >= 50
                                  ? '#f57c00'
                                  : '#c62828',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ ...cSx, textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                        <IconButton
                          size="small"
                          onClick={() => openEdit(t, idx)}
                          sx={{
                            color: '#888',
                            '&:hover': { color: '#c86030', bgcolor: '#fef3f0' },
                          }}
                        >
                          <EditOutlinedIcon sx={{ fontSize: 17 }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(idx)}
                          sx={{
                            color: '#888',
                            '&:hover': { color: '#c62828', bgcolor: '#fce4e4' },
                          }}
                        >
                          <DeleteOutlineRoundedIcon sx={{ fontSize: 17 }} />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
              {sorted.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    sx={{
                      py: 4,
                      textAlign: 'center',
                      fontFamily: 'Inter, sans-serif',
                      color: '#999',
                      fontSize: 14,
                    }}
                  >
                    No targets set yet. Click "Set Target" to add one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Add/Edit Modal */}
      <AppModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editIdx !== null ? 'Edit Target' : 'Set Monthly Target'}
        subtitle={
          editIdx !== null
            ? `Editing target for ${form.month}`
            : 'Define a new monthly sales target'
        }
        maxWidth="sm"
        actions={
          <>
            <ModalCancelBtn onClick={() => setModalOpen(false)} />
            <ModalSubmitBtn>{editIdx !== null ? 'Update' : 'Set Target'}</ModalSubmitBtn>
          </>
        }
      >
        <Box
          component="form"
          onSubmit={submit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 1 }}
        >
          <TextField
            label="Month (e.g. April 2026)"
            required
            value={form.month}
            onChange={e => setForm(p => ({ ...p, month: e.target.value }))}
            fullWidth
            sx={inputSx}
          />
          <TextField
            label="Target Amount (₹)"
            required
            type="number"
            value={form.targetRaw}
            onChange={e => setForm(p => ({ ...p, targetRaw: e.target.value }))}
            fullWidth
            sx={inputSx}
          />
        </Box>
      </AppModal>
    </Box>
  );
}
