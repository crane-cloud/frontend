import { Anchor, Button, Card, Group, Text, Box } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { ProfileAvatar } from "../Common";
import { User } from "@/types/user";
import usePost from "@/utils/usePost";
import { API_USERS } from "@/utils/apis";
import { FiCheck, FiUserPlus } from "react-icons/fi";
import { beautify } from "@/utils/helpers";
import { useAuth } from "@/utils/AuthContext";

const UserCard = ({
  user,
  isCard = false,
  showBorder = false,
}: {
  user: User;
  isCard?: boolean;
  showBorder?: boolean;
}) => {
  const { user: currentUser } = useAuth();
  const isCurrentUser = currentUser?.id === user.id;

  const {
    uploadData: followUser,
    submitting: following,
    success: follow_success,
    data: follow_response,
  } = usePost();

  const {
    uploadData: unfollowUser,
    submitting: unfollowing,
    success: unfollow_success,
    data: unfollow_response,
  } = usePost();

  const [isFollowingUser, setIsFollowingUser] = useState(user?.is_following);

  useEffect(() => {
    setIsFollowingUser(user?.is_following);
  }, [user?.is_following]);

  useEffect(() => {
    if (follow_success && follow_response) {
      setIsFollowingUser(true);
    }
  }, [follow_success, follow_response]);

  useEffect(() => {
    if (unfollow_success && unfollow_response) {
      setIsFollowingUser(false);
    }
  }, [unfollow_success, unfollow_response]);

  const onFollowClick = (userId: string) => {
    if (isFollowingUser) {
      unfollowUser({
        api: `${API_USERS}/${userId}/following`,
        method: "DELETE",
      });
    } else {
      followUser({ api: `${API_USERS}/${userId}/following` });
    }
  };

  const isLoading = following || unfollowing;

  const content = (
    <Group wrap="nowrap" align="center" gap="sm">
      <ProfileAvatar user={user} size={40} />

      <Box style={{ flex: 1, minWidth: 0 }}>
        <Anchor
          href={`/${user.username}`}
          size="sm"
          fw={500}
          truncate="end"
          style={{
            lineHeight: 1.2,
            textDecoration: "none",
            display: "block",
            marginBottom: "2px",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.textDecoration = "underline")
          }
          onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          {beautify(user.name)}
        </Anchor>
        <Text size="xs" c="dimmed" truncate="end">
          @{user.username}
        </Text>
      </Box>

      {!isCurrentUser && (
        <Button
          variant="outline"
          size="xs"
          radius="md"
          color="blue"
          leftSection={
            isFollowingUser ? <FiCheck size={14} /> : <FiUserPlus size={14} />
          }
          onClick={() => onFollowClick(user.id)}
          loading={isLoading}
          disabled={isLoading}
          style={{ flexShrink: 0 }}
        >
          {isLoading
            ? isFollowingUser
              ? "Unfollowing..."
              : "Following..."
            : isFollowingUser
              ? "Following"
              : "Follow"}
        </Button>
      )}
    </Group>
  );

  if (isCard) {
    return (
      <Card
        withBorder={showBorder}
        radius="md"
        p="md"
        style={{ height: "100%", display: "flex", justifyContent: "center" }}
      >
        {content}
      </Card>
    );
  }

  return <div style={{ padding: "8px 0" }}>{content}</div>;
};

export default UserCard;
