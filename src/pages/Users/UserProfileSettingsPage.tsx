import {
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useState, useContext } from "react";
import { HiPencil, HiPlus } from "react-icons/hi2";

import TitleText from "@/components/TitleText";
import { ModalConfirm } from "@/components/Elements/Modals";
import { beautify } from "@/utils/helpers";
import usePost from "@/utils/usePost";
import { MenuContext } from "@/components/Layouts/DashboardLayout";
import { useAuth } from "@/utils/AuthContext";
import useGet from "@/utils/useGet";
import { UpdateProfileForm } from "@/components/Forms/UpdateProfileForm";
import { FaLock } from "react-icons/fa6";
import { FaLockOpen } from "react-icons/fa";

const UserProfileSettingsPage = () => {
  const { user } = useAuth();
  const [refresh, setRefresh] = useState<number>(0);
  const { getData: getUser, data: userData } = useGet();
  const { setContainerSize } = useContext(MenuContext);

  useEffect(() => {
    setContainerSize("md");
    return () => setContainerSize("xl");
  }, [setContainerSize]);

  useEffect(() => {
    if (user) {
      getUser({ api: `/users/${user.id}` });
    }
  }, []);

  useEffect(() => {
    if (user?.id) {
      getUser({ api: `/users/${user.id}` });
    }
  }, [user?.id, refresh]);

  return (
    <div>
      <SocialLinksTab user={userData?.data?.user} setRefresh={setRefresh} />
    </div>
  );
};

export default UserProfileSettingsPage;

