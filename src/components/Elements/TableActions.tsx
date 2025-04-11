import { ActionIcon } from "@mantine/core";
import { DropdownMenu } from "./elements";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { GoDot } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import usePost from "@/utils/usePost";
import { useEffect, useState } from "react";
import { ModalConfirm } from "./Modals";
import { HiTrash } from "react-icons/hi2";
import { returnObject } from "@/utils/helpers";

type TActionProps = {
  label: string;
  to?: string;
  icon?: any;
  onClick?: () => void;
  params?: any;
};
type TFormActionsProps = {
  actions: TActionProps[];
};

export const TableActions = ({ actions }: TFormActionsProps) => {
  const navigate = useNavigate();
  const { uploadData, submitting, success } = usePost();
  const [deleteConfirmOpened, setDeleteConfirmOpened] = useState(false);

  const [deleteAction, setDeleteAction] = useState<TActionProps | null>(null);

  const handleDelete = () => {
    uploadData({
      api: deleteAction?.to || "",
      method: "DELETE",
      ...returnObject(deleteAction?.params, deleteAction?.params),
      successMessage: "Deleted successfully",
      errorMessage: "Failed to delete",
    });
  };

  useEffect(() => {
    if (success) {
      window.location.reload();
    }
  }, [success]);

  const newActions = actions.map((action) => ({
    label: action.label,
    icon: action?.icon || <GoDot />,
    onClick: action?.onClick
      ? action?.onClick
      : action.label === "Delete"
        ? () => {
            setDeleteConfirmOpened(true);
            setDeleteAction(action);
          }
        : () => {
            navigate(action?.to || "");
          },
  }));
  return (
    <div>
      <DropdownMenu items={newActions} offset={3} withArrow>
        <ActionIcon size="sm" variant="transparent" color="theme.black">
          <HiOutlineDotsVertical />
        </ActionIcon>
      </DropdownMenu>
      <ModalConfirm
        opened={deleteConfirmOpened}
        onClose={() => setDeleteConfirmOpened(false)}
        title="Delete"
        buttonColor="red"
        buttonText="Delete"
        onConfirm={handleDelete}
        loading={submitting}
        leftSection={<HiTrash />}
      >
        Are you sure you want to delete ?
      </ModalConfirm>
    </div>
  );
};
