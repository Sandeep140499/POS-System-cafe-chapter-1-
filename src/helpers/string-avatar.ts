type AvatarData = {
  sx: { bgcolor: string };
  children: string;
};

export function stringAvatar(name: string): AvatarData {
  const parts = name.trim().split(' ').filter(Boolean);
  const initials = parts
    .slice(0, 2)
    .map(chunk => chunk[0]?.toUpperCase() ?? '')
    .join('');

  return {
    sx: {
      bgcolor: '#00A391',
    },
    children: initials || '?',
  };
}
