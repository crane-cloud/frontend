import {
  Button,
  Stack,
  TextInput,
  Textarea,
  Group,
  ActionIcon,
  Select,
} from "@mantine/core";
import { useEffect, useState } from "react";
import usePost from "@/utils/usePost";
import useForm from "@/hooks/generic/useForm";
import { FaCheck, FaPlus, FaTrashAlt } from "react-icons/fa";
import { SOCIAL_LINKS_DATA } from "@/utils/constants";

type UpdateProfileForm = {
  user: any;
  onCancel: () => void;
  refresh?: () => void;
};

export const UpdateProfileForm = ({
  user,
  onCancel,
  refresh = () => {},
}: UpdateProfileForm) => {
  const { form, onChange, updateFormValues, editedForm } = useForm();

  const { uploadData, submitting, success } = usePost();

  useEffect(() => {
    if (user) {
      updateFormValues({
        username: user?.username || "",
        email: user?.email || "",
        biography: user?.biography || "",
        organisation: user?.organisation || "",
      });
    }
  }, []);

  useEffect(() => {
    if (success) {
      refresh();
      onCancel();
    }
  }, [success]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      return;
    }

    uploadData({
      api: "users",
      id: user.id,
      method: "PATCH",
      params: user?.id ? editedForm : form,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={15}>
        <TextInput
          label="Username"
          placeholder="Enter your username"
          description="This will be your public username. Do not use spaces or special characters."
          name="username"
          value={form.username as string}
          onChange={onChange}
          required
        />

        <TextInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          name="email"
          value={form.email as string}
          onChange={onChange}
          disabled
          required
        />

        <TextInput
          label="Organisation"
          placeholder="Your organisation or company"
          name="organisation"
          value={form.organisation as string}
          onChange={onChange}
          required
        />

        <Textarea
          label="Biography"
          placeholder="Tell us about yourself"
          name="biography"
          value={form.biography as string}
          onChange={onChange}
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
            disabled={user?.id && Object.keys(editedForm).length <= 0}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export const SocialMediaLinksForm = ({
  user,
  onCancel,
  refresh = () => {},
}: {
  user: any;
  onCancel: () => void;
  refresh?: () => void;
}) => {
  const { uploadData, submitting, success } = usePost();

  const [socialLinks, setSocialLinks] = useState<
    { platform: string; url: string }[]
  >([]);

  useEffect(() => {
    if (user) {
      const socialLinks = user?.social_links || {};
      const links =
        Object.entries(socialLinks).map(([key, value]) => ({
          platform: key,
          url: value as string,
        })) || [];
      setSocialLinks(links);
    }
  }, [user]);

  useEffect(() => {
    if (success) {
      refresh();
      onCancel();
    }
  }, [success]);

  const handleChange = (index: number, field: string, value: string) => {
    const newLinks = [...socialLinks];
    if (field === "url") {
      // Ensure URL starts with http:// or https://
      if (
        value &&
        !value.startsWith("http://") &&
        !value.startsWith("https://")
      ) {
        const newValue = `https://${value}`;
        (newLinks[index] as any)[field] = newValue;
      } else {
        (newLinks[index] as any)[field] = value;
      }
    } else {
      (newLinks[index] as any)[field] = value;
    }
    setSocialLinks(newLinks);
  };

  const addLink = () => {
    setSocialLinks([...socialLinks, { platform: "", url: "" }]);
  };

  const removeLink = (index: number) => {
    const newLinks = [...socialLinks];
    newLinks.splice(index, 1);
    setSocialLinks(newLinks);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      return;
    }

    const socialLinksData = socialLinks.reduce(
      (acc, link) => {
        if (link.platform && link.url) {
          acc[link.platform] = link.url;
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    uploadData({
      api: "users",
      id: user.id,
      method: "PATCH",
      params: { social_links: socialLinksData },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={10}>
        {socialLinks?.map((link, index) => (
          <Group key={index} align="center" gap="md">
            <Select
              label="Platform"
              placeholder="e.g. Twitter"
              value={link.platform}
              onChange={(e) => handleChange(index, "platform", e || "")}
              data={SOCIAL_LINKS_DATA}
              leftSection={
                link.platform
                  ? (() => {
                      const platform = SOCIAL_LINKS_DATA.find(
                        (p) => p.value === link.platform,
                      );
                      const IconComponent = platform?.icon;
                      return IconComponent ? (
                        <IconComponent size={16} color={platform?.color} />
                      ) : undefined;
                    })()
                  : undefined
              }
              renderOption={({ option, checked }) => {
                const platform = SOCIAL_LINKS_DATA.find(
                  (p) => p.value === option.value,
                );
                const IconComponent = platform?.icon;

                return (
                  <Group flex="1" gap="xs">
                    {IconComponent && (
                      <IconComponent size={16} color={platform?.color} />
                    )}
                    <span>{option.label}</span>
                    {checked && <FaCheck size={14} color="#228BE6" />}
                  </Group>
                );
              }}
              required
            />
            <TextInput
              label="URL"
              placeholder="https://twitter.com/yourhandle"
              value={link.url}
              onChange={(e) => handleChange(index, "url", e.target.value)}
              flex="1"
              required
            />
            <ActionIcon
              color="red"
              variant="filled"
              aria-label="Delete"
              mt="lg"
              size="2.2rem"
              onClick={() => removeLink(index)}
            >
              <FaTrashAlt />
            </ActionIcon>
          </Group>
        ))}
        <Button
          variant="outline"
          onClick={addLink}
          disabled={submitting}
          leftSection={<FaPlus />}
        >
          Add New Link
        </Button>

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
            Save Links
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
