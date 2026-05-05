import { useState } from 'react';
import { Box, Typography, TextField, Button, Switch, FormControlLabel, Chip } from '@mui/material';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import PageHeader from 'components/common/PageHeader';

const STORAGE_KEY = 'cc1_settings';

interface SettingsData {
  cafeName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  taxPercent: string;
  currency: string;
  autoLogout: boolean;
  darkMode: boolean;
  emailAlerts: boolean;
  lowStockAlert: boolean;
}

function getSettings(): SettingsData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    cafeName: 'Chapter One Cafe',
    contactEmail: 'chapteronecafe11@gmail.com',
    contactPhone: '+91 98765 43210',
    address: 'Gautam Nagar, New Delhi',
    taxPercent: '5',
    currency: 'INR',
    autoLogout: false,
    darkMode: false,
    emailAlerts: true,
    lowStockAlert: true,
  };
}

function saveSettings(s: SettingsData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
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

export default function SuperAdminSettingsPage() {
  const [settings, setSettings] = useState<SettingsData>(getSettings);
  const [toast, setToast] = useState('');
  const showToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(''), 3000);
  };

  const handleChange = (field: keyof SettingsData, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    saveSettings(settings);
    showToast('Settings saved successfully!');
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
        label="SETTINGS"
        title="Settings"
        subtitle="System configuration, branch settings, and preferences."
      />

      {/* General Settings */}
      <Box sx={{ bgcolor: '#fff', borderRadius: '20px', border: '1px solid #eae7e2', p: 3, mb: 3 }}>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: '#1a1a1a',
            mb: 2.5,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          General Settings
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <TextField
            label="Cafe Name"
            value={settings.cafeName}
            onChange={e => handleChange('cafeName', e.target.value)}
            fullWidth
            sx={inputSx}
          />
          <TextField
            label="Contact Email"
            type="email"
            value={settings.contactEmail}
            onChange={e => handleChange('contactEmail', e.target.value)}
            fullWidth
            sx={inputSx}
          />
          <TextField
            label="Contact Phone"
            value={settings.contactPhone}
            onChange={e => handleChange('contactPhone', e.target.value)}
            fullWidth
            sx={inputSx}
          />
          <TextField
            label="Address"
            value={settings.address}
            onChange={e => handleChange('address', e.target.value)}
            fullWidth
            sx={inputSx}
          />
          <TextField
            label="Tax Percentage (%)"
            type="number"
            value={settings.taxPercent}
            onChange={e => handleChange('taxPercent', e.target.value)}
            fullWidth
            sx={inputSx}
          />
          <TextField
            label="Currency"
            value={settings.currency}
            onChange={e => handleChange('currency', e.target.value)}
            fullWidth
            sx={inputSx}
          />
        </Box>
      </Box>

      {/* Preferences */}
      <Box sx={{ bgcolor: '#fff', borderRadius: '20px', border: '1px solid #eae7e2', p: 3, mb: 3 }}>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 700,
            color: '#1a1a1a',
            mb: 2.5,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Preferences
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#1a1a1a',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Auto Logout
              </Typography>
              <Typography sx={{ fontSize: 12, color: '#999', fontFamily: 'Inter, sans-serif' }}>
                Automatically logout after 30 minutes of inactivity
              </Typography>
            </Box>
            <Switch
              checked={settings.autoLogout}
              onChange={e => handleChange('autoLogout', e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#c86030' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#c86030' },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#1a1a1a',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Email Alerts
              </Typography>
              <Typography sx={{ fontSize: 12, color: '#999', fontFamily: 'Inter, sans-serif' }}>
                Receive email notifications for important events
              </Typography>
            </Box>
            <Switch
              checked={settings.emailAlerts}
              onChange={e => handleChange('emailAlerts', e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#c86030' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#c86030' },
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#1a1a1a',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                Low Stock Alert
              </Typography>
              <Typography sx={{ fontSize: 12, color: '#999', fontFamily: 'Inter, sans-serif' }}>
                Notify when inventory items are running low
              </Typography>
            </Box>
            <Switch
              checked={settings.lowStockAlert}
              onChange={e => handleChange('lowStockAlert', e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#c86030' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#c86030' },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Save Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          startIcon={<SaveRoundedIcon />}
          onClick={handleSave}
          sx={{
            bgcolor: '#c86030',
            color: '#fff',
            borderRadius: '20px',
            px: 3,
            py: 1,
            textTransform: 'none',
            fontSize: 14,
            fontFamily: 'Inter, sans-serif',
            '&:hover': { bgcolor: '#a8502a' },
          }}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
}
