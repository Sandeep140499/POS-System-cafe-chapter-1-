import { useState, useRef } from 'react';
import { Box, Typography, Button, Avatar, TextField, Chip } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import PageHeader from 'components/common/PageHeader';

const STORAGE_KEY = 'cc1_admin_profile';

interface AdminProfile {
  name: string;
  email: string;
  phone: string;
  role: string;
  branch: string;
  joiningDate: string;
  avatar: string;
}

function getProfile(): AdminProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    name: 'Admin User',
    email: 'admin@chapterone.com',
    phone: '+91 98765 43210',
    role: 'Super Admin',
    branch: 'Main Branch',
    joiningDate: '2024-01-15',
    avatar: '',
  };
}

function saveProfile(p: AdminProfile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

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

export default function SuperAdminProfilePage() {
  const [profile, setProfile] = useState<AdminProfile>(getProfile);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(profile);
  const [toast, setToast] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const showToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(''), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const updated = { ...form, avatar: reader.result as string };
      setForm(updated);
      if (!editMode) {
        setProfile(updated);
        saveProfile(updated);
        showToast('Profile picture updated!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    const updated = { ...form, avatar: '' };
    setForm(updated);
    if (!editMode) {
      setProfile(updated);
      saveProfile(updated);
      showToast('Profile picture removed!');
    }
  };

  const handleSave = () => {
    setProfile(form);
    saveProfile(form);
    setEditMode(false);
    showToast('Profile updated successfully!');
  };

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
        label="PROFILE"
        title="Admin Profile"
        subtitle="Manage your account information and security settings."
      />

      <Box
        sx={{
          bgcolor: '#fff',
          borderRadius: '20px',
          border: '1px solid #eae7e2',
          overflow: 'hidden',
          p: 3,
        }}
      >
        {/* Avatar + basic info */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 3,
            mb: 4,
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={form.avatar || undefined}
              sx={{
                width: 100,
                height: 100,
                bgcolor: '#c86030',
                fontSize: 36,
                fontWeight: 700,
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {form.name.charAt(0)}
            </Avatar>
            <Box sx={{ position: 'absolute', bottom: -2, right: -2, display: 'flex', gap: 0.5 }}>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <Button
                size="small"
                onClick={() => fileRef.current?.click()}
                sx={{
                  minWidth: 0,
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  bgcolor: '#1a1a1a',
                  color: '#fff',
                  p: 0,
                  '&:hover': { bgcolor: '#333' },
                }}
              >
                <CameraAltOutlinedIcon sx={{ fontSize: 14 }} />
              </Button>
              {form.avatar && (
                <Button
                  size="small"
                  onClick={handleRemoveAvatar}
                  sx={{
                    minWidth: 0,
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    bgcolor: '#c62828',
                    color: '#fff',
                    p: 0,
                    '&:hover': { bgcolor: '#b71c1c' },
                  }}
                >
                  <DeleteOutlineRoundedIcon sx={{ fontSize: 14 }} />
                </Button>
              )}
            </Box>
          </Box>
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 700,
                color: '#1a1a1a',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {profile.name}
            </Typography>
            <Typography
              sx={{ fontSize: 13, color: '#888', fontFamily: 'Inter, sans-serif', mb: 1 }}
            >
              {profile.email}
            </Typography>
            <Chip
              label={profile.role}
              size="small"
              sx={{
                bgcolor: '#fef3f0',
                color: '#c86030',
                fontSize: 11,
                fontWeight: 700,
                height: 24,
                borderRadius: '12px',
                fontFamily: 'Inter, sans-serif',
              }}
            />
          </Box>
          <Button
            startIcon={editMode ? <SaveRoundedIcon /> : <EditOutlinedIcon />}
            onClick={() => (editMode ? handleSave() : setEditMode(true))}
            sx={{
              bgcolor: editMode ? '#c86030' : '#1a1a1a',
              color: '#fff',
              borderRadius: '20px',
              px: 2.5,
              py: 1,
              textTransform: 'none',
              fontSize: 14,
              fontFamily: 'Inter, sans-serif',
              '&:hover': { bgcolor: editMode ? '#a8502a' : '#333' },
            }}
          >
            {editMode ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </Box>

        {/* Details Form */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <TextField
            label="Full Name"
            value={form.name}
            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
            disabled={!editMode}
            fullWidth
            sx={inputSx}
          />
          <TextField
            label="Email"
            type="email"
            value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            disabled={!editMode}
            fullWidth
            sx={inputSx}
          />
          <TextField
            label="Phone"
            value={form.phone}
            onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
            disabled={!editMode}
            fullWidth
            sx={inputSx}
          />
          <TextField
            label="Role"
            value={form.role}
            onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
            disabled={!editMode}
            fullWidth
            sx={inputSx}
          />
          <TextField
            label="Branch"
            value={form.branch}
            onChange={e => setForm(p => ({ ...p, branch: e.target.value }))}
            disabled={!editMode}
            fullWidth
            sx={inputSx}
          />
          <TextField
            label="Joining Date"
            type="date"
            value={form.joiningDate}
            onChange={e => setForm(p => ({ ...p, joiningDate: e.target.value }))}
            disabled={!editMode}
            fullWidth
            sx={inputSx}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Box>
      </Box>
    </Box>
  );
}
