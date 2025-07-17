import React, { useEffect, useState } from "react";
import {
  ActionIcon,
  Anchor,
  Tooltip,
  Card,
  Flex,
  Group,
  Text,
  Divider,
  Stack,
  Pill,
  Modal,
  Button,
} from "@mantine/core";
import { HiLockClosed } from "react-icons/hi2";
import { RiBookLine } from "react-icons/ri";
import { GoClock } from "react-icons/go";
import { LiaUserSolid } from "react-icons/lia";
import { IoPersonAddOutline, IoRocketOutline } from "react-icons/io5";
import usePost from "@/utils/usePost";
import { API_PROJECTS } from "@/utils/apis";
import { useNavigate } from "react-router-dom";
import { formatAgo, formatPlural } from "@/utils/helpers";

export type ProjectUserRecord = {
  user: {
    id: string;
    email: string;
    name: string;
  };
  accepted_collaboration_invite: boolean;
  id: string;
  project_id: string;
  role: "RolesList.owner" | "RolesList.member" | "RolesList.admin";
};

const ProjectsCard = (props: any) => {
  const { project } = props;
  const navigate = useNavigate();

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [currentUserRecord, setCurrentUserRecord] = useState<Pick<
    ProjectUserRecord,
    "accepted_collaboration_invite"
  > | null>(null);

  const {
    uploadData: acceptInvitation,
    submitting: acceptingInvitation,
    success: invitationAccepted,
  } = usePost();

  const {
    uploadData: declineInvitation,
    submitting: decliningInvitation,
    success: invitationDeclined,
  } = usePost();

  const handleAccept = () => {
    acceptInvitation({
      api: `${API_PROJECTS}/${project?.id}/users/handle_invite`,
      method: "PATCH",
      params: {
        accepted_collaboration_invite: true,
      },
    });
  };

  const handleDecline = () => {
    declineInvitation({
      api: `${API_PROJECTS}/${project?.id}/users/handle_invite`,
      method: "PATCH",
      params: {
        accepted_collaboration_invite: false,
      },
    });
  };

  useEffect(() => {
    if (project?.is_invited) {
      setCurrentUserRecord({ accepted_collaboration_invite: false });
    } else {
      setCurrentUserRecord({ accepted_collaboration_invite: true });
    }
  }, [project?.is_invited]);

  useEffect(() => {
    if (invitationAccepted) {
      setShowInviteModal(false);
      navigate(`/projects/${project.id}`);
    }
  }, [invitationAccepted]);

  useEffect(() => {
    if (invitationDeclined) {
      setShowInviteModal(false);
      window.location.reload();
    }
  }, [invitationDeclined]);

  const invitePending =
    currentUserRecord?.accepted_collaboration_invite === false;

  return (
    <Card
      p="md"
      radius="md"
      withBorder
      {...props}
      style={{ position: "relative" }}
    >
      {invitePending && (
        <Tooltip label="Membership pending" withArrow>
          <IoPersonAddOutline
            color="#228be6"
            size={24}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 2,
              cursor: "pointer",
            }}
            onClick={() => setShowInviteModal(true)}
          />
        </Tooltip>
      )}

      <Modal
        opened={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        title="Project Invitation"
        centered
      >
        <Text>
          You have been invited to collaborate on <b>{project.name}</b>.
        </Text>
        <Group mt="md">
          <Button
            color="red"
            variant="outline"
            onClick={handleDecline}
            loading={decliningInvitation}
            disabled={decliningInvitation}
          >
            Decline
          </Button>
          <Button
            onClick={handleAccept}
            loading={acceptingInvitation}
            disabled={acceptingInvitation}
          >
            Accept
          </Button>
        </Group>
      </Modal>

      <Stack gap={10} justify="space-between" h="100%">
        <Stack gap={7}>
          <Group justify="space-between" wrap="nowrap">
            <Flex gap={10} align="center" justify="start">
              {project.disabled ? (
                <HiLockClosed size={16} color="theme.black" />
              ) : (
                <RiBookLine size={16} color="theme.black" />
              )}
              {invitePending ? (
                <Anchor
                  c="blue"
                  size="1rem"
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowInviteModal(true)}
                >
                  {project.name}
                </Anchor>
              ) : (
                <Anchor
                  c="blue"
                  size="1rem"
                  href={`/projects/${project.id}`}
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {project.name}
                </Anchor>
              )}
            </Flex>
          </Group>

          <Text c="theme.gray" truncate size="sm">
            {project.description}
          </Text>
          {project.tags.length > 0 && (
            <Stack gap="5">
              <Divider my="xs" />
              <Flex gap="xs">
                {project.tags.map((tag: any) => (
                  <Pill key={tag.id} size="xs" fw={500}>
                    {tag.name}
                  </Pill>
                ))}
              </Flex>
            </Stack>
          )}
        </Stack>

        <Flex gap={8} align="center" justify="start">
          <Tooltip label="Number of applications" withArrow>
            <ActionIcon
              variant="transparent"
              color="theme.dark"
              w="fit-content"
            >
              <Flex gap={2} align="center" justify="center" wrap="nowrap">
                <IoRocketOutline
                  size={14}
                  color="var(--mantine-color-dimmed)"
                />
                <Text size="sm" c="dimmed" className="no-wrap">
                  {formatPlural(project.apps_count, "app")}
                </Text>
              </Flex>
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Members" withArrow>
            <ActionIcon
              variant="transparent"
              color="theme.dark"
              w="fit-content"
            >
              <Flex gap={2} align="center" justify="center" wrap="nowrap">
                <LiaUserSolid size={15} color="var(--mantine-color-dimmed)" />
                <Text size="sm" c="dimmed" className="no-wrap">
                  {formatPlural(project?.members_count, "member")}
                </Text>
              </Flex>
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Age of project" withArrow>
            <ActionIcon
              variant="transparent"
              color="theme.dark"
              w="fit-content"
            >
              <Flex gap={2} align="center" justify="center" wrap="nowrap">
                <GoClock size={13} color="var(--mantine-color-dimmed)" />
                <Text size="sm" c="dimmed" className="no-wrap">
                  {formatAgo(project.age)}
                </Text>
              </Flex>
            </ActionIcon>
          </Tooltip>
        </Flex>
      </Stack>
    </Card>
  );
};

export default ProjectsCard;
