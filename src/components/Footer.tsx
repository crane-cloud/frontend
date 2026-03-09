import { Box, Group, Text, Anchor } from "@mantine/core";

export const GuestFooter = () => {
  return (
    <Box py="md" mt="xl">
      <Group justify="space-between" px="xl">
        <Text c="dimmed" size="xs">
          © {new Date().getFullYear()} Crane Cloud. All rights reserved.
        </Text>
        <Group gap="md">
          <Anchor
            href="https://cranecloud.io/privacy-policy"
            size="xs"
            c="dimmed"
          >
            Privacy Policy
          </Anchor>
          <Anchor
            href="https://cranecloud.io/terms-of-service"
            size="xs"
            c="dimmed"
          >
            Terms of Service
          </Anchor>
          <Anchor href="https://cranecloud.io/contact" size="xs" c="dimmed">
            Contact Support
          </Anchor>
        </Group>
      </Group>
    </Box>
  );
};
