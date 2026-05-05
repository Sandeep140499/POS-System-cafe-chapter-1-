import { Switch, FormControlLabel } from '@mui/material';
interface ToggleSwitchProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  label?: string;
}
export default function ToggleSwitch({ checked, onChange, label }: ToggleSwitchProps) {
  const sw = (
    <Switch
      checked={checked}
      onChange={e => onChange(e.target.checked)}
      size="small"
      sx={{
        '& .MuiSwitch-switchBase.Mui-checked': { color: '#c86030' },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#c86030' },
      }}
    />
  );
  if (!label) return sw;
  return (
    <FormControlLabel
      control={sw}
      label={label}
      sx={{
        '& .MuiFormControlLabel-label': {
          fontSize: 13.5,
          color: '#555',
          fontFamily: 'Inter, sans-serif',
        },
        m: 0,
      }}
    />
  );
}