const SocialLinksTab = ({
  user,
  setRefresh,
}: {
  user: any;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [userSocialLinks, setUserSocialLinks] = useState<
    { platform: string; url: string }[]
  >([]);
  const [socialModal, setSocialModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [visibility, setVisibility] = useState(true);
  const [makePrivateConfirmOpened, setMakePrivateConfirmOpened] =
    useState(false);
  const [makePublicConfirmOpened, setMakePublicConfirmOpened] = useState(false);

  useEffect(() => {
    if (user?.is_public !== undefined) {
      setVisibility(user.is_public);
    }
  }, [user]);

  const {
    uploadData: updateProfile,
    submitting: saving,
    success: savedSuccess,
  } = usePost();

  useEffect(() => {
    if (savedSuccess) {
      setSocialModal(false);
      setRefresh((prev) => prev + 1);
    }
  }, [savedSuccess]);

  const submitSocialLinks = () => {
    const socialLinks = userSocialLinks.reduce(
      (acc, link) => {
        if (link.platform && link.url) {
          acc[link.platform] = link.url;
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    updateProfile({
      api: "users",
      id: user.id,
      method: "PATCH",
      params: { social_links: socialLinks },
    });
    setSocialModal(false);
  };

  const refreshProfile = () => {
    setRefresh((prev) => prev + 1);
  };

  const handleMakePrivate = () => {
    updateProfile({
      api: "users",
      id: user.id,
      method: "PATCH",
      params: { is_public: false },
    });
    setMakePrivateConfirmOpened(false);
    refreshProfile();
  };

  const handleMakePublic = () => {
    updateProfile({
      api: "users",
      id: user.id,
      method: "PATCH",
      params: { is_public: true },
    });
    setMakePublicConfirmOpened(false);
    refreshProfile();
  };

  const socialLinks = user?.social_links || {};
  const links =
    Object.entries(socialLinks).map(([key, value]) => ({
      platform: key,
      url: value,
    })) || [];

  useEffect(() => {
    setUserSocialLinks(links as { platform: string; url: string }[]);
  }, [user]);

  return (
    <Stack gap={30}>
      {/* Social Links */}
      <Stack gap={0}>
        <TitleText>Social Media Links</TitleText>
        {userSocialLinks.length > 0 ? (
          <SocialMediaLinksTable links={userSocialLinks} />
        ) : (
          <Text className="subtext">Add your social media profiles here.</Text>
        )}
        <Flex justify="flex-end" mt="md">
          <Button
            variant="outline"
            onClick={() => setSocialModal(true)}
            leftSection={userSocialLinks.length > 0 ? <HiPencil /> : <HiPlus />}
          >
            {userSocialLinks.length > 0 ? "Update Links" : "Add Links"}
          </Button>
        </Flex>
      </Stack>

      {/* User Profile */}
      <Stack gap={0}>
        <TitleText>Manage Profile</TitleText>
        <Card p="lg" radius="md" withBorder>
          <Stack gap={10} mt="md">
            <Group justify="space-between" align="center">
              <Stack gap={0}>
                <Text className="title">Toggle Profile Visibility</Text>
                <Text className="subtext">
                  Make your profile {user?.is_public ? "private" : "public"}.
                </Text>
              </Stack>
              {/* Visibility Toggle */}
              <Stack gap={10} mt="md">
                <Group justify="space-between" align="center">
                  <Stack gap={0} />
                  {visibility ? (
                    <Button
                      variant="outline"
                      color="black"
                      onClick={() => setMakePrivateConfirmOpened(true)}
                      leftSection={<FaLock />}
                    >
                      Private
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      color="green"
                      onClick={() => setMakePublicConfirmOpened(true)}
                      leftSection={<FaLockOpen />}
                    >
                      Public
                    </Button>
                  )}
                </Group>
              </Stack>
            </Group>
          </Stack>
          <Divider my="md" />
          <Stack gap={10}>
            <Group justify="space-between">
              <Stack gap={0}>
                <Text className="title">Update profile</Text>
                <Text className="subtext">
                  Modify the profile name and description
                </Text>
              </Stack>
              <Button
                variant="outline"
                onClick={() => setUpdateModal(true)}
                leftSection={<HiPencil />}
              >
                Update
              </Button>
            </Group>
          </Stack>

          {/* Modals */}
          <ModalConfirm
            opened={updateModal}
            onClose={() => setUpdateModal(false)}
            title="Update Profile Information"
            buttonText="Update"
            size="xl"
            showFooterActions={false}
            onConfirm={() => {}}
          >
            <UpdateProfileForm
              user={user}
              onCancel={() => setUpdateModal(false)}
              onSuccess={() => {
                setUpdateModal(false);
                setRefresh((prev) => prev + 1);
              }}
            />
          </ModalConfirm>

          <ModalConfirm
            opened={makePrivateConfirmOpened}
            onClose={() => setMakePrivateConfirmOpened(false)}
            title="Make Profile Private"
            buttonText="Confirm"
            buttonColor="black"
            onConfirm={handleMakePrivate}
            leftSection={<FaLock />}
          >
            Are you sure you want to make your profile <b>private</b>? It will
            no longer be publicly visible.
          </ModalConfirm>

          <ModalConfirm
            opened={makePublicConfirmOpened}
            onClose={() => setMakePublicConfirmOpened(false)}
            title="Make Profile Public"
            buttonText="Confirm"
            buttonColor="green"
            onConfirm={handleMakePublic}
            leftSection={<FaLockOpen />}
          >
            Are you sure you want to make your profile <b>public</b>? It will be
            visible to everyone.
          </ModalConfirm>

          <ModalConfirm
            opened={socialModal}
            onClose={() => setSocialModal(false)}
            title="Social Media Links"
            buttonText="Save Links"
            size="xl"
            onConfirm={submitSocialLinks}
          >
            <SocialMediaLinksForm
              links={userSocialLinks}
              setLinks={setUserSocialLinks}
              loading={saving}
            />
          </ModalConfirm>
        </Card>
      </Stack>
    </Stack>
  );
};

const SocialMediaLinksForm = ({
  links = [],
  setLinks,
  loading,
}: {
  links: { platform: string; url: string }[];
  setLinks: (val: any) => void;
  loading: boolean;
}) => {
  const handleChange = (index: number, field: string, value: string) => {
    const newLinks = [...links];
    if (field === "url") {
      // Ensure URL starts with http:// or https://
      if (
        value &&
        !value.startsWith("http://") &&
        !value.startsWith("https://")
      ) {
        const newValue = `https://${value}`;
        (newLinks[index] as any)[field] = newValue;
      }
    }
    (newLinks[index] as any)[field] = value;
    setLinks(newLinks);
  };

  const addLink = () => {
    setLinks([...links, { platform: "", url: "" }]);
  };

  const removeLink = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  return (
    <Stack>
      {links?.map((link, index) => (
        <Group key={index} grow align="center" gap="md">
          <TextInput
            label="Platform"
            placeholder="e.g. Twitter"
            value={link.platform}
            onChange={(e) => handleChange(index, "platform", e.target.value)}
          />
          <TextInput
            label="URL"
            placeholder="https://twitter.com/yourhandle"
            value={link.url}
            onChange={(e) => handleChange(index, "url", e.target.value)}
          />
          <Button
            color="red"
            variant="light"
            mt="lg"
            onClick={() => removeLink(index)}
          >
            Remove
          </Button>
        </Group>
      ))}
      <Button variant="outline" onClick={addLink} loading={loading}>
        Add Social Media Link
      </Button>
    </Stack>
  );
};

const SocialMediaLinksTable = ({
  links,
}: {
  links: { platform: string; url: string }[];
}) => {
  return (
    <Card withBorder>
      <Stack>
        {links.map((link, index) => (
          <Flex key={index} justify="space-between">
            <Text fw={500}>{beautify(link.platform)}</Text>
            <Text size="sm" color="blue">
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.url}
              </a>
            </Text>
          </Flex>
        ))}
      </Stack>
    </Card>
  );
};
