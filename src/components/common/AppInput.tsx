import { TextField, TextFieldProps, InputAdornment } from '@mui/material';
import type React from 'react';

export type AppInputProps = TextFieldProps & {
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  dark?: boolean;
};

const darkInputStyles = {
  bgcolor: '#171b30',
  borderRadius: 1.2,
  color: '#f6f8ff',
  height: 42,
  '& fieldset': { border: 'none' },
};

const lightInputStyles = {
  bgcolor: 'background.paper',
  borderRadius: 2,
  color: 'text.secondary',
  height: 40,
  '& fieldset': {
    borderColor: 'rgba(255,255,255,0.06)',
  },
  '&:hover fieldset': {
    borderColor: 'rgba(255,255,255,0.12)',
  },
  '&.Mui-focused fieldset': {
    borderColor: 'primary.main',
  },
};

export default function AppInput({
  icon,
  iconPosition = 'start',
  dark = true,
  ...props
}: AppInputProps) {
  const inputStyles = dark ? darkInputStyles : lightInputStyles;

  const adornment = icon ? (
    <InputAdornment position={iconPosition}>{icon}</InputAdornment>
  ) : undefined;

  return (
    <TextField
      fullWidth
      {...props}
      slotProps={{
        input: {
          sx: inputStyles,
          startAdornment: iconPosition === 'start' ? adornment : undefined,
          endAdornment: iconPosition === 'end' ? adornment : undefined,
        },
      }}
    />
  );
}

export function DarkInput(props: AppInputProps) {
  return <AppInput dark {...props} />;
}

export function LightInput(props: AppInputProps) {
  return <AppInput dark={false} {...props} />;
}

export function SearchInput(props: AppInputProps) {
  return (
    <LightInput
      placeholder="Search here..."
      sx={{ flex: 1, maxWidth: 760, minWidth: 260, ...props.sx }}
      {...props}
    />
  );
}

export function EmailInput(props: AppInputProps) {
  return <DarkInput type="email" placeholder="Enter your email" {...props} />;
}

export function PasswordInput(props: AppInputProps) {
  return <DarkInput type="password" placeholder="Enter your password" {...props} />;
}

export function LabelledInput({ label, ...props }: AppInputProps & { label: string }) {
  return (
    <div>
      <label style={{ color: '#d9dfef', fontSize: 13, display: 'block', marginBottom: 6 }}>
        {label}
      </label>
      <DarkInput {...props} />
    </div>
  );
}

export function LabelledLightInput({ label, ...props }: AppInputProps & { label: string }) {
  return (
    <div>
      <label style={{ display: 'block', marginBottom: 6 }}>{label}</label>
      <LightInput {...props} />
    </div>
  );
}
