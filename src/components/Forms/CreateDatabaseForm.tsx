import { Loader, Button, Group, Paper, Select, Stack } from "@mantine/core";
import React, { useEffect } from "react";
import TitleText from "../TitleText";
import usePost from "@/utils/usePost";
import useForm from "@/hooks/generic/useForm";
import { DATABASE_FLAVOURS } from "@/utils/constants";
import { DATABASE_API_URL } from "@/config";

const CreateDatabaseForm = (props: any) => {
  const { showTitle = true, database, project_id, onCancel, refresh } = props;
  const { form, updateFormValue, editedForm } = useForm();
  const {
    uploadData,
    submitting,
    error,
    success,
    data: database_data,
  } = usePost();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadData({
      api: `${DATABASE_API_URL}/databases`,
      params: {
        ...form,
        project_id,
      },
      isExternal: true,
    });
  };

  useEffect(() => {
    if (success && database_data) {
      if (onCancel) {
        onCancel();
      }
      if (refresh) {
        refresh();
      }
    }
  }, [success, database_data]);

  return (
    <div>
      {showTitle && <TitleText>Create new Database</TitleText>}
      <Paper p="lg" pt="xs" radius="md">
        <form onSubmit={handleSubmit}>
          <Stack>
            <Select
              label="Database Type"
              name="database_flavour_name"
              required
              value={form.database_flavour_name as string}
              onChange={(value) =>
                updateFormValue("database_flavour_name", value)
              }
              error={error?.database_flavour_name}
              data={DATABASE_FLAVOURS}
            />
            <Group justify="space-between">
              {onCancel && (
                <Button variant="default" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button
                variant="filled"
                color={database ? "blue" : "gray.9"}
                type="submit"
                leftSection={submitting ? <Loader size="xs" /> : null}
                disabled={
                  submitting ||
                  (database?.id && Object.keys(editedForm).length <= 0)
                }
              >
                {database ? "Update Database" : "Create Database"}
              </Button>
            </Group>
          </Stack>
        </form>
      </Paper>
    </div>
  );
};

export default CreateDatabaseForm;
