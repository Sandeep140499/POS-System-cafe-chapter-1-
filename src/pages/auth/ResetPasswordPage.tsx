import { Stack } from '@mui/material';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { paths } from 'routes/paths';
import AuthBrandHeader from './AuthBrandHeader';
import { ResetPasswordButton, BackToLoginButton, LabelledInput } from 'components/common';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  return (
    <Stack spacing={1.4} sx={{ width: '100%', maxWidth: 420, mx: 'auto' }}>
      <AuthBrandHeader
        title="Reset Password"
        subtitle={
          email ? `Reset password for ${email}.` : 'Create a new password for your account.'
        }
      />

      <LabelledInput label="New Password" type="password" placeholder="Enter new password" />

      <LabelledInput label="Confirm Password" type="password" placeholder="Confirm new password" />

      <ResetPasswordButton>Update Password</ResetPasswordButton>

      <RouterLink to={paths.auth.login} style={{ textDecoration: 'none', textAlign: 'center' }}>
        <BackToLoginButton />
      </RouterLink>
    </Stack>
  );
}
