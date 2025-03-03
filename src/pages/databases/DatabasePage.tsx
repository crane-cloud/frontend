import { ModalConfirm } from "@/components/Elements/Modals";
import CreateDatabaseForm from "@/components/Forms/CreateDatabaseForm";
import DatabaseList from "@/components/Lists/databaseList";
import TitleText from "@/components/TitleText";
import { useGetProject } from "@/utils/helpers";
import { Button, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useParams } from "react-router-dom";

const DatabasePage = () => {
  const { project_id } = useParams();
  const [refresh, setRefresh] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  useGetProject(project_id || "");

  return (
    <Stack>
      <TitleText
        loading={false}
        rightSection={
          <Button leftSection={<GoPlus />} onClick={open}>
            Add Database
          </Button>
        }
      >
        Databases
      </TitleText>
      <DatabaseList project_id={project_id} refresh={refresh} />
      <ModalConfirm
        opened={opened}
        onClose={close}
        title="Create Database"
        buttonText="Create"
        onConfirm={() => {}}
        showFooterActions={false}
      >
        <CreateDatabaseForm
          showTitle={false}
          onCancel={close}
          project_id={project_id}
          refresh={() => setRefresh(true)}
        />
      </ModalConfirm>
    </Stack>
  );
};

export default DatabasePage;
