import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Loader,
  Modal,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { FaGithub } from "react-icons/fa";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import usePost from "@/utils/usePost";
import { useEffect, useState } from "react";
import { useAuth } from "@/utils/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineEmail,
  MdOutlineLock,
  MdDriveFileRenameOutline,
  MdOutlinePerson,
  MdOutlineBusiness,
} from "react-icons/md";
import { GIT_REDIRECT_URL } from "@/config";
import { GuestHeader } from "@/components/Header";
import { GuestFooter } from "@/components/Footer";
import { API_USERS } from "@/utils/apis";

export function LoginForm(props: PaperProps) {
  const { login, loggedIn } = useAuth();
  const navigate = useNavigate();

  const [type, toggle] = useToggle(["login", "register"]);
  const [passwordReset, setShowPasswordReset] = useState(false);
  const [resetLinkModalOpened, setResetLinkModalOpened] = useState(false);
  const [registrationModalOpened, setRegistrationModalOpened] = useState(false);

  const {
    uploadData: gitOAuth,
    submitting: gitLogin,
    success: gitLoginSuccess,
    data: gitUserDetails,
  } = usePost();
  const {
    uploadData: loginUser,
    submitting: loggingIn,
    success: loginSuccess,
    data: loginDetails,
  } = usePost();
  const {
    uploadData: registerUser,
    submitting: registering,
    success: registerSuccess,
  } = usePost();
  const {
    uploadData: resetPassword,
    submitting: sendingResetLink,
    success: linkSentSuccess,
  } = usePost();

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      username: "",
      password: "",
      organisation: "",
      confirmPassword: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        type === "register" && val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      confirmPassword: (val: string): string | null =>
        type === "register" && val !== form.values.password
          ? "Passwords do not match"
          : null,
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (type === "login") {
      const emailError = form.validateField("email");
      const passwordError = form.validateField("password");

      if (emailError.hasError || passwordError.hasError) {
        return;
      }

      loginUser({
        api: `${API_USERS}/login`,
        params: {
          email: form.values.email,
          password: form.values.password,
        },
        successMessage: "Login successful",
        errorMessage: "Login failed",
      });
    } else {
      if (form.validate().hasErrors) {
        return;
      }

      registerUser({
        api: `${API_USERS}`,
        params: {
          email: form.values.email,
          name: form.values.name,
          organisation: form.values.organisation,
          password: form.values.password,
        },
        successMessage: "Account created successfully",
        errorMessage: "Account registration failed",
      });
    }
  };

  const handlePasswordReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailError = form.validateField("email");
    if (emailError.hasError) {
      return;
    }

    resetPassword({
      api: `${API_USERS}/forgot_password`,
      params: { email: form.values.email },
      successMessage: "Reset link sent",
      errorMessage: "Failed to send reset link",
    });
  };

  const initiateGitHubLogin = (code: string) => {
    gitOAuth({
      api: `${API_USERS}/oauth`,
      params: { code },
      successMessage: "Git user login successful",
      errorMessage: "Failed to authorize git user",
    });
  };

  useEffect(() => {
    if (loginSuccess && !passwordReset) {
      login(loginDetails);
      navigate("/");
    }
  }, [loginSuccess]);

  useEffect(() => {
    // keep the user on the real home page if they are logged in
    // can only show on logout
    if (loggedIn) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (registerSuccess) {
      setRegistrationModalOpened(true);
      form.reset();
      toggle();
    }
  }, [registerSuccess]);

  useEffect(() => {
    if (linkSentSuccess) {
      setResetLinkModalOpened(true);
    }
  }, [linkSentSuccess]);

  useEffect(() => {
    if (gitLoginSuccess) {
      login(gitUserDetails);
      navigate("/");
    }
  }, [gitLoginSuccess]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    if (code) {
      localStorage.clear();
      initiateGitHubLogin(code);
    }
  }, []);

  const handleGithubAuth = () => {
    window.location.href = GIT_REDIRECT_URL;
  };

  return (
    <Stack justify="center" mt="lg">
      <Paper
        radius="md"
        p="xl"
        miw={{ base: "100%", sm: 400 }}
        withBorder
        {...props}
      >
        {!passwordReset ? (
          <>
            <Text
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
              size="xl"
              fw={700}
              ta="center"
            >
              Welcome {type === "login" && "back"} to Crane Cloud
            </Text>
            <Group justify="center" mt="lg" gap="sm">
              <Button
                radius="xl"
                leftSection={<FaGithub />}
                color="theme.black"
                variant="default"
                style={{ borderColor: "theme.black" }}
                onClick={handleGithubAuth}
                flex={1}
              >
                {gitLogin ? (
                  <Loader size="sm" color="white" />
                ) : (
                  "Continue with GitHub"
                )}
              </Button>
              {/* <Button
              radius="xl"
              flex={1}
              leftSection={
                <FaGoogle
                  style={{
                    color: "#EA4335",
                  }}
                />
              }
              variant="default"
              style={{ borderColor: "theme.red" }}
              onClick={handleGoogleAuth}
            >
              Google
            </Button> */}
            </Group>
            <Divider
              label="Or continue with email"
              labelPosition="center"
              my="lg"
            />
            <form onSubmit={handleSubmit}>
              <Stack gap="sm">
                {type === "register" && (
                  <Stack>
                    <TextInput
                      required
                      label="Name"
                      placeholder="Your name"
                      {...form.getInputProps("name")}
                      radius="sm"
                      color="blue"
                      leftSection={<MdDriveFileRenameOutline />}
                    />
                    <TextInput
                      required
                      label="Username"
                      placeholder="Your username"
                      {...form.getInputProps("username")}
                      radius="sm"
                      color="blue"
                      leftSection={<MdOutlinePerson />}
                    />

                    <TextInput
                      required
                      label="Organisation"
                      placeholder="Your organisation"
                      {...form.getInputProps("organisation")}
                      radius="sm"
                      color="blue"
                      leftSection={<MdOutlineBusiness />}
                    />
                  </Stack>
                )}
                <TextInput
                  required
                  label="Email"
                  placeholder="Email Address"
                  {...form.getInputProps("email")}
                  error={form.errors.email && "Invalid email"}
                  radius="sm"
                  color="blue"
                  leftSection={<MdOutlineEmail />}
                />

                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  {...form.getInputProps("password")}
                  radius="sm"
                  color="blue"
                  leftSection={<MdOutlineLock />}
                />
                {type === "register" && (
                  <Stack>
                    <PasswordInput
                      required
                      label="Confirm Password"
                      placeholder="Confirm your password"
                      {...form.getInputProps("confirmPassword")}
                      radius="sm"
                      color="blue"
                      leftSection={<MdOutlineLock />}
                    />
                    <Checkbox
                      required
                      label="I agree to the terms and conditions"
                      checked={form.values.terms}
                      onChange={(event) =>
                        form.setFieldValue("terms", event.currentTarget.checked)
                      }
                    />
                  </Stack>
                )}
              </Stack>

              <Stack mt="xl">
                <Group justify="space-between">
                  <Anchor
                    component="button"
                    type="button"
                    c="dimmed"
                    onClick={() => toggle()}
                    size="xs"
                  >
                    {type === "register"
                      ? "Already have an account? Login"
                      : "Don't have an account? Register"}
                  </Anchor>
                  {type === "login" && (
                    <Anchor
                      component="button"
                      type="button"
                      size="sm"
                      onClick={() => setShowPasswordReset(true)}
                    >
                      Forgot password?
                    </Anchor>
                  )}
                </Group>
                <Button
                  type="submit"
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan", deg: 90 }}
                >
                  {loggingIn || registering ? (
                    <Loader size="sm" color="white" />
                  ) : (
                    upperFirst(type)
                  )}
                </Button>
              </Stack>
            </form>
          </>
        ) : (
          <Stack>
            <Text
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
              size="xl"
              fw={700}
              ta="center"
            >
              Reset Your Password
            </Text>
            <Text ta="center" size="sm" c="dimmed">
              Enter your email address so we can send you a link to reset your
              password.
            </Text>

            <form onSubmit={handlePasswordReset}>
              <Stack>
                <TextInput
                  required
                  label="Email Address"
                  placeholder="you@example.com"
                  {...form.getInputProps("email")}
                  leftSection={<MdOutlineEmail />}
                />
                <Button
                  type="submit"
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan", deg: 90 }}
                >
                  {sendingResetLink ? (
                    <Loader size="sm" color="white" />
                  ) : (
                    "Reset"
                  )}
                </Button>
                <Anchor
                  component="button"
                  type="button"
                  c="dimmed"
                  onClick={() => setShowPasswordReset(false)}
                  size="xs"
                >
                  Back to Login
                </Anchor>
              </Stack>
            </form>
          </Stack>
        )}

        <Modal
          opened={registrationModalOpened}
          onClose={() => {
            setRegistrationModalOpened(false);
            form.setFieldValue("email", "");
          }}
          title={<Text fw={700}>Registration Successful</Text>}
          centered
          size="md"
        >
          <div>
            <Text>
              We've sent a link to your email address:{" "}
              <strong>{form.values.email}</strong>.
              <br />
              <br />
              The link will expire after 24 hours. Please use this link to
              activate and start using your account.
            </Text>
          </div>
        </Modal>

        <Modal
          opened={resetLinkModalOpened}
          onClose={() => setResetLinkModalOpened(false)}
          title={<Text fw={700}>Password Reset Link</Text>}
          centered
          size="md"
        >
          <div>
            <Text>
              We&apos;ve sent a link to your email address to create a new
              password: <strong>{form.values.email}</strong>.
              <br />
              <br />
              The link will expire after 24 hours. Please use this link to
              update password and resume using your account.
            </Text>
          </div>
        </Modal>
      </Paper>
    </Stack>
  );
}

export function LoginPage() {
  return (
    <Stack justify="space-between" h="100vh">
      <GuestHeader />
      <Group justify="center">
        <LoginForm />
      </Group>
      <GuestFooter />
    </Stack>
  );
}
