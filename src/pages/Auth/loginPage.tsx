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
  strengthLabelMap,
  strengthDescriptionMap,
  getPasswordCriteria,
  validatePasswordRequirements,
  validatePasswordsMatch,
  getPasswordValidationState,
} from "@/utils/helpers";
import { upperFirst, useToggle } from "@mantine/hooks";
import usePost from "@/utils/usePost";
import useGet from "@/utils/useGet";
import { useEffect, useState, useRef } from "react";
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
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const validationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const passwordValidationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      username: (val) =>
        val.trim().length < 3 ? "Username must be at least 3 characters" : null,
      password: () => null, // handled by validatePassword function
      confirmPassword: (val, values) => {
        // Only validate if explicitly triggered (not on every keystroke)
        if (type === "register" && confirmPasswordTouched) {
          if (!val) {
            return "Please confirm your password";
          }
          if (val !== values.password) {
            return "Passwords do not match";
          }
        }
        return null;
      },
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (type === "login") {
      const usernameError = form.validateField("username");
      const passwordError = form.validateField("password");

      if (usernameError.hasError || passwordError.hasError) {
        return;
      }

      loginUser({
        api: `${API_USERS}/login`,
        params: {
          username: form.values.username,
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

  const validatePassword = (value: string) => {
    form.setFieldValue("password", value);
    setPassword(value);

    // Mark as touched when user starts typing
    if (value.length > 0) {
      setPasswordTouched(true);
    }

    // Clear any existing timeout
    if (passwordValidationTimeoutRef.current) {
      clearTimeout(passwordValidationTimeoutRef.current);
    }

    // Get validation state using helper
    const validationState = getPasswordValidationState(
      value,
      type as "login" | "register",
    );

    // Clear error immediately if valid
    if (validationState.isValid && value.length > 0) {
      form.clearFieldError("password");
      return;
    }

    // For registration, show error immediately if login validation passes but password requirements don't
    if (type === "register" && passwordTouched && value.length > 0) {
      passwordValidationTimeoutRef.current = setTimeout(() => {
        if (!validationState.isValid && validationState.errorMessage) {
          form.setFieldError("password", validationState.errorMessage);
        }
      }, 500);
    } else if (type === "login") {
      // For login, show error immediately
      if (validationState.errorMessage) {
        form.setFieldError("password", validationState.errorMessage);
      } else {
        form.clearFieldError("password");
      }
    }
  };

  const validateConfirmPassword = (value: string) => {
    form.setFieldValue("confirmPassword", value);
    setConfirmPasswordTouched(true);

    // Clear any existing timeout
    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current);
    }

    // Use helper function for validation
    const validationState = validatePasswordsMatch(form.values.password, value);

    // Clear error immediately if passwords match
    if (validationState.isValid && value.length > 0) {
      form.clearFieldError("confirmPassword");
      return;
    }

    // Debounce validation - only validate after user stops typing for 800ms
    validationTimeoutRef.current = setTimeout(() => {
      if (value.length > 0 && !validationState.isValid) {
        form.setFieldError(
          "confirmPassword",
          validationState.errorMessage || "",
        );
      }
    }, 800);
  };

  const handlePasswordBlur = () => {
    // Validate immediately on blur if there's content and it's registration
    if (type === "register" && form.values.password.length > 0) {
      const validationState = validatePasswordRequirements(
        form.values.password,
      );

      if (!validationState.isValid && validationState.errorMessage) {
        form.setFieldError("password", validationState.errorMessage);
      }
    }
  };

  const handleConfirmPasswordBlur = () => {
    // Validate immediately on blur if there's content
    if (form.values.confirmPassword.length > 0) {
      const validationState = validatePasswordsMatch(
        form.values.password,
        form.values.confirmPassword,
      );

      if (!validationState.isValid && validationState.errorMessage) {
        form.setFieldError("confirmPassword", validationState.errorMessage);
      }
    }
  };

  const isSubmitDisabled = () => {
    // Check for basic field errors
    if (form.errors.password) {
      return true;
    }

    if (type === "login") {
      // For login, check username errors
      if (form.errors.username) {
        return true;
      }
    } else {
      // For registration, check email and username errors
      if (form.errors.email || form.errors.username) {
        return true;
      }
      // Check if confirm password has errors
      if (form.errors.confirmPassword) {
        return true;
      }
    }

    return false;
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
                    <TextInput
                      required
                      label="Email"
                      placeholder="Email Address"
                      {...form.getInputProps("email")}
                      leftSection={<MdOutlineEmail />}
                    />
                  </Stack>
                )}
                {type === "login" && (
                  <TextInput
                    required
                    label="Username"
                    placeholder="Your username or email"
                    {...form.getInputProps("username")}
                    leftSection={<MdOutlinePerson />}
                  />
                )}

                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  value={form.values.password}
                  onChange={(e) => {
                    validatePassword(e.currentTarget.value);
                  }}
                  onBlur={handlePasswordBlur}
                  error={form.errors.password}
                  leftSection={<MdOutlineLock />}
                />

                {type === "register" && form.values.password && (
                  // !form.errors.password && (
                  <Stack gap={4}>
                    <Group justify="space-between" align="center">
                      <Text size="sm" fw={600} c={strengthColorMap[strength]}>
                        {strengthLabelMap[strength]}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {Math.round(strengthValueMap[strength])}% secure
                      </Text>
                    </Group>

                    <Progress
                      value={strengthValueMap[strength]}
                      color={strengthColorMap[strength]}
                      radius="xl"
                      size="md"
                      striped
                      animated={strength !== "strong"}
                    />

                    <Text
                      size="xs"
                      c={strengthColorMap[strength]}
                      ta="center"
                      fs="italic"
                    >
                      {strengthDescriptionMap[strength]}
                    </Text>

                    {strength !== "strong" && (
                      <Stack gap="xs" mt="xs">
                        <Text size="xs" fw={500} c="dimmed">
                          Requirements:
                        </Text>
                        <Stack gap={4}>
                          {getPasswordCriteria(form.values.password)
                            .filter(
                              (criterion) =>
                                criterion.critical || !criterion.met,
                            )
                            .slice(0, 5)
                            .map((criterion, index) => (
                              <Group key={index} gap="xs" align="center">
                                <Text
                                  size="xs"
                                  c={criterion.met ? "teal.6" : "gray.6"}
                                  fw={criterion.met ? 600 : 400}
                                >
                                  {criterion.met ? "✓" : "•"} {criterion.label}
                                </Text>
                              </Group>
                            ))}
                        </Stack>
                      </Stack>
                    )}
                  </Stack>
                )}

                {type === "register" && (
                  <>
                    <PasswordInput
                      label="Confirm Password"
                      placeholder="Repeat password"
                      required
                      value={form.values.confirmPassword}
                      onChange={(e) => {
                        validateConfirmPassword(e.currentTarget.value);
                      }}
                      onBlur={handleConfirmPasswordBlur}
                      error={form.errors.confirmPassword}
                      leftSection={<MdOutlineLock />}
                    />

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
                  disabled={isSubmitDisabled()}
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
