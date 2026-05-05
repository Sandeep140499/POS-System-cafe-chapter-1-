import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import type React from 'react';
import { useState } from 'react';

export type FilterOption = {
  value: string;
  label: string;
};

export type FilterConfig = {
  key: string;
  label: string;
  type: 'select' | 'text' | 'date' | 'chip';
  options?: FilterOption[];
  placeholder?: string;
};

export type FilterValue = Record<string, string>;

export type AppFilterProps = {
  filters: FilterConfig[];
  values: FilterValue;
  onChange: (values: FilterValue) => void;
  onClear?: () => void;
};

export default function AppFilter({ filters, values, onChange, onClear }: AppFilterProps) {
  const handleChange = (key: string, value: string) => {
    onChange({ ...values, [key]: value });
  };

  const activeFiltersCount = Object.values(values).filter(Boolean).length;

  return (
    <Box
      sx={{
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: filters.length > 0 ? 2 : 0,
        }}
      >
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
          <FilterListIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Filters
          </Typography>
          {activeFiltersCount > 0 && (
            <Chip
              label={activeFiltersCount}
              size="small"
              sx={{
                height: 20,
                fontSize: 12,
                bgcolor: 'primary.main',
                color: '#1c223b',
              }}
            />
          )}
        </Stack>
        {activeFiltersCount > 0 && (
          <IconButton size="small" onClick={onClear} sx={{ color: 'text.secondary' }}>
            <ClearIcon fontSize="small" />
          </IconButton>
        )}
      </Stack>

      <Stack
        direction="row"
        sx={{
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {filters.map(filter => (
          <Box key={filter.key} sx={{ minWidth: 200 }}>
            {filter.type === 'select' && (
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: 'text.secondary' }}>{filter.label}</InputLabel>
                <Select
                  value={values[filter.key] || ''}
                  label={filter.label}
                  onChange={(e: SelectChangeEvent) => handleChange(filter.key, e.target.value)}
                  sx={{
                    color: 'text.primary',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,255,255,0.1)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  {filter.options?.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {filter.type === 'text' && (
              <TextField
                fullWidth
                size="small"
                label={filter.label}
                placeholder={filter.placeholder}
                value={values[filter.key] || ''}
                onChange={e => handleChange(filter.key, e.target.value)}
                sx={{
                  '& .MuiInputLabel-root': { color: 'text.secondary' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                  },
                }}
              />
            )}
          </Box>
        ))}
      </Stack>

      {Object.entries(values)
        .filter(([_, value]) => value)
        .map(([key, value]) => {
          const filter = filters.find(f => f.key === key);
          return (
            <Chip
              key={key}
              label={`${filter?.label}: ${value}`}
              onDelete={() => handleChange(key, '')}
              size="small"
              sx={{
                mt: 2,
                mr: 1,
                bgcolor: 'rgba(154, 215, 212, 0.1)',
                color: 'primary.light',
                border: '1px solid rgba(154, 215, 212, 0.2)',
              }}
            />
          );
        })}
    </Box>
  );
}

export function QuickFilter({
  options,
  value,
  onChange,
}: {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Stack direction="row" sx={{ gap: 1, flexWrap: 'wrap' }}>
      {options.map(opt => (
        <Chip
          key={opt.value}
          label={opt.label}
          onClick={() => onChange(opt.value === value ? '' : opt.value)}
          sx={{
            bgcolor: value === opt.value ? 'primary.main' : 'rgba(255,255,255,0.05)',
            color: value === opt.value ? '#1c223b' : 'text.secondary',
            fontWeight: value === opt.value ? 600 : 400,
            cursor: 'pointer',
            '&:hover': {
              bgcolor: value === opt.value ? 'primary.main' : 'rgba(255,255,255,0.1)',
            },
          }}
        />
      ))}
    </Stack>
  );
}

export function SearchFilter({
  value,
  onChange,
  placeholder = 'Search...',
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <TextField
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      sx={{
        minWidth: 260,
        '& .MuiOutlinedInput-root': {
          bgcolor: 'background.paper',
          borderRadius: 2,
          height: 40,
          color: 'text.secondary',
          '& fieldset': {
            borderColor: 'rgba(255,255,255,0.06)',
          },
          '&:hover fieldset': {
            borderColor: 'rgba(255,255,255,0.12)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'primary.main',
          },
        },
      }}
    />
  );
}
