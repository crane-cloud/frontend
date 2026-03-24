import { Button, Container, Image, Stack, Text } from "@mantine/core";
import notFoundImage from "../../assets/images/not-found.svg";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Stack justify="center" align="center">
      <Image src={notFoundImage} maw={400} />
      <Text
        variant="gradient"
        gradient={{ from: "red", to: "orange" }}
        fw={900}
        size="2rem"
      >
        Opps! Nothing to see here
      </Text>
      <Text c="dimmed" size="lg" maw={500} ta="center">
        Page you are trying to open does not exist. <br /> You may have mistyped
        the address, or the page has been moved to another URL. If you think
        this is an error contact support.
      </Text>
      <Button
        variant="solid"
        size="md"
        leftSection={<FaArrowLeft />}
        onClick={() => navigate("/")}
      >
        Take me back to home page
      </Button>
    </Stack>
  );
};
