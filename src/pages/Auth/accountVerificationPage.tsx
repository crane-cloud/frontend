import { GuestFooter } from "@/components/Footer";
import { GuestHeader } from "@/components/Header";
import { API_USERS } from "@/utils/apis";
import useGet from "@/utils/useGet";
import usePost from "@/utils/usePost";
import {
  Button,
  Card,
  Center,
  Group,
  Loader,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { MdCheckCircle, MdError } from "react-icons/md";
import { Link, useParams } from "react-router-dom";

const AccountVerification: React.FC = () => {
  const { token } = useParams();

  const [email, setEmail] = useState("");
  const [showErrorBlock, setShowErrorBlock] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showSuccessBlock, setShowSuccessBlock] = useState(false);

  const {
    getData: completeVerification,
    loading: isVerifyingAccount,
    success: verificationSuccess,
    error: verificationError,
  } = useGet();

  const {
    uploadData: resendVerificationLink,
    submitting: isResending,
    success: verificationResentSuccess,
  } = usePost();

  useEffect(() => {
    if (token) {
      completeVerification({
        api: `${API_USERS}/verify/${token}`,
        showNotifications: true,
      });
    }
  }, [token]);

  useEffect(() => {
    if (verificationSuccess) {
      setShowSuccessBlock(true);
    } else if (verificationError) {
      setShowErrorBlock(true);
    }
  }, [verificationSuccess, verificationError]);

  useEffect(() => {
    if (verificationResentSuccess) {
      setShowEmailInput(false);
    }
  }, [verificationResentSuccess]);

  const handleResend = (email: string) => {
    resendVerificationLink({
      api: `${API_USERS}/verify`,
      params: { email },
      successMessage: "Email verification link sent",
      errorMessage: "Failed to send email verification link",
    });
  };

  return (
    <Stack justify="space-between" h="100vh">
      <GuestHeader />
      <Group justify="center">
        {isVerifyingAccount ? (
          <Center style={{ height: 200 }}>
            <Loader size="lg" variant="dots" />
          </Center>
        ) : (
          <Center>
            {showSuccessBlock ? (
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
                    Account Verification Successful
                  </Title>
                  <Text ta="center" c="dimmed" size="sm">
                    You've successfully verified your account.
                    <br />
                    Please log in to access it.
                  </Text>
                  <Button component={Link} to="/" variant="filled" fullWidth>
                    Go to Login
                  </Button>
                </Stack>
              </Card>
            ) : showErrorBlock ? (
              <Card
                shadow="md"
                padding="lg"
                radius="md"
                withBorder
                maw={400}
                w="100%"
              >
                <Stack align="center" my="md">
                  <MdError size={64} color="red" />
                  <Title order={3} ta="center">
                    Verification Failed
                  </Title>
                  <Text ta="center" c="dimmed" size="sm">
                    The verification link is invalid or has expired.
                    <br />
                    Please request a new verification email.
                  </Text>

                  <Stack w="100%" align="center" gap="xs">
                    {!showEmailInput && (
                      <>
                        <Button
                          variant="light"
                          onClick={() => setShowEmailInput(true)}
                          style={{
                            width: showEmailInput ? "60%" : "100%",
                            transition: "width 0.3s ease",
                          }}
                        >
                          Resend Verification
                        </Button>
                        <Button
                          component={Link}
                          to="/"
                          variant="filled"
                          fullWidth
                        >
                          Go to Login
                        </Button>
                      </>
                    )}

                    {showEmailInput && (
                      <Stack
                        w="100%"
                        gap="xs"
                        style={{ animation: "slideDown 0.3s ease" }}
                      >
                        <TextInput
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.currentTarget.value)}
                          required
                          w="100%"
                        />
                        <Button fullWidth onClick={() => handleResend(email)}>
                          {isResending ? (
                            <Loader size="xs" />
                          ) : (
                            "Send Verification Email"
                          )}
                        </Button>
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              </Card>
            ) : null}
          </Center>
        )}
      </Group>
      <GuestFooter />
    </Stack>
  );
};

export default AccountVerification;
