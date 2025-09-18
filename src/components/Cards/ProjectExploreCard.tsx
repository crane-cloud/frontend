import { API_PROJECTS } from "@/utils/apis";
import { beautify, formatPlural } from "@/utils/helpers";
import usePost from "@/utils/usePost";
import {
  Card,
  Group,
  Anchor,
  Button,
  Loader,
  Badge,
  Divider,
  Text,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { FiCheck, FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProjectExploreCard = ({project}) => {
  const [isFollowingProject, setIsFollowingProject] = useState(
    project?.is_following,
  );
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
  useEffect(() => {
    if (follow_success && follow_response) {
      setIsFollowingProject(true);
    }
  }, [follow_success, follow_response]);
  // Handle unfollow success
  useEffect(() => {
    if (unfollow_success && unfollow_response) {
      setIsFollowingProject(false);
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
  const isFollowLoading = following || unfollowing;
  return (
    <Card
      key={project.id}
      p="md"
      withBorder
      radius="lg"
      style={{
        flex: "1 1 350px",
        maxWidth: "380px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ flex: 1 }}>
        <Group justify="space-between" mb="xs">
          <Group>
            <div>
              <Anchor
                component={Link}
                to={project.link || "#"}
                fw={600}
                style={{ textDecoration: "none" }}
              >
                {beautify(project?.name)}
              </Anchor>
              {/* <Text size="xs" c="dimmed">
                                by {project.owner_id}
                              </Text> */}
            </div>
          </Group>
          <Group gap="sm">
            <Button
              variant="outline"
              size="xs"
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
            </Button>
          </Group>
        </Group>
        <Text size="sm" c="dimmed" mb={4}>
          {beautify(project.description)}
        </Text>
        <Group gap={4} mt={4} mb={4}>
          {project?.tags?.map((tag) => (
            <Badge key={tag.id} size="xs" color="blue" variant="light">
              {tag.name}
            </Badge>
          ))}
        </Group>
      </div>
      <div>
        <Divider color="gray.3" style={{ width: "100%" }} />
        <Group gap="lg" mt={2}>
          <Text size="sm" c="dimmed">
            {formatPlural(project.members_count, "member")}
          </Text>
          <Text size="sm" c="dimmed">
            {formatPlural(project.followers_count, "follower")}
          </Text>
          <Text size="sm" c="dimmed">
            {formatPlural(project.apps_count, "app")}
          </Text>
        </Group>
      </div>
    </Card>
  );
};

export default ProjectExploreCard;
