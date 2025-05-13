import {
    Stack,
    Title,
    Text,
    PasswordInput,
    Button,
    Loader,
    Paper,
    Progress,
    Alert,
  } from "@mantine/core";
  import { MdErrorOutline } from "react-icons/md";
  import { useEffect, useState } from "react";
  import { getPasswordStrength, PasswordStrength, strengthColorMap, strengthValueMap } from "@/utils/helpers";
  import usePost from "@/utils/usePost";
  import { API_USERS } from "@/utils/apis";
  import { useParams } from "react-router-dom";
  
  interface Props {
    onSuccess: () => void;
  }
  
  export const CreateNewPasswordForm: React.FC<Props> = ({ onSuccess }) => {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [strength, setStrength] = useState<PasswordStrength>("weak");
  
    const { uploadData: resetUserPassword, submitting, success: passwordResetSuccess } = usePost();
  
    useEffect(() => {
      setStrength(getPasswordStrength(password));
    }, [password]);

    useEffect(() => {
        if(passwordResetSuccess){
            onSuccess();
        }
    },[passwordResetSuccess])
  
    const handleSubmit = () => {
      if (!password || !confirmPassword) {
        setError("Please enter all fields");
        return;
      }
  
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
  
      resetUserPassword({
        api: `${API_USERS}/reset_password/${token}`,
        params: { password },
        successMessage: "Password reset successful",
        errorMessage: "Failed to reset user password",
      });
    };
  
    return (
      <Paper p="xl" radius="md" withBorder>
        <Stack justify="center" mt="lg">
          <Title order={2}>Create New Password</Title>
          <Text size="sm" c="dimmed">
            Create a new and strong password
          </Text>
  
          <PasswordInput
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
              if (error) setError("");
            }}
            required
          />
  
          {password && (
            <>
              <Progress
                value={strengthValueMap[strength]}
                color={strengthColorMap[strength]}
                radius="xl"
                size="sm"
              />
              <Text size="sm" c={strengthColorMap[strength]}>
                {strength.toUpperCase()} password
              </Text>
            </>
          )}
  
          <PasswordInput
            label="Confirm Password"
            placeholder="Repeat password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            required
            error={
              confirmPassword && confirmPassword !== password
                ? "Passwords do not match"
                : undefined
            }
          />
  
          {error && (
            <Alert icon={<MdErrorOutline size={20} />} color="red">
              {error}
            </Alert>
          )}
  
          <Button
            onClick={handleSubmit}
            disabled={submitting || strength !== "strong"}
            fullWidth
          >
            {submitting ? <Loader size="xs" /> : "Reset Password"}
          </Button>
        </Stack>
      </Paper>
    );
  };
  