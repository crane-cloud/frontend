import { Project, ProjectTag } from "@/types/project";
import { API_PROJECTS } from "@/utils/apis";
import { useAuth } from "@/utils/AuthContext";
import { beautify } from "@/utils/helpers";
import usePost from "@/utils/usePost";
import {
  ActionIcon,
  Badge,
  Card,
  Divider,
  Group,
  Loader,
  Menu,
  Text,
  Box,
} from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { FaRegCircle } from "react-icons/fa";
import {
  FiBookmark,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiMoreVertical,
  FiUserPlus,
} from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ProjectSocialsCard({
  project,
  refreshUserProjects,
}: {
  project: Project;
  refreshUserProjects: () => void;
}) {
  const { user } = useAuth();

  const [menuOpened, setMenuOpened] = useState(false);
  const [isPinnedProject, setIsPinnedProject] = useState(project?.is_pinned);
  const [isFollowingProject, setIsFollowingProject] = useState(
    project?.is_following,
  );
  const [isPublicProject, setIsPrivateProject] = useState(project?.is_public);

  const isProjectOwner = useMemo(() => {
    if (!user?.id || !project?.owner_id) {
      return false;
    }
    return user.id === project?.owner_id;
  }, [user?.id, project?.owner_id]);

  const {
    uploadData: followProject,
    submitting: following,
    success: follow_success,
    data: follow_response,
  } = usePost();
  const {
    uploadData: unfollowProject,
    submitting: unfollowing,
    success: unfollow_success,
    data: unfollow_response,
  } = usePost();
  const {
    uploadData: pinProject,
    submitting: pinningProject,
    success: pin_success,
    data: pin_response,
  } = usePost();
  const {
    uploadData: unpinProject,
    submitting: unpinningProject,
    success: unpin_success,
    data: unpin_response,
  } = usePost();
  const {
    uploadData: makePublicProject,
    submitting: makingProjectPublic,
    success: public_success,
    data: public_response,
  } = usePost();

  useEffect(() => {
    if (pin_success && pin_response) {
      setIsPinnedProject(true);
      setMenuOpened(false);
      refreshUserProjects();
    }
  }, [pin_success, pin_response]);
  useEffect(() => {
    if (unpin_success && unpin_response) {
      setIsPinnedProject(false);
      setMenuOpened(false);
      refreshUserProjects();
    }
  }, [unpin_success, unpin_response]);
  useEffect(() => {
    if (follow_success && follow_response) {
      setIsFollowingProject(true);
      setMenuOpened(false);
      refreshUserProjects();
    }
  }, [follow_success, follow_response]);
  useEffect(() => {
    if (unfollow_success && unfollow_response) {
      setIsFollowingProject(false);
      setMenuOpened(false);
      refreshUserProjects();
    }
  }, [unfollow_success, unfollow_response]);
  useEffect(() => {
    if (public_success && public_response) {
      setIsPrivateProject(public_response.is_public);
      setMenuOpened(false);
      refreshUserProjects();
    }
  }, [public_success, public_response]);

  const onFollowClick = () => {
    if (isFollowingProject) {
      unfollowProject({
        api: `${API_PROJECTS}/${project?.id}/following`,
        method: "DELETE",
      });
    } else {
      followProject({ api: `${API_PROJECTS}/${project?.id}/following` });
    }
  };

  const onPinClick = (projectID: string, isPinned: boolean) => {
    if (isPinned) {
      unpinProject({
        api: `${API_PROJECTS}/${projectID}/pin`,
        method: "DELETE",
      });
    } else {
      pinProject({ api: `${API_PROJECTS}/${projectID}/pin` });
    }
  };

  const onMakePrivateClick = (projectID: string, currentStatus: boolean) => {
    makePublicProject({
      api: `${API_PROJECTS}/${projectID}`,
      method: "PATCH",
      params: { is_public: !currentStatus },
    });
  };

  const isFollowLoading = following || unfollowing;
  const isPinLoading = pinningProject || unpinningProject;
  const isPrivateLoading = makingProjectPublic;

  return (
    <Card
      key={project.id}
      withBorder
      radius="md"
      p="sm"
      shadow="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box style={{ flex: 1 }}>
        <Group justify="space-between" align="flex-start" wrap="nowrap" mb="sm">
          <Text fw={700} size="lg" lineClamp={1}>
            {beautify(project?.name)}
          </Text>

          <Menu
            shadow="md"
            width={200}
            position="bottom-end"
            closeOnItemClick={false}
            opened={menuOpened}
            onChange={setMenuOpened}
          >
            <Menu.Target>
              <ActionIcon
                variant="subtle"
                color="blue"
                aria-label="Options"
                onClick={() => setMenuOpened((o) => !o)}
              >
                <FiMoreVertical size={18} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              {isProjectOwner && (
                <>
                  <Menu.Item
                    onClick={() => onPinClick(project.id, isPinnedProject)}
                    leftSection={
                      isPinLoading ? (
                        <Loader size="xs" />
                      ) : isPinnedProject ? (
                        <FaRegCircle size={14} />
                      ) : (
                        <FiBookmark size={14} />
                      )
                    }
                    disabled={isPinLoading}
                  >
                    {isPinLoading
                      ? isPinnedProject
                        ? "Unpinning Project.."
                        : "Pinning Project.."
                      : isPinnedProject
                        ? "Unpin"
                        : "Pin"}
                  </Menu.Item>
                  <Divider />
                </>
              )}

              {!isPinnedProject && (
                <>
                  {isProjectOwner && (
                    <Menu.Item
                      onClick={() =>
                        onMakePrivateClick(project.id, isPublicProject)
                      }
                      leftSection={
                        isPrivateLoading ? (
                          <Loader size="xs" />
                        ) : isPublicProject ? (
                          <FiEyeOff size={14} />
                        ) : (
                          <FiEye size={14} />
                        )
                      }
                      disabled={isPrivateLoading}
                    >
                      {isPrivateLoading
                        ? isPublicProject
                          ? "Making Private.."
                          : "Making Public.."
                        : isPublicProject
                          ? "Make Private"
                          : "Make Public"}
                    </Menu.Item>
                  )}

                  {!isProjectOwner && (
                    <>
                      <Divider />
                      <Menu.Item
                        onClick={onFollowClick}
                        leftSection={
                          isFollowLoading ? (
                            <Loader size="xs" />
                          ) : isFollowingProject ? (
                            <FiCheck size={14} />
                          ) : (
                            <FiUserPlus size={14} />
                          )
                        }
                        disabled={isFollowLoading}
                      >
                        {isFollowLoading
                          ? isFollowingProject
                            ? "Unfollowing..."
                            : "Following..."
                          : isFollowingProject
                            ? "Following"
                            : "Follow"}
                      </Menu.Item>
                    </>
                  )}
                </>
              )}
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Text size="sm" c="dimmed" mb="xl" lineClamp={2}>
          {beautify(project.description) || "No description provided."}
        </Text>
      </Box>

      <Group justify="space-between" align="center" mt="auto" wrap="nowrap">
        <Group gap="xs" style={{ flex: 1, overflow: "hidden" }} wrap="nowrap">
          {project?.tags &&
            project.tags.slice(0, 3).map((tag: ProjectTag) => (
              <Badge
                key={tag.id}
                size="sm"
                radius="xl"
                color="blue"
                variant="light"
                tt="uppercase"
                component={Link}
                to={`/tags/${tag.name}`}
                style={{ cursor: "pointer" }}
              >
                {tag.name}
              </Badge>
            ))}

          {project?.tags && project.tags.length > 3 && (
            <Menu shadow="md" width={200} position="bottom-start">
              <Menu.Target>
                <Badge
                  size="sm"
                  radius="xl"
                  color="blue"
                  variant="light"
                  style={{ cursor: "pointer" }}
                >
                  +{project.tags.length - 3}
                </Badge>
              </Menu.Target>

              <Menu.Dropdown>
                {project.tags.slice(3).map((tag: ProjectTag) => (
                  <Menu.Item
                    key={tag.id}
                    component={Link}
                    to={`/tags/${tag.name}`}
                  >
                    {tag.name}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          )}
        </Group>

        <Badge
          size="sm"
          radius="xl"
          color={isPublicProject ? "green" : "gray"}
          variant="light"
          tt="capitalize"
        >
          {isPublicProject ? "Public" : "Private"}
        </Badge>
      </Group>
    </Card>
  );
}
