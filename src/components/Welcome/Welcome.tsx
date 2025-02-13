import { Text, Title } from "@mantine/core";
import classes from "./Welcome.module.css";

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Welcome to{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "blue", to: "indigo" }}
        >
          Cranecloud
        </Text>
      </Title>
      <Text
        c="dimmed"
        ta="center"
        size="xl"
        maw={580}
        mx="auto"
        mt="md"
        variant="gradient"
        gradient={{ from: "red", to: "indigo" }}
      >
        Cranecloud is a platform for managing your business.
      </Text>
    </>
  );
}
