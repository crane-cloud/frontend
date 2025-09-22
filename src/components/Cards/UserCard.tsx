import { Anchor, Button, Card, Group, Skeleton, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { ProfileAvatar } from "../Common";
import { User } from "@/types/user";
import useGet from "@/utils/useGet";
import usePost from "@/utils/usePost";
import { API_USERS } from "@/utils/apis";
import { FiCheck, FiUserPlus } from "react-icons/fi";

const UserCard = ({
  user,
  isCard = false,
  showBorder = false,
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
  const {
    data: userResponse,
    getData: getUserDetails,
    loading,
    success,
  } = useGet();

  const [isFollowingUser, setIsFollowingUser] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Fetch user details
  useEffect(() => {
    getUserDetails({ api: `${API_USERS}/${user.id}` });
  }, [user.id]);

  // User data loading
  useEffect(() => {
    if (success && userResponse?.data) {
      setIsFollowingUser(
        userResponse.data.user?.requesting_user_follows || false,
      );
      setInitialLoading(false);
    }
  }, [success, userResponse]);

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

  // skeleton while initial data is loading
  if (initialLoading || loading) {
    return <UserCardSkeleton />;
  }

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
                {user.name}
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
          <Text size="xs" c="dimmed" mb={4} style={{ lineHeight: 1.3 }}>
            {user.biography}
          </Text>
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
  } else {
    return <div style={{ padding: "8px 0" }}>{content}</div>;
  }
};

// User card loading state
const UserCardSkeleton = () => {
  return (
    <div style={{ padding: "8px 0" }}>
      <Group mb={4} align="flex-start">
        <Skeleton height={40} circle />
        <div style={{ flex: 1 }}>
          <Group justify="space-between" align="flex-start" mb={2}>
            <div style={{ flex: 1 }}>
              <Skeleton height={16} width="60%" mb={4} />
              <Skeleton height={12} width="40%" mb={4} />
            </div>
            <Skeleton height={24} width={70} />
          </Group>
          <Skeleton height={12} width="80%" mb={2} />
          <Skeleton height={12} width="60%" />
        </div>
      </Group>
    </div>
  );
};

export default UserCard;
