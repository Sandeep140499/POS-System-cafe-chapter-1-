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
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import LockResetIcon from '@mui/icons-material/LockReset';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import PageHeader from 'components/common/PageHeader';
import AppModal, { ModalCancelBtn, ModalSubmitBtn } from 'components/common/AppModal';

interface Employee {
  id: number;
  code: string;
  name: string;
  email: string;
  role: string;
  mobile: string;
  salary: number;
  shiftStart: string;
  shiftEnd: string;
  isActive: boolean;
  isVerified: boolean;
  isOnShift: boolean;
  joiningDate: string;
  branch: string;
  avatar: string;
}

const INIT_EMP: Employee[] = [
  {
    id: 1,
    code: 'CC100001',
    name: 'Sandeep Kumar',
    email: 'sandeep@cafe.com',
    role: 'Staff',
    mobile: '98001 12345',
    salary: 18000,
    shiftStart: '09:00',
    shiftEnd: '17:00',
    isActive: true,
    isVerified: true,
    isOnShift: true,
    joiningDate: '2025-01-10',
    branch: 'Main Branch',
    avatar: '',
  },
  {
    id: 2,
    code: 'CC100002',
    name: 'Shweta Tiwari',
    email: 'shweta@cafe.com',
    role: 'Staff',
    mobile: '98002 23456',
    salary: 18000,
    shiftStart: '15:30',
    shiftEnd: '23:30',
    isActive: true,
    isVerified: true,
    isOnShift: true,
    joiningDate: '2025-02-15',
    branch: 'Main Branch',
    avatar: '',
  },
  {
    id: 3,
    code: 'CC100003',
    name: 'Shivam Sagar Mishra',
    email: 'shivam@cafe.com',
    role: 'Staff',
    mobile: '98003 34567',
    salary: 16000,
    shiftStart: '09:00',
    shiftEnd: '17:00',
    isActive: true,
    isVerified: false,
    isOnShift: false,
    joiningDate: '2025-03-01',
    branch: 'Main Branch',
    avatar: '',
  },
  {
    id: 4,
    code: 'CC100004',
    name: 'Suman Kumar',
    email: 'suman@cafe.com',
    role: 'Staff',
    mobile: '98004 45678',
    salary: 16000,
    shiftStart: '09:00',
    shiftEnd: '17:00',
    isActive: false,
    isVerified: true,
    isOnShift: false,
    joiningDate: '2024-11-20',
    branch: 'Main Branch',
    avatar: '',
  },
];

const COLORS = ['#5c6bc0', '#8d6e63', '#4caf50', '#ff9800', '#e91e63', '#00bcd4'];
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

