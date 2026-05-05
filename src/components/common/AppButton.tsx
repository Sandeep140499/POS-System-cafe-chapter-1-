import { Button, ButtonProps } from "@mui/material";
import type React from "react";

export type AppButtonProps = ButtonProps;

export default function AppButton(props: AppButtonProps) {
  return <Button {...props} />;
}

export function PrimaryButton(props: AppButtonProps) {
  return <Button variant="contained" {...props} />;
}

export function SecondaryButton(props: AppButtonProps) {
  return <Button variant="outlined" {...props} />;
}

export function GhostButton(props: AppButtonProps) {
  return (
    <Button
      variant="text"
      sx={{ color: "text.secondary", ...props.sx }}
      {...props}
    />
  );
}

export function DangerButton(props: AppButtonProps) {
  return (
    <Button
      variant="contained"
      color="error"
      {...props}
    />
  );
}

export function SmallButton(props: AppButtonProps) {
  return <Button size="small" sx={{ px: 2, py: 0.5, fontSize: 13, ...props.sx }} {...props} />;
}

export function LargeButton(props: AppButtonProps) {
  return <Button size="large" sx={{ px: 4, py: 1.5, fontSize: 16, ...props.sx }} {...props} />;
}

export function FullWidthButton(props: AppButtonProps) {
  return <Button fullWidth {...props} />;
}

export function IconButton({
  icon,
  children,
  ...props
}: AppButtonProps & { icon?: React.ReactNode }) {
  return (
    <Button
      startIcon={icon}
      {...props}
    >
      {children}
    </Button>
  );
}

export function LoadingButton({
  loading,
  children,
  ...props
}: AppButtonProps & { loading?: boolean }) {
  return (
    <Button disabled={loading || props.disabled} {...props}>
      {loading ? "Loading..." : children}
    </Button>
  );
}

export function ActionButton(props: AppButtonProps) {
  return (
    <Button
      variant="contained"
      sx={{
        minWidth: 120,
        px: 3,
        py: 1,
        fontSize: 14,
        fontWeight: 600,
        borderRadius: 2,
        ...props.sx,
      }}
      {...props}
    />
  );
}

export function LinkButton(props: AppButtonProps) {
  return (
    <Button
      variant="text"
      sx={{
        color: "#7ed7d2",
        textDecoration: "none",
        fontWeight: 600,
        fontSize: 13,
        p: 0,
        minWidth: "auto",
        ...props.sx,
      }}
      {...props}
    />
  );
}

export function BackButton(props: AppButtonProps) {
  return (
    <Button
      variant="text"
      sx={{
        textTransform: "none",
        color: "#9fb0d6",
        fontSize: 13,
        ...props.sx,
      }}
      {...props}
    />
  );
}

export function SubmitButton(props: AppButtonProps) {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      sx={{
        py: 0.85,
        fontSize: 18,
        mt: 0.6,
        ...props.sx,
      }}
      {...props}
    />
  );
}

export function CreateButton(props: AppButtonProps) {
  return (
    <ActionButton {...props}>
      + Create New
    </ActionButton>
  );
}

export function EditButton(props: AppButtonProps) {
  return <SmallButton {...props}>Edit</SmallButton>;
}

export function DeleteButton(props: AppButtonProps) {
  return (
    <SmallButton
      sx={{ color: "error.main", ...props.sx }}
      {...props}
    >
      Delete
    </SmallButton>
  );
}

export function SaveButton(props: AppButtonProps) {
  return (
    <PrimaryButton {...props}>
      Save
    </PrimaryButton>
  );
}

export function CancelButton(props: AppButtonProps) {
  return (
    <SecondaryButton {...props}>
      Cancel
    </SecondaryButton>
  );
}

export function SearchButton(props: AppButtonProps) {
  return (
    <PrimaryButton {...props}>
      Search
    </PrimaryButton>
  );
}

export function FilterButton(props: AppButtonProps) {
  return (
    <SecondaryButton
      sx={{ minWidth: 100, ...props.sx }}
      {...props}
    >
      Filter
    </SecondaryButton>
  );
}

export function ExportButton(props: AppButtonProps) {
  return (
    <SecondaryButton
      sx={{ minWidth: 100, ...props.sx }}
      {...props}
    >
      Export
    </SecondaryButton>
  );
}

export function RefreshButton(props: AppButtonProps) {
  return (
    <SecondaryButton {...props}>
      Refresh
    </SecondaryButton>
  );
}

export function ViewButton(props: AppButtonProps) {
  return <SmallButton {...props}>View</SmallButton>;
}

export function DownloadButton(props: AppButtonProps) {
  return (
    <PrimaryButton {...props}>
      Download
    </PrimaryButton>
  );
}

export function UploadButton(props: AppButtonProps) {
  return (
    <SecondaryButton {...props}>
      Upload
    </SecondaryButton>
  );
}

export function LoginButton(props: AppButtonProps) {
  return (
    <PrimaryButton
      sx={{ px: { xs: 3, md: 4 }, py: 1, fontSize: { xs: 14, md: 16 }, ...props.sx }}
      {...props}
    >
      Login
    </PrimaryButton>
  );
}

export function LogoutButton(props: AppButtonProps) {
  return (
    <SecondaryButton
      sx={{ color: "common.white", borderColor: "rgba(255,255,255,0.3)", ...props.sx }}
      {...props}
    >
      Logout
    </SecondaryButton>
  );
}

export function RegisterButton(props: AppButtonProps) {
  return (
    <PrimaryButton
      sx={{ py: 0.85, fontSize: 18, mt: 0.6, ...props.sx }}
      {...props}
    >
      Create Account
    </PrimaryButton>
  );
}

export function ForgotPasswordButton(props: AppButtonProps) {
  return (
    <Button
      variant="text"
      sx={{ textTransform: "none", color: "#9fb0d6", mt: -0.1, fontSize: 13, ...props.sx }}
      {...props}
    >
      Forgot Password?
    </Button>
  );
}

export function ResetPasswordButton(props: AppButtonProps) {
  return (
    <SubmitButton {...props}>
      Update Password
    </SubmitButton>
  );
}

export function SendResetLinkButton(props: AppButtonProps) {
  return (
    <SubmitButton {...props}>
      Send Reset Link
    </SubmitButton>
  );
}

export function BackToLoginButton(props: AppButtonProps) {
  return (
    <BackButton {...props}>
      Back to Login
    </BackButton>
  );
}

export function GetStartedButton(props: AppButtonProps) {
  return (
    <PrimaryButton
      size="large"
      sx={{ px: 5, py: 1.5, fontSize: 18, ...props.sx }}
      {...props}
    >
      Get Started
    </PrimaryButton>
  );
}
