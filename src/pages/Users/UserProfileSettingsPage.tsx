import { Button, Card, Divider, Flex, Group, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi2";

import TitleText from "@/components/TitleText";
import { ModalConfirm } from "@/components/Elements/Modals";
import {
  beautify,
  useSetContainerSize,
  useSetNoSidebar,
} from "@/utils/helpers";
import usePost from "@/utils/usePost";
import { useAuth } from "@/utils/AuthContext";
import useGet from "@/utils/useGet";
import {
  SocialMediaLinksForm,
  UpdateProfileForm,
} from "@/components/Forms/UpdateProfileForm";
import { FaLock, FaPencil } from "react-icons/fa6";
import { FaLockOpen } from "react-icons/fa";
import { SOCIAL_LINKS_DATA } from "@/utils/constants";

const UserProfileSettingsPage = () => {
  const { user } = useAuth();

  const [refresh, setRefresh] = useState<number>(0);
  const { getData: getUser, data: userData } = useGet();

  useSetNoSidebar();
  useSetContainerSize("md");

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

  const { uploadData: updateProfile } = usePost();

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
      url: value as string,
    })) || [];

  return (
    <Stack gap={30} mt="md">
      {/* Social Links */}
      <Stack gap={0}>
        <TitleText>Social Media Links</TitleText>
        {links.length > 0 ? (
          <SocialMediaLinksTable links={links} />
        ) : (
          <Text className="subtext">Add your social media profiles here.</Text>
        )}
        <Flex justify="flex-end" mt="md">
          <Button
            variant="outline"
            onClick={() => setSocialModal(true)}
            leftSection={links.length > 0 ? <FaPencil /> : <HiPlus />}
          >
            {links.length > 0 ? "Update Links" : "Add Links"}
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
                leftSection={<FaPencil />}
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
              refresh={() => setRefresh((prev) => prev + 1)}
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
            size="xl"
            showFooterActions={false}
            onConfirm={() => {}}
          >
            <SocialMediaLinksForm
              user={user}
              onCancel={() => setSocialModal(false)}
              refresh={() => setRefresh((prev) => prev + 1)}
            />
          </ModalConfirm>
        </Card>
      </Stack>
    </Stack>
  );
};

const SocialMediaLinksTable = ({
  links,
}: {
  links: { platform: string; url: string }[];
}) => {
  return (
    <Card withBorder radius="md" p="lg">
      <Stack gap="md">
        {links.map((link, index) => {
          const platform = SOCIAL_LINKS_DATA.find(
            (p) => p.value === link.platform,
          );
          const IconComponent = platform?.icon;

          return (
            <Group
              key={index}
              justify="space-between"
              align="center"
              p="sm"
              style={{
                border: "1px solid #f1f3f5",
                borderRadius: "8px",
                backgroundColor: "light-dark(white, gray.300)",
              }}
            >
              <Group gap="md" align="center">
                {IconComponent && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "32px",
                      height: "32px",
                      borderRadius: "6px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #e9ecef",
                    }}
                  >
                    <IconComponent size={18} color={platform?.color} />
                  </div>
                )}
                <Text fw={600} size="sm" c="light-dark(dark, #e9ecef)">
                  {beautify(link.platform)}
                </Text>
              </Group>
              <Text
                size="sm"
                c="dark.8"
                style={{
                  flex: 1,
                  textAlign: "right",
                  fontFamily: "monospace",
                }}
              >
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: "light-dark(#1a1a1a, #e9ecef)",
                    transition: "all 0.2s ease",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = "underline";
                    e.currentTarget.style.color =
                      "light-dark(#0066cc, #e9ecef)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = "none";
                    e.currentTarget.style.color =
                      "light-dark(#1a1a1a, #e9ecef)";
                  }}
                >
                  {link.url}
                </a>
              </Text>
            </Group>
          );
        })}
      </Stack>
    </Card>
  );
};
