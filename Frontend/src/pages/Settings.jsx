import React, { useContext, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  Lock,
  Security,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { AuthContext } from "../context/AuthContext.jsx";
import { changePassword } from "../api/user.js";

const initialForm = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function Settings() {
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState(initialForm);
  const [showPasswords, setShowPasswords] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (form.newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirmation do not match");
      return;
    }

    if (form.oldPassword === form.newPassword) {
      setError("New password must be different from old password");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });
      setSuccess(response.data.message || "Password changed successfully");
      setForm(initialForm);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to change password");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isGoogleAccount = user?.isGoogleUser;

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={(theme) => ({
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          background:
            theme.palette.mode === "light"
              ? "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.95))"
              : "linear-gradient(135deg, rgba(38, 38, 38, 0.9), rgba(24, 24, 24, 0.95))",
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[4],
        })}
      >
        <Box textAlign="center" mb={4}>
          <Security color="primary" sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="h4" fontWeight={700}>
            Account Settings
          </Typography>
          <Typography color="text.secondary">
            Change the password used to sign in to your account.
          </Typography>
        </Box>

        {isGoogleAccount && (
          <Alert severity="info" sx={{ mb: 3 }}>
            This account uses Google sign-in, so its password cannot be changed
            here.
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            severity="success"
            sx={{ mb: 3 }}
            onClose={() => setSuccess("")}
          >
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              required
              disabled={isGoogleAccount}
              name="oldPassword"
              label="Current Password"
              type={showPasswords ? "text" : "password"}
              value={form.oldPassword}
              onChange={handleChange}
              autoComplete="current-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              required
              disabled={isGoogleAccount}
              name="newPassword"
              label="New Password"
              type={showPasswords ? "text" : "password"}
              value={form.newPassword}
              onChange={handleChange}
              autoComplete="new-password"
              helperText="Use at least 8 characters"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              required
              disabled={isGoogleAccount}
              name="confirmPassword"
              label="Confirm New Password"
              type={showPasswords ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPasswords ? "Hide passwords" : "Show passwords"
                      }
                      onClick={() => setShowPasswords((current) => !current)}
                      edge="end"
                    >
                      {showPasswords ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isGoogleAccount || isSubmitting}
              sx={{ py: 1.5, borderRadius: 2, fontWeight: 600 }}
            >
              {isSubmitting ? "Changing Password..." : "Change Password"}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
