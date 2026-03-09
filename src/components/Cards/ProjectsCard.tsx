import { useEffect, useState } from "react";
import {
  Anchor,
  Tooltip,
  Card,
  Group,
  Text,
  Divider,
  Modal,
  Button,
  Badge,
} from "@mantine/core";
import { HiLockClosed } from "react-icons/hi2";
import { RiBookLine } from "react-icons/ri";
import { GoClock } from "react-icons/go";
import { LiaUserSolid } from "react-icons/lia";
import usePost from "@/utils/usePost";
import { API_PROJECTS } from "@/utils/apis";
import { Link, useNavigate } from "react-router-dom";
import { formatAgo, formatPlural } from "@/utils/helpers";
import { FiLayers } from "react-icons/fi";

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
      p="sm"
      radius="lg"
      withBorder
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
      {...props}
    >
      {/* --- HEADER --- */}
      <Group justify="space-between" align="flex-start" wrap="nowrap" mb="xs">
        <Group gap="xs" wrap="nowrap" style={{ flex: 1, minWidth: 0 }}>
          {project.disabled ? (
            <HiLockClosed size={18} color="var(--mantine-color-dimmed)" />
          ) : (
            <RiBookLine size={18} color="var(--mantine-color-dimmed)" />
          )}

          <Anchor
            component={invitePending ? "button" : (Link as any)}
            to={!invitePending ? `/projects/${project.id}` : undefined}
            onClick={invitePending ? () => setShowInviteModal(true) : undefined}
            fw={600}
            size="md"
            lineClamp={1} // Replaces manual textOverflow/whiteSpace styles
            style={{
              textDecoration: "none",
              color: "inherit",
              textAlign: "left",
              flex: 1,
            }}
          >
            {project.name}
          </Anchor>
        </Group>

        {invitePending && (
          <Tooltip label="Click to respond" withArrow>
            <Badge
              color="blue"
              variant="light"
              style={{ cursor: "pointer", flexShrink: 0 }}
              onClick={() => setShowInviteModal(true)}
            >
              Pending Invite
            </Badge>
          </Tooltip>
        )}
      </Group>
      {/* --- BODY --- */}
      <Text c="dimmed" size="sm" lineClamp={2} style={{ flexGrow: 1 }} mb="sm">
        {project.description || "No description provided."}
      </Text>
      {/* --- TAGS --- */}
      {project.tags?.length > 0 && (
        <Group gap="xs" mb="sm">
          {project.tags.map((tag: any) => (
            <Badge key={tag.id} size="sm" variant="light" radius="xl">
              {tag.name}
            </Badge>
          ))}
        </Group>
      )}
      {/* --- FOOTER METRICS --- */}
      <Divider mb="sm" mx="-sm" />{" "}
      {/* mx="-sm" makes divider stretch edge-to-edge */}
      <Group gap="lg" justify="flex-start">
        <Tooltip label="Number of applications" withArrow>
          <Group gap={4} wrap="nowrap" style={{ cursor: "default" }}>
            <FiLayers size={14} color="var(--mantine-color-dimmed)" />
            <Text size="xs" c="dimmed">
              {formatPlural(project.apps_count, "app")}
            </Text>
          </Group>
        </Tooltip>

        <Tooltip label="Members" withArrow>
          <Group gap={4} wrap="nowrap" style={{ cursor: "default" }}>
            <LiaUserSolid size={15} color="var(--mantine-color-dimmed)" />
            <Text size="xs" c="dimmed">
              {formatPlural(project.members_count, "member")}
            </Text>
          </Group>
        </Tooltip>

        <Tooltip label="Age of project" withArrow>
          <Group gap={4} wrap="nowrap" style={{ cursor: "default" }}>
            <GoClock size={13} color="var(--mantine-color-dimmed)" />
            <Text size="xs" c="dimmed">
              {formatAgo(project.age)}
            </Text>
          </Group>
        </Tooltip>
      </Group>
      {/* --- MODAL --- */}
      <Modal
        opened={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        title="Project Invitation"
        centered
      >
        <Text>
          You have been invited to collaborate on <b>{project.name}</b>.
        </Text>
        <Group mt="xl" justify="flex-end">
          <Button
            color="red"
            variant="subtle"
            onClick={handleDecline}
            loading={decliningInvitation}
          >
            Decline
          </Button>
          <Button onClick={handleAccept} loading={acceptingInvitation}>
            Accept
          </Button>
        </Group>
      </Modal>
    </Card>
  );
};

export default ProjectsCard;
