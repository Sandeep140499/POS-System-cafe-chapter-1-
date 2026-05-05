import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import PageHeader from 'components/common/PageHeader';
import AppModal, { ModalCancelBtn, ModalSubmitBtn } from 'components/common/AppModal';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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
const cSx = { borderBottom: '1px solid #eae7e2', py: 1.8, fontFamily: 'Inter, sans-serif' };
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

interface Offer {
  id: number;
  name: string;
  discount: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  scope: 'all' | 'category' | 'items';
  days: string[];
  status: 'ACTIVE' | 'SCHEDULED' | 'EXPIRED';
}

const INIT_OFFERS: Offer[] = [
  {
    id: 1,
    name: 'Morning Rush Special',
    discount: 20,
    startDate: '2026-04-20',
    endDate: '2026-04-30',
    startTime: '08:00',
    endTime: '11:00',
    scope: 'all',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    status: 'ACTIVE',
  },
  {
    id: 2,
    name: 'Weekend Coffee Deal',
    discount: 15,
    startDate: '2026-04-26',
    endDate: '2026-05-10',
    startTime: '10:00',
    endTime: '13:00',
    scope: 'category',
    days: ['Sat', 'Sun'],
    status: 'SCHEDULED',
  },
  {
    id: 3,
    name: 'Evening Snack Hour',
    discount: 10,
    startDate: '2026-04-01',
    endDate: '2026-04-15',
    startTime: '17:00',
    endTime: '19:00',
    scope: 'items',
    days: DAYS,
    status: 'EXPIRED',
  },
];

const blankForm = {
  name: '',
  discount: '',
  startDate: '',
  endDate: '',
  startTime: '',
  endTime: '',
  scope: 'all' as 'all' | 'category' | 'items',
  days: [] as string[],
};

