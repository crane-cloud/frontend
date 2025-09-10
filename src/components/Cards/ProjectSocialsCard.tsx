import { Project, ProjectTag } from "@/types/project";
import { API_PROJECTS } from "@/utils/apis";
import { useAuth } from "@/utils/AuthContext";
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

  const isProjectOwner = useMemo(() => {
    if (!user?.id || !project?.owner_id) {
      return false;
    }
    return user.id === project?.owner_id;
  }, [user?.id, project?.owner_id]);

  // Follow/Unfollow functionality
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

  // Pin/Unpin functionality
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

  // Handle pin success
  useEffect(() => {
    if (pin_success && pin_response) {
      setIsPinnedProject(true);
      setMenuOpened(false);
      refreshUserProjects();
    }
  }, [pin_success, pin_response]);

  // Handle unpin success
  useEffect(() => {
    if (unpin_success && unpin_response) {
      setIsPinnedProject(false);
      setMenuOpened(false);
      refreshUserProjects();
    }
  }, [unpin_success, unpin_response]);

  // Handle follow success
  useEffect(() => {
    if (follow_success && follow_response) {
      setIsFollowingProject(true);
      setMenuOpened(false);
      refreshUserProjects();
    }
  }, [follow_success, follow_response]);

  // Handle unfollow success
  useEffect(() => {
    if (unfollow_success && unfollow_response) {
      setIsFollowingProject(false);
      setMenuOpened(false);
      refreshUserProjects();
    }
  }, [unfollow_success, unfollow_response]);

  // Handle follow/unfollow click
  const onFollowClick = () => {
    if (isFollowingProject) {
      unfollowProject({
        api: `${API_PROJECTS}/${project?.id}/following`,
        method: "DELETE",
      });
    } else {
      followProject({
        api: `${API_PROJECTS}/${project?.id}/following`,
      });
    }
  };

  // Handle pin/unpin click
  const onPinClick = (projectID: string, isPinned: boolean) => {
    if (isPinned) {
      unpinProject({
        api: `${API_PROJECTS}/${projectID}/pin`,
        method: "DELETE",
      });
    } else {
      pinProject({
        api: `${API_PROJECTS}/${projectID}/pin`,
      });
    }
  };

  const isFollowLoading = following || unfollowing;
  const isPinLoading = pinningProject || unpinningProject;

  return (
    <>
      <Card key={project.id} withBorder radius="md" p="md">
        <Group justify="space-between" mb="sm">
          <Text fw={600} lineClamp={1}>
            {project?.name}
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
                aria-label="Options"
                onClick={() => setMenuOpened((o) => !o)}
              >
                <FiMoreVertical size={15} />
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
                </>
              )}

              {!isPinnedProject && (
                <>
                  <Divider />

                  {isProjectOwner && (
                    <Menu.Item
                      onClick={() => {}}
                      leftSection={
                        project.is_public ? (
                          <FiEyeOff size={14} />
                        ) : (
                          <FiEye size={14} />
                        )
                      }
                    >
                      {project.is_public ? "Make Private" : "Make Public"}
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

        <Text
          size="sm"
          c="dimmed"
          mb="md"
          lineClamp={2}
          style={{
            height: "2.4em",
            lineHeight: "1.2em",
          }}
        >
          {project.description}
        </Text>

        <Group justify="space-between" align="flex-end">
          <Group gap="sm">
            {project?.tags &&
              project.tags.map((tag: ProjectTag) => (
                <Badge
                  key={tag.id}
                  size="sm"
                  color="blue"
                  variant="light"
                  component={Link}
                  to={`/tags/${tag.name}`}
                  style={{ cursor: "pointer" }}
                >
                  {tag.name}
                </Badge>
              ))}
          </Group>
        </Group>
      </Card>
    </>
  );
}
