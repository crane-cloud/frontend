import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Loader,
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
import { useEffect } from "react";
import { useAuth } from "@/utils/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineEmail,
  MdOutlineLock,
  MdDriveFileRenameOutline,
  MdOutlinePerson,
} from "react-icons/md";

export function LoginForm(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"]);
  const { uploadData, submitting, success, data } = usePost();
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      username: "",
      password: "",
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
    if (form.validate().hasErrors) {
      return;
    }
    uploadData({
      api: "users/login",
      params: form.values,
      successMessage: "Login successful",
      errorMessage: "Login failed",
    });
  };

  useEffect(() => {
    if (success) {
      login(data);
      navigate("/");
    }
  }, [success]);

  return (
    <Paper
      radius="md"
      p="xl"
      miw={{ base: "100%", sm: 400 }}
      withBorder
      {...props}
    >
      <Text
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
        size="xl"
        fw={700}
        ta="center"
      >
        Welcome {type === "login" && "back"} to Cranecloud
      </Text>
      <Group justify="center" mt="lg">
        <Button radius="xl" leftSection={<FaGithub />} color="black">
          Continue with Github
        </Button>
      </Group>
      <Divider label="Or continue with email" labelPosition="center" my="lg" />
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
              <Anchor component="button" type="button" size="sm">
                Forgot password?
              </Anchor>
            )}
          </Group>
          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
          >
            {submitting ? <Loader size="sm" color="white" /> : upperFirst(type)}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}

export function LoginPage() {
  return (
    <Group justify="center" mt="lg">
      <LoginForm />
    </Group>
  );
}