export function HappyHourOffersPage() {
  const [offers, setOffers] = useState<Offer[]>(INIT_OFFERS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editOffer, setEditOffer] = useState<Offer | null>(null);
  const [form, setForm] = useState(blankForm);
  const [toast, setToast] = useState('');
  const showToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(''), 3000);
  };

  const openAdd = () => {
    setForm(blankForm);
    setEditOffer(null);
    setModalOpen(true);
  };
  const openEdit = (o: Offer) => {
    setForm({
      name: o.name,
      discount: String(o.discount),
      startDate: o.startDate,
      endDate: o.endDate,
      startTime: o.startTime,
      endTime: o.endTime,
      scope: o.scope,
      days: o.days,
    });
    setEditOffer(o);
    setModalOpen(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const status: Offer['status'] = end < now ? 'EXPIRED' : start > now ? 'SCHEDULED' : 'ACTIVE';
    if (editOffer) {
      setOffers(p =>
        p.map(o =>
          o.id === editOffer.id ? { ...o, ...form, discount: Number(form.discount), status } : o
        )
      );
      showToast('Offer updated!');
    } else {
      setOffers(p => [...p, { id: Date.now(), ...form, discount: Number(form.discount), status }]);
      showToast('Offer created!');
    }
    setModalOpen(false);
  };

  const toggleDay = (d: string) =>
    setForm(p => ({
      ...p,
      days: p.days.includes(d) ? p.days.filter(x => x !== d) : [...p.days, d],
    }));

  const statusColor = (s: string) =>
    s === 'ACTIVE'
      ? { bg: '#e3f0e8', c: '#2e7d32' }
      : s === 'SCHEDULED'
        ? { bg: '#e8f0fe', c: '#1565c0' }
        : { bg: '#eeedea', c: '#888' };

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
        label="HAPPY HOUR OFFERS"
        title="Happy Hour Offers"
        subtitle="Time-based discounts for menu categories and items."
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
            Create Offer
          </Button>
        }
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, mb: 3 }}>
        {[
          {
            label: 'ACTIVE OFFERS',
            value: offers.filter(o => o.status === 'ACTIVE').length,
            color: '#2e7d32',
          },
          {
            label: 'SCHEDULED',
            value: offers.filter(o => o.status === 'SCHEDULED').length,
            color: '#1565c0',
          },
          { label: 'TOTAL OFFERS', value: offers.length, color: '#c86030' },
        ].map(s => (
          <Box
            key={s.label}
            sx={{ bgcolor: '#fff', borderRadius: '20px', border: '1px solid #eae7e2', p: 2.5 }}
          >
            <Typography
              sx={{
                fontSize: 10.5,
                fontWeight: 700,
                color: s.color,
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
                fontSize: 30,
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

      <Box
        sx={{
          bgcolor: '#fff',
          borderRadius: '20px',
          border: '1px solid #eae7e2',
          overflow: 'hidden',
        }}
      >
        {offers.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <AutoAwesomeOutlinedIcon sx={{ fontSize: 40, color: '#ddd', mb: 1.5 }} />
            <Typography sx={{ fontSize: 15, color: '#999', fontFamily: 'Inter, sans-serif' }}>
              No offers yet. Create your first happy hour offer.
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={hSx}>Offer Name</TableCell>
                  <TableCell sx={{ ...hSx, textAlign: 'center' }}>Discount</TableCell>
                  <TableCell sx={hSx}>Schedule</TableCell>
                  <TableCell sx={hSx}>Days</TableCell>
                  <TableCell sx={hSx}>Scope</TableCell>
                  <TableCell sx={hSx}>Status</TableCell>
                  <TableCell sx={{ ...hSx, textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {offers.map(o => {
                  const sc = statusColor(o.status);
                  return (
                    <TableRow
                      key={o.id}
                      sx={{ '&:hover': { bgcolor: '#faf9f7' }, '&:last-child td': { border: 0 } }}
                    >
                      <TableCell sx={cSx}>
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: '#1a1a1a',
                            fontFamily: 'Inter, sans-serif',
                          }}
                        >
                          {o.name}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ ...cSx, textAlign: 'center' }}>
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: '#c86030',
                            fontFamily: 'Inter, sans-serif',
                          }}
                        >
                          {o.discount}%
                        </Typography>
                      </TableCell>
                      <TableCell sx={cSx}>
                        <Typography
                          sx={{ fontSize: 13, color: '#555', fontFamily: 'Inter, sans-serif' }}
                        >
                          {o.startDate} → {o.endDate}
                        </Typography>
                        <Typography
                          sx={{ fontSize: 12, color: '#888', fontFamily: 'Inter, sans-serif' }}
                        >
                          {o.startTime} – {o.endTime}
                        </Typography>
                      </TableCell>
                      <TableCell sx={cSx}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.4 }}>
                          {(o.days.length === 7 ? ['All'] : o.days).map(d => (
                            <Chip
                              key={d}
                              label={d}
                              size="small"
                              sx={{
                                fontSize: 10,
                                height: 20,
                                bgcolor: '#eeedea',
                                color: '#555',
                                fontFamily: 'Inter, sans-serif',
                              }}
                            />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell sx={cSx}>
                        <Chip
                          label={
                            o.scope === 'all'
                              ? 'All Items'
                              : o.scope === 'category'
                                ? 'Category'
                                : 'Hand-picked'
                          }
                          size="small"
                          sx={{
                            bgcolor: '#eeedea',
                            color: '#555',
                            fontSize: 11,
                            height: 24,
                            borderRadius: '12px',
                            fontFamily: 'Inter, sans-serif',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={cSx}>
                        <Chip
                          label={o.status}
                          size="small"
                          sx={{
                            bgcolor: sc.bg,
                            color: sc.c,
                            fontWeight: 600,
                            fontSize: 11,
                            height: 24,
                            borderRadius: '12px',
                            fontFamily: 'Inter, sans-serif',
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ ...cSx, textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                          <IconButton
                            size="small"
                            onClick={() => openEdit(o)}
                            sx={{
                              color: '#888',
                              '&:hover': { color: '#c86030', bgcolor: '#fef3f0' },
                            }}
                          >
                            <EditOutlinedIcon sx={{ fontSize: 17 }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => setOffers(p => p.filter(x => x.id !== o.id))}
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
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      <AppModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editOffer ? 'Edit Offer' : 'Create Happy Hour Offer'}
        subtitle="Set discount, schedule, and scope"
        maxWidth="md"
        actions={
          <>
            <ModalCancelBtn onClick={() => setModalOpen(false)} />
            <ModalSubmitBtn>{editOffer ? 'Update Offer' : 'Create Offer'}</ModalSubmitBtn>
          </>
        }
      >
        <Box
          component="form"
          onSubmit={submit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 1 }}
        >
          <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 2 }}>
            <TextField
              label="Offer Name"
              required
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              fullWidth
              sx={inputSx}
            />
            <TextField
              label="Discount (%)"
              required
              type="number"
              slotProps={{ htmlInput: { min: 1, max: 100 } }}
              value={form.discount}
              onChange={e => setForm(p => ({ ...p, discount: e.target.value }))}
              sx={inputSx}
            />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Start Date"
              required
              type="date"
              value={form.startDate}
              onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))}
              sx={inputSx}
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="End Date"
              required
              type="date"
              value={form.endDate}
              onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))}
              sx={inputSx}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Start Time"
              required
              type="time"
              value={form.startTime}
              onChange={e => setForm(p => ({ ...p, startTime: e.target.value }))}
              sx={inputSx}
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="End Time"
              required
              type="time"
              value={form.endTime}
              onChange={e => setForm(p => ({ ...p, endTime: e.target.value }))}
              sx={inputSx}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>
          <FormControl fullWidth sx={inputSx}>
            <InputLabel>Apply To</InputLabel>
            <Select
              value={form.scope}
              label="Apply To"
              onChange={e => setForm(p => ({ ...p, scope: e.target.value as any }))}
              sx={{ borderRadius: '10px', fontFamily: 'Inter, sans-serif' }}
            >
              <MenuItem value="all">All Menu Items</MenuItem>
              <MenuItem value="category">Selected Categories</MenuItem>
              <MenuItem value="items">Hand-picked Items</MenuItem>
            </Select>
          </FormControl>
          <Box>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: '#555',
                mb: 1,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              Active Days (leave empty = every day)
            </Typography>
            <FormGroup row sx={{ gap: 0.5 }}>
              {DAYS.map(d => (
                <FormControlLabel
                  key={d}
                  control={
                    <Checkbox
                      size="small"
                      checked={form.days.includes(d)}
                      onChange={() => toggleDay(d)}
                      sx={{ '&.Mui-checked': { color: '#c86030' } }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: 13, fontFamily: 'Inter, sans-serif' }}>
                      {d}
                    </Typography>
                  }
                  sx={{ mr: 1 }}
                />
              ))}
            </FormGroup>
          </Box>
        </Box>
      </AppModal>
    </Box>
  );
}
