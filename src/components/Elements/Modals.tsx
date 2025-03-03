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
  } = props;
  return (
    <Modal opened={opened} onClose={onClose} title={title}>
      <Divider pb="md" />
      <Text size="sm" mb="md">
        {children}
      </Text>

      {showFooterActions && (
        <Group justify="flex-end">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button
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
