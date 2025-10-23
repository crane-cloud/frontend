import { Anchor, Button, Card, Group, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { ProfileAvatar } from "../Common";
import { User } from "@/types/user";
import usePost from "@/utils/usePost";
import { API_USERS } from "@/utils/apis";
import { FiCheck, FiUserPlus } from "react-icons/fi";
import { beautify } from "@/utils/helpers";

const UserCard = ({
  user,
  isCard = false,
}: {
  user: User;
  isCard: boolean;
  showBorder: boolean;
}) => {
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

  // Handle follow success
  useEffect(() => {
    if (follow_success && follow_response) {
      setIsFollowingUser(true);
    }
  }, [follow_success, follow_response]);

  // Handle unfollow success
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
      followUser({
        api: `${API_USERS}/${userId}/following`,
      });
    }
  };

  const isLoading = following || unfollowing;

  const content = (
    <>
      <Group mb={4} align="flex-start">
        <ProfileAvatar user={user} size={40} />
        <div style={{ flex: 1 }}>
          <Group justify="space-between" align="flex-start" mb={2}>
            <div style={{ flex: 1 }}>
              <Anchor
                href={`/${user.username}`}
                size="sm"
                fw={500}
                style={{
                  lineHeight: 1.2,
                  textDecoration: "none",
                  display: "block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = "none";
                }}
              >
                {beautify(user.name)}
              </Anchor>
              <Text size="xs" c="dimmed" mb={4}>
                @{user.username}
              </Text>
            </div>
            <Button
              variant="outline"
              size="xs"
              color="blue"
              leftSection={
                isFollowingUser ? (
                  <FiCheck size={14} />
                ) : (
                  <FiUserPlus size={14} />
                )
              }
              onClick={() => onFollowClick(user.id)}
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading
                ? isFollowingUser
                  ? "Unfollowing..."
                  : "Following..."
                : isFollowingUser
                  ? "Following"
                  : "Follow"}
            </Button>
          </Group>
        </div>
      </Group>
    </>
  );

  if (isCard) {
    return (
      <Card style={{ padding: "8px 0" }} withBorder radius="md" p="md">
        {content}
      </Card>
    );
  }
  return <div style={{ padding: "8px 0" }}>{content}</div>;
};

export default UserCard;
