import { useState } from "react";
import { Stack, Center, Group, Card, Title, Text, Button } from "@mantine/core";
import { GuestHeader } from "@/components/Header";
import { GuestFooter } from "@/components/Footer";
import { MdCheckCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { CreateNewPasswordForm } from "@/components/Forms/CreateNewPasswordForm";

const CreateNewPassword: React.FC = () => {
  const [resetSuccess, setResetSuccess] = useState(false);

  return (
    <Stack justify="space-between" h="100vh">
      <GuestHeader />
      <Group justify="center">
        {!resetSuccess ? (
          <CreateNewPasswordForm onSuccess={() => setResetSuccess(true)} />
        ) : (
          <Center>
            <Card
              shadow="md"
              padding="lg"
              radius="md"
              withBorder
              maw={400}
              w="100%"
            >
              <Stack align="center" my="md">
                <MdCheckCircle size={64} color="green" />
                <Title order={3} ta="center">
                  Password Reset Successful
                </Title>
                <Text ta="center" c="dimmed" size="sm">
                  You've successfully created a new password.
                  <br />
                  Please log in to use it.
                </Text>
                <Button component={Link} to="/" variant="filled" fullWidth>
                  Go to Login
                </Button>
              </Stack>
            </Card>
          </Center>
        )}
      </Group>
      <GuestFooter />
    </Stack>
  );
};

export default CreateNewPassword;
