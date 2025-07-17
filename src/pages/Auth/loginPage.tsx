import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Image,
  Loader,
  Modal,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Progress,
} from "@mantine/core";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "@mantine/form";
import {
  getPasswordStrength,
  PasswordStrength,
  strengthColorMap,
  strengthValueMap,
} from "@/utils/helpers";
import { upperFirst, useToggle } from "@mantine/hooks";
import usePost from "@/utils/usePost";
import useGet from "@/utils/useGet";
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
import { GuestHeader } from "@/components/Header";
import { GuestFooter } from "@/components/Footer";
import { API_USERS } from "@/utils/apis";
import { GIT_REDIRECT_URL, GOOGLE_REDIRECT_URL } from "@/config";
import CraneCloudLogo from "../../assets/images/logo.svg";

export function LoginForm(props: PaperProps) {
  const { login, loggedIn } = useAuth();
  const navigate = useNavigate();

  const [type, toggle] = useToggle(["login", "register"]);
  const [passwordReset, setShowPasswordReset] = useState(false);
  const [resetLinkModalOpened, setResetLinkModalOpened] = useState(false);
  const [registrationModalOpened, setRegistrationModalOpened] = useState(false);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState<PasswordStrength>("weak");
  const [confirmFeedback, setConfirmFeedback] = useState<
    "match" | "mismatch" | "none"
  >("none");

  const {
    uploadData: gitOAuth,
    submitting: gitLogin,
    success: gitLoginSuccess,
    data: gitUserDetails,
  } = usePost();
  const {
    getData: googleOAuth,
    loading: googleLogin,
    success: googleLoginSuccess,
    data: googleUserDetails,
  } = useGet();
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

  useEffect(() => {
    setStrength(getPasswordStrength(password));
  }, [password]);

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
        type === "register" && val.length < 6
          ? "Password must be at least 6 characters"
          : null,
      confirmPassword: () => null, // manual feedback shown below
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (type === "login") {
      const emailError = form.validateField("email");
      const passwordError = form.validateField("Password");

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

  const handleGithubAuth = () => (window.location.href = GIT_REDIRECT_URL);
  const handleGoogleAuth = () => (window.location.href = GOOGLE_REDIRECT_URL);

  useEffect(() => {
    if (loginSuccess && !passwordReset) {
      login(loginDetails);
      navigate("/");
    }
  }, [loginSuccess]);

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  });

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
    if (googleLoginSuccess) {
      login(googleUserDetails);
      navigate("/");
    }
  }, [googleLoginSuccess]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    const oauth = queryParams.get("oauth");
    if (oauth === "google" && code) {
      localStorage.clear();
      googleOAuth({ api: `${API_USERS}/oauth/google`, params: { code } });
    } else if (code) {
      localStorage.clear();
      gitOAuth({ api: `${API_USERS}/oauth`, params: { code } });
    }
  }, []);
  const validatepassword = (value: string) => {
    form.setFieldValue("password", value);
    setPassword(value);
    if (value.length < 6) {
      form.setFieldError("password", "Password must be at least 6 characters");
    } else {
      form.clearFieldError("password");
    }
    form.validateField("password");
    if (value === form.values.confirmPassword) {
      setConfirmFeedback("match");
    } else {
      setConfirmFeedback("mismatch");
    }
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
            <Stack justify="center" align="center" gap={10} pt={10} pb={20}>
              <Image src={CraneCloudLogo} alt="Crane Cloud" w={70} />
              <Text
                variant="gradient"
                gradient={{ from: "blue", to: "cyan", deg: 90 }}
                size="xl"
                fw={700}
                ta="center"
              >
                Welcome {type === "login" && "back"} to Crane Cloud
              </Text>
            </Stack>
            <Group justify="center" mt="lg" gap="sm">
              <Button
                radius="xl"
                leftSection={<FaGithub />}
                onClick={handleGithubAuth}
                flex={1}
              >
                {gitLogin ? (
                  <Loader size="sm" color="gray" />
                ) : (
                  "Continue with GitHub"
                )}
              </Button>
              <Button
                radius="xl"
                flex={1}
                leftSection={<FaGoogle style={{ color: "#EA4335" }} />}
                onClick={handleGoogleAuth}
              >
                {googleLogin ? (
                  <Loader size="sm" color="gray" />
                ) : (
                  "Continue with Google"
                )}
              </Button>
            </Group>
            <Divider
              label="Or continue with email"
              labelPosition="center"
              my="lg"
              fw={700}
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
                      leftSection={<MdDriveFileRenameOutline />}
                    />
                    <TextInput
                      required
                      label="Username"
                      placeholder="Your username"
                      {...form.getInputProps("username")}
                      leftSection={<MdOutlinePerson />}
                    />
                    <TextInput
                      required
                      label="Organisation"
                      placeholder="Your organisation"
                      {...form.getInputProps("organisation")}
                      leftSection={<MdOutlineBusiness />}
                    />
                  </Stack>
                )}

                <TextInput
                  required
                  label="Email"
                  placeholder="Email Address"
                  {...form.getInputProps("email")}
                  leftSection={<MdOutlineEmail />}
                />

                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  value={form.values.password}
                  onChange={(e) => {
                    validatepassword(e.currentTarget.value);
                  }}
                  error={type === "register" ? form.errors.password : undefined}
                  leftSection={<MdOutlineLock />}
                />

                {type === "register" && form.values.password && (
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

                {type === "register" && (
                  <>
                    <PasswordInput
                      label="Confirm Password"
                      placeholder="Repeat password"
                      required
                      value={form.values.confirmPassword}
                      onChange={(e) => {
                        const val = e.currentTarget.value;
                        form.setFieldValue("confirmPassword", val);
                        if (val === form.values.password) {
                          setConfirmFeedback("match");
                        } else {
                          setConfirmFeedback("mismatch");
                        }
                      }}
                    />
                    {confirmFeedback === "mismatch" && (
                      <Text size="xs" c="red">
                        Passwords do not match
                      </Text>
                    )}
                    {confirmFeedback === "match" && (
                      <Text size="xs" c="teal">
                        Passwords match
                      </Text>
                    )}

                    <Checkbox
                      required
                      label="I agree to the terms and conditions"
                      checked={form.values.terms}
                      onChange={(e) =>
                        form.setFieldValue("terms", e.currentTarget.checked)
                      }
                    />
                  </>
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
                    fw={600}
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
                      fw={700}
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
                  fw={700}
                >
                  Back to Login
                </Anchor>
              </Stack>
            </form>
          </Stack>
        )}

        <Modal
          opened={registrationModalOpened}
          onClose={() => setRegistrationModalOpened(false)}
          title={<Text fw={700}>Registration Successful</Text>}
          centered
          size="md"
        >
          <Text>
            We've sent a link to your email address:{" "}
            <strong>{form.values.email}</strong>.
            <br />
            <br />
            The link will expire after 24 hours. Please use this link to
            activate and start using your account.
          </Text>
        </Modal>

        <Modal
          opened={resetLinkModalOpened}
          onClose={() => setResetLinkModalOpened(false)}
          title={<Text fw={700}>Password Reset Link</Text>}
          centered
          size="md"
        >
          <Text>
            We've sent a link to your email address to create a new password:{" "}
            <strong>{form.values.email}</strong>.
            <br />
            <br />
            The link will expire after 24 hours. Please use this link to update
            password and resume using your account.
          </Text>
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
