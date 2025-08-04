import { Button, Stack, TextInput, Textarea, Group } from "@mantine/core";
import { useState, useEffect } from "react";
import usePost from "@/utils/usePost";

type UpdateProfileForm = {
  user: any; // your user object, can type more strictly if you want
  onCancel: () => void;
  onSuccess?: () => void;
};

export const UpdateProfileForm = ({
  user,
  onCancel,
  onSuccess,
}: UpdateProfileForm) => {
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [biography, setBiography] = useState(user?.biography || "");
  const [organisation, setOrganisation] = useState(user?.organisation || "");

  const { uploadData, submitting, success } = usePost();

  useEffect(() => {
    if (success) {
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [success, onSuccess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      return;
    }

    uploadData({
      api: "users",
      id: user.id,
      method: "PATCH",
      params: {
        username,
        email,
        biography,
        organisation,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={15}>
        <TextInput
          label="Username"
          placeholder="Enter your username"
          description="This will be your public username. Do not use spaces or special characters."
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          required
        />

        <TextInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          disabled
          required
        />

        <TextInput
          label="Organisation"
          placeholder="Your organisation or company"
          value={organisation}
          onChange={(e) => setOrganisation(e.currentTarget.value)}
          required
        />

        <Textarea
          label="Biography"
          placeholder="Tell us about yourself"
          value={biography}
          onChange={(e) => setBiography(e.currentTarget.value)}
          maxRows={3}
        />

        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={onCancel} disabled={submitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            loading={submitting}
            variant="filled"
            color="dark"
          >
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
