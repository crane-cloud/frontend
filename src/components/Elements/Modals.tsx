import { Button, Text, Group, Divider, Modal } from "@mantine/core";

type TModalConfirm = {
  opened: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onConfirm: () => void;
  loading?: boolean;
  leftSection?: React.ReactNode;
  buttonText?: string;
  buttonColor?: string;
  showFooterActions?: boolean;
  size?: string;
};

export const ModalConfirm = (props: TModalConfirm) => {
  const {
    opened,
    onClose,
    title,
    children,
    onConfirm,
    loading,
    leftSection,
    buttonText,
    buttonColor,
    showFooterActions = true,
    size = "md",
  } = props;
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      size={size}
      padding="md"
      centered
      radius="md"
    >
      <Divider pb="md" />
      <Text size="sm" mb="md">
        {children}
      </Text>

      {showFooterActions && (
        <Group justify="flex-end">
          <Button radius="xl" variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button
            radius="xl"
            color={buttonColor || "blue"}
            variant="filled"
            onClick={onConfirm}
            loading={loading || false}
            leftSection={leftSection}
          >
            {buttonText || "Submit"}
          </Button>
        </Group>
      )}
    </Modal>
  );
};
