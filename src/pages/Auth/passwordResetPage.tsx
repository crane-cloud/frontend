// import React, { useEffect, useState } from "react";
// import {
//   Stack,
//   Title,
//   Text,
//   PasswordInput,
//   Button,
//   Loader,
//   Paper,
//   Center,
//   Group,
//   Card,
//   Progress,
//   Alert,
// } from "@mantine/core";
// import { Link, useParams } from "react-router-dom";
// import { API_USERS } from "@/utils/apis";
// import { GuestHeader } from "@/components/Header";
// import { GuestFooter } from "@/components/Footer";
// import { MdCheckCircle, MdErrorOutline } from "react-icons/md";
// import usePost from "@/utils/usePost";
// import { getPasswordStrength, PasswordStrength, strengthColorMap, strengthValueMap } from "@/utils/helpers";

// const CreateNewPassword: React.FC = () => {
//   const { token } = useParams();

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [strength, setStrength] = useState<PasswordStrength>('weak');

//   const { uploadData: resetUserPassword, submitting, success: resetPasswordSuccess } = usePost(); 

//   useEffect(() => {
//     setStrength(getPasswordStrength(password));
//   }, [password]);

//   const handleSubmit = async () => {
//     if (!password || !confirmPassword) {
//       setError("Please enter all fields");
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     resetUserPassword({
//         api: `${API_USERS}/reset_password/${token}`,
//         params: { password },
//         successMessage: "Password reset successful",
//         errorMessage: "Failed to reset user password",
//     })
//   };
  
//   return (
//     <Stack justify="space-between" h="100vh">
//         <GuestHeader />
//             <Group justify="center">
//                 {!resetPasswordSuccess ? (
//                     <Paper p="xl" radius="md" withBorder>
//                         <Stack justify="center" mt="lg">
//                             <Title order={2}>Create New Password</Title>
//                             <Text size="sm" c="dimmed">
//                             Create a new and strong password
//                             </Text>

//                             <PasswordInput
//                             label="Password"
//                             value={password}
//                             onChange={(e) => {
//                             setPassword(e.currentTarget.value);
//                             if (error) setError("");
//                             }}
//                             required
//                             />

//                             {password && (
//                                 <>
//                                     <Progress
//                                     value={strengthValueMap[strength]}
//                                     color={strengthColorMap[strength]}
//                                     radius="xl"
//                                     size="sm"
//                                     />
                                        
//                                     <Text size="sm" c={strengthColorMap[strength]}>
//                                     {strength.toUpperCase()} password
//                                     </Text>
//                                 </>
//                             )}

//                             <PasswordInput
//                             label="Confirm Password"
//                             placeholder="Repeat password"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.currentTarget.value)}
//                             required
//                             error={
//                                 confirmPassword && confirmPassword !== password
//                                 ? 'Passwords do not match'
//                                 : undefined
//                             }
//                             />

//                             {error && (
//                                 <Alert icon={<MdErrorOutline size={20} />} color="red">
//                                     {error}
//                                 </Alert>
//                             )}

//                             <Button onClick={handleSubmit} disabled={submitting || strength !== "strong"} fullWidth>
//                                 {submitting ? <Loader size="xs" /> : "Reset Password"}
//                             </Button>
//                         </Stack>
//                     </Paper>
//                 ) : (
//                 <Center>
//                     <Card shadow="md" padding="lg" radius="md" withBorder maw={400} w="100%">
//                         <Stack align="center" my="md">
//                             <MdCheckCircle size={64} color="green" />
//                             <Title order={3} ta="center">
//                                 Password Reset Successful
//                             </Title>
//                             <Text ta="center" c="dimmed" size="sm">
//                                 You've successfully created a new password.
//                                 <br />
//                                 Please log in to use it.
//                             </Text>
//                             <Button
//                                 component={Link}
//                                 to="/"
//                                 variant="filled"
//                                 fullWidth
//                             >
//                                 Go to Login
//                             </Button>
//                         </Stack>
//                     </Card>
//                 </Center>
//                 )}
//             </Group>
//         <GuestFooter />
//     </Stack>
//   );
// };

// export default CreateNewPassword;

// CreateNewPassword.tsx
import { useState } from "react";
import {
  Stack,
  Center,
  Group,
  Card,
  Title,
  Text,
  Button,
} from "@mantine/core";
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
            <Card shadow="md" padding="lg" radius="md" withBorder maw={400} w="100%">
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
