import { API_PROJECTS } from "@/utils/apis";
import { beautify } from "@/utils/helpers";
import usePost from "@/utils/usePost";
import {
  Card,
  Group,
  Anchor,
  Button,
  Loader,
  Badge,
  Text,
  Box,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { FiCheck, FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

interface ProjectTag {
  id: number | string;
  name: string;
}

interface Project {
  id: number | string;
  name: string;
  description: string;
  link?: string;
  is_following?: boolean;
  owner_id?: number | string;
  tags?: ProjectTag[];
  members_count: number;
  followers_count: number;
  apps_count: number;
}

interface ProjectExploreCardProps {
  project: Project;
}

const ProjectExploreCard = ({ project }: ProjectExploreCardProps) => {
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
      p="sm"
      withBorder
      radius="md"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Group
        justify="space-between"
        align="flex-start"
        wrap="nowrap"
        mb="xs"
        gap="sm"
      >
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Anchor
            component={Link}
            to={`/explore/${project?.id}`}
            fw={600}
            size="md"
            lineClamp={2}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "block",
            }}
          >
            {beautify(project?.name) || "Untitled Project"}
          </Anchor>
        </Box>

        <Button
          variant="outline"
          size="xs"
          radius="md"
          onClick={onFollowClick}
          style={{ flexShrink: 0 }}
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

      <Text size="sm" c="dimmed" lineClamp={2} style={{ flexGrow: 1 }}>
        {beautify(project.description)}
      </Text>

      <Group gap="xs" mt="sm">
        {project?.tags?.slice(0, 4).map((tag) => (
          <Badge
            fw={900}
            key={tag.id}
            size="sm"
            color="blue"
            variant="light"
            radius="xl"
            tt="capitalize"
            style={{ maxWidth: "100%" }}
          >
            <Text size="xs" truncate="end" lineClamp={1}>
              {tag.name}
            </Text>
          </Badge>
        ))}
      </Group>
    </Card>
  );
};

export default ProjectExploreCard;