const blankForm = {
  name: '',
  email: '',
  role: 'Staff',
  mobile: '',
  salary: '',
  shiftStart: '09:00',
  shiftEnd: '17:00',
  joiningDate: '',
  branch: 'Main Branch',
  avatar: '',
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(INIT_EMP);
  const [search, setSearch] = useState('');
  const [filterActive, setFilterActive] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [pwdModal, setPwdModal] = useState(false);
  const [editEmp, setEditEmp] = useState<Employee | null>(null);
  const [form, setForm] = useState(blankForm);
  const [newPwd, setNewPwd] = useState('');
  const [toast, setToast] = useState('');
  const showToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(''), 3000);
  };

  const nextCode = () => `CC1000${String(employees.length + 1).padStart(2, '0')}`;

  const openAdd = () => {
    setForm(blankForm);
    setEditEmp(null);
    setModalOpen(true);
  };
  const openEdit = (e: Employee) => {
    setForm({
      name: e.name,
      email: e.email,
      role: e.role,
      mobile: e.mobile,
      salary: String(e.salary),
      shiftStart: e.shiftStart,
      shiftEnd: e.shiftEnd,
      joiningDate: e.joiningDate,
      branch: e.branch,
      avatar: e.avatar,
    });
    setEditEmp(e);
    setModalOpen(true);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editEmp) {
      setEmployees(p =>
        p.map(em => (em.id === editEmp.id ? { ...em, ...form, salary: Number(form.salary) } : em))
      );
      showToast('Employee updated!');
    } else {
      setEmployees(p => [
        ...p,
        {
          id: Date.now(),
          code: nextCode(),
          ...form,
          salary: Number(form.salary),
          isActive: true,
          isVerified: false,
          isOnShift: false,
          avatar: '',
        },
      ]);
      showToast('Employee added!');
    }
    setModalOpen(false);
  };

  const filtered = employees.filter(e => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.code.includes(search);
    const matchFilter =
      filterActive === 'all' || (filterActive === 'active' ? e.isActive : !e.isActive);
    return matchSearch && matchFilter;
  });

  const stats = [
    { label: 'TOTAL EMPLOYEES', value: employees.length },
    { label: 'ACTIVE', value: employees.filter(e => e.isActive).length },
    { label: 'ON SHIFT', value: employees.filter(e => e.isOnShift).length },
  ];

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
        label="STAFF"
        title="Employees"
        subtitle="Manage your cafe team, roles, and shift schedules."
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
            Add Employee
          </Button>
        }
      />

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, mb: 3 }}>
        {stats.map(s => (
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

      <Box sx={{ display: 'flex', gap: 1.5, mb: 2.5, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search name, email, code..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          size="small"
          sx={{
            width: 280,
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
              bgcolor: '#fff',
              height: 38,
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              '& fieldset': { borderColor: '#eae7e2' },
              '&.Mui-focused fieldset': { borderColor: '#c86030' },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 17, color: '#999' }} />
                </InputAdornment>
              ),
            },
          }}
        />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <Select
            value={filterActive}
            onChange={e => setFilterActive(e.target.value)}
            sx={{
              borderRadius: '20px',
              fontFamily: 'Inter, sans-serif',
              bgcolor: '#fff',
              height: 38,
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#eae7e2' },
            }}
          >
            <MenuItem value="all">All Employees</MenuItem>
            <MenuItem value="active">Active Only</MenuItem>
            <MenuItem value="inactive">Inactive Only</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box
        sx={{
          bgcolor: '#fff',
          borderRadius: '20px',
          border: '1px solid #eae7e2',
          overflow: 'hidden',
        }}
      >
        {filtered.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <PeopleOutlineRoundedIcon sx={{ fontSize: 40, color: '#ddd', mb: 1.5 }} />
            <Typography sx={{ fontSize: 15, color: '#999', fontFamily: 'Inter, sans-serif' }}>
              No employees found.
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={hSx}>Employee</TableCell>
                  <TableCell sx={hSx}>Code</TableCell>
                  <TableCell sx={hSx}>Role</TableCell>
                  <TableCell sx={hSx}>Shift</TableCell>
                  <TableCell sx={hSx}>Verified</TableCell>
                  <TableCell sx={hSx}>Status</TableCell>
                  <TableCell sx={{ ...hSx, textAlign: 'center' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((e, idx) => (
                  <TableRow
                    key={e.id}
                    sx={{ '&:hover': { bgcolor: '#faf9f7' }, '&:last-child td': { border: 0 } }}
                  >
                    <TableCell sx={cSx}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ position: 'relative' }}>
                          <Avatar
                            src={e.avatar || undefined}
                            sx={{
                              width: 34,
                              height: 34,
                              bgcolor: COLORS[idx % COLORS.length],
                              fontSize: 12,
                              fontWeight: 700,
                            }}
                          >
                            {e.name
                              .split(' ')
                              .map(n => n[0])
                              .join('')
                              .slice(0, 2)}
                          </Avatar>
                          <input
                            id={`avatar-${e.id}`}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={ev => {
                              const file = ev.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = () =>
                                setEmployees(prev =>
                                  prev.map(em =>
                                    em.id === e.id ? { ...em, avatar: reader.result as string } : em
                                  )
                                );
                              reader.readAsDataURL(file);
                            }}
                          />
                          <label htmlFor={`avatar-${e.id}`}>
                            <IconButton
                              component="span"
                              size="small"
                              sx={{
                                position: 'absolute',
                                bottom: -4,
                                right: -4,
                                width: 16,
                                height: 16,
                                bgcolor: '#1a1a1a',
                                color: '#fff',
                                p: 0,
                                '&:hover': { bgcolor: '#333' },
                              }}
                            >
                              <CameraAltOutlinedIcon sx={{ fontSize: 10 }} />
                            </IconButton>
                          </label>
                          {e.avatar && (
                            <IconButton
                              size="small"
                              onClick={() =>
                                setEmployees(prev =>
                                  prev.map(em => (em.id === e.id ? { ...em, avatar: '' } : em))
                                )
                              }
                              sx={{
                                position: 'absolute',
                                top: -4,
                                right: -4,
                                width: 16,
                                height: 16,
                                bgcolor: '#c62828',
                                color: '#fff',
                                p: 0,
                                '&:hover': { bgcolor: '#b71c1c' },
                              }}
                            >
                              <CloseRoundedIcon sx={{ fontSize: 10 }} />
                            </IconButton>
                          )}
                        </Box>
                        <Box>
                          <Typography
                            sx={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: '#1a1a1a',
                              fontFamily: 'Inter, sans-serif',
                            }}
                          >
                            {e.name}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 11.5, color: '#888', fontFamily: 'Inter, sans-serif' }}
                          >
                            {e.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={cSx}>
                      <Typography
                        sx={{
                          fontSize: 13,
                          color: '#555',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 500,
                        }}
                      >
                        {e.code}
                      </Typography>
                    </TableCell>
                    <TableCell sx={cSx}>
                      <Chip
                        label={e.role}
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
                      <Typography
                        sx={{ fontSize: 13, color: '#555', fontFamily: 'Inter, sans-serif' }}
                      >
                        {e.shiftStart} – {e.shiftEnd}
                      </Typography>
                    </TableCell>
                    <TableCell sx={cSx}>
                      <Chip
                        label={e.isVerified ? 'YES' : 'NO'}
                        size="small"
                        sx={{
                          bgcolor: e.isVerified ? '#e3f0e8' : '#fce4e4',
                          color: e.isVerified ? '#2e7d32' : '#c62828',
                          fontWeight: 600,
                          fontSize: 11,
                          height: 24,
                          borderRadius: '12px',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={cSx}>
                      <Chip
                        label={e.isActive ? 'ACTIVE' : 'INACTIVE'}
                        size="small"
                        onClick={() =>
                          setEmployees(p =>
                            p.map(em => (em.id === e.id ? { ...em, isActive: !em.isActive } : em))
                          )
                        }
                        sx={{
                          bgcolor: e.isActive ? '#e3f0e8' : '#fce4e4',
                          color: e.isActive ? '#2e7d32' : '#c62828',
                          fontWeight: 700,
                          fontSize: 11,
                          height: 24,
                          borderRadius: '12px',
                          cursor: 'pointer',
                          fontFamily: 'Inter, sans-serif',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ ...cSx, textAlign: 'center' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                        <IconButton
                          size="small"
                          onClick={() => openEdit(e)}
                          sx={{
                            color: '#888',
                            '&:hover': { color: '#c86030', bgcolor: '#fef3f0' },
                          }}
                        >
                          <EditOutlinedIcon sx={{ fontSize: 17 }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => {
                            setEditEmp(e);
                            setNewPwd('');
                            setPwdModal(true);
                          }}
                          sx={{
                            color: '#888',
                            '&:hover': { color: '#1565c0', bgcolor: '#e8f0fe' },
                          }}
                        >
                          <LockResetIcon sx={{ fontSize: 17 }} />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => {
                            setEmployees(p => p.filter(em => em.id !== e.id));
                            showToast('Employee deleted');
                          }}
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>

      {/* Add/Edit Employee Modal */}
      <AppModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editEmp ? 'Edit Employee' : 'Add Employee'}
        subtitle={editEmp ? `Editing: ${editEmp.name}` : 'Create a new team member'}
        maxWidth="md"
        actions={
          <>
            <ModalCancelBtn onClick={() => setModalOpen(false)} />
            <ModalSubmitBtn>{editEmp ? 'Update' : 'Add Employee'}</ModalSubmitBtn>
          </>
        }
      >
        <Box
          component="form"
          onSubmit={submit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 1 }}
        >
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Full Name"
              required
              value={form.name}
              onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              sx={inputSx}
            />
            <TextField
              label="Email"
              required
              type="email"
              value={form.email}
              onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              sx={inputSx}
            />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
            <FormControl fullWidth sx={inputSx}>
              <InputLabel>Role</InputLabel>
              <Select
                value={form.role}
                label="Role"
                onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
                sx={{ borderRadius: '10px', fontFamily: 'Inter, sans-serif' }}
              >
                {['Owner', 'Manager', 'Staff', 'Trainee'].map(r => (
                  <MenuItem key={r} value={r}>
                    {r}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Mobile"
              value={form.mobile}
              onChange={e => setForm(p => ({ ...p, mobile: e.target.value }))}
              sx={inputSx}
            />
            <TextField
              label="Salary (₹)"
              type="number"
              value={form.salary}
              onChange={e => setForm(p => ({ ...p, salary: e.target.value }))}
              sx={inputSx}
            />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
            <TextField
              label="Shift Start"
              type="time"
              value={form.shiftStart}
              onChange={e => setForm(p => ({ ...p, shiftStart: e.target.value }))}
              sx={inputSx}
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="Shift End"
              type="time"
              value={form.shiftEnd}
              onChange={e => setForm(p => ({ ...p, shiftEnd: e.target.value }))}
              sx={inputSx}
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="Joining Date"
              type="date"
              value={form.joiningDate}
              onChange={e => setForm(p => ({ ...p, joiningDate: e.target.value }))}
              sx={inputSx}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          </Box>
          <TextField
            label="Branch"
            value={form.branch}
            onChange={e => setForm(p => ({ ...p, branch: e.target.value }))}
            fullWidth
            sx={inputSx}
          />
        </Box>
      </AppModal>

      {/* Change Password Modal */}
      <AppModal
        open={pwdModal}
        onClose={() => setPwdModal(false)}
        title="Change Password"
        subtitle={editEmp ? `Reset password for ${editEmp.name}` : ''}
        actions={
          <>
            <ModalCancelBtn onClick={() => setPwdModal(false)} />
            <Button
              onClick={() => {
                showToast('Password updated!');
                setPwdModal(false);
              }}
              sx={{
                bgcolor: '#1a1a1a',
                color: '#fff',
                borderRadius: '10px',
                px: 2.5,
                py: 0.8,
                textTransform: 'none',
                fontSize: 13.5,
                fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
                '&:hover': { bgcolor: '#333' },
              }}
            >
              Update Password
            </Button>
          </>
        }
      >
        <Box sx={{ py: 1 }}>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            value={newPwd}
            onChange={e => setNewPwd(e.target.value)}
            sx={inputSx}
          />
        </Box>
      </AppModal>
    </Box>
  );
}
