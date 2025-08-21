import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import {
  Anchor,
  Breadcrumbs,
  CopyButton,
  Flex,
  Text,
  Tooltip,
  Menu,
  FloatingPosition,
  Button,
  Group,
  Avatar,
  Stack,
  useCombobox,
  Combobox,
  InputBase,
  Input,
} from "@mantine/core";
import { TbCopy } from "react-icons/tb";
import { ReactNode, useContext, useEffect, useState } from "react";
import { PiFlask } from "react-icons/pi";
import { GoDatabase } from "react-icons/go";
import { RiRobot2Line } from "react-icons/ri";
import { ModalConfirm } from "@/components/Elements/Modals";
import {
  DeployAppModalForm,
  DeployNotebookForm,
} from "@/components/Forms/CreateAppForm";
import { IoIosArrowDown } from "react-icons/io";
import { returnObject } from "@/utils/helpers";
import useGet from "@/utils/useGet";
import { MenuContext } from "../Layouts/DashboardLayout";
import { FiLayers } from "react-icons/fi";

export const LinkWithText = styled(Link)`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  color: inherit;
  gap: 5px;
  font-size: inherit;
  .text-link-icon {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
  &:hover .text-link-icon {
    opacity: 1;
  }
  &:hover a {
    text-decoration: underline !important;
    color: inherit !important;
  }
`;

export const NoWrap = styled(Text)`
  white-space: nowrap;
  font-size: inherit;
` as typeof Text;

interface TCopyAreaButtonProps {
  value: string;
  label?: string;
  showIcon?: boolean;
}

export const CopyAreaButton = ({
  value,
  label,
  showIcon = false,
}: TCopyAreaButtonProps) => {
  return (
    <CopyButton value={value}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? "Copied" : "Copy"} withArrow>
          <Text
            onClick={copy}
            className="no-wrap"
            size="sm"
            style={{ cursor: "pointer" }}
          >
            <Flex align="center" gap={5}>
              {showIcon && <TbCopy size={16} />}
              {label || value}
            </Flex>
          </Text>
        </Tooltip>
      )}
    </CopyButton>
  );
};

interface TBreadCrumbProps {
  items: { title: string; link: string }[];
}

export const BreadCrumb = ({ items }: TBreadCrumbProps) => {
  const anchorItems = items.map((item, index) => {
    if (index === items.length - 1) {
      return (
        <Text size="sm" c="theme.gray.8" key={index}>
          {item.title}
        </Text>
      );
    }
    return (
      <Anchor href={item?.link} key={index} size="sm">
        {item.title}
      </Anchor>
    );
  });
  return <Breadcrumbs>{anchorItems}</Breadcrumbs>;
};

interface MenuItem {
  label: string;
  icon: ReactNode;
  onClick: () => void;
}

interface DropdownMenuProps {
  items: MenuItem[];
  children: ReactNode;
  position?: FloatingPosition;
  offset?: number;
  withArrow?: boolean;
  [key: string]: any;
}

export const DropdownMenu = (props: DropdownMenuProps) => {
  const {
    items,
    children,
    position = "bottom-end",
    offset,
    withArrow,
    ...rest
  } = props;
  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      position={position}
      offset={offset}
      withArrow={withArrow}
      {...rest}
    >
      <Menu.Target>{children}</Menu.Target>
      <Menu.Dropdown>
        {items.map((item) => (
          <Menu.Item
            key={item.label}
            leftSection={item.icon}
            onClick={item.onClick}
            miw={130}
            style={{ fontSize: "14px" }}
          >
            {item.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export const AddServiceButton = ({
  project,
  setRefresh,
  dontShowDatabase = false,
  title = "Add Service",
}: {
  project: any;
  setRefresh: (value: boolean) => void;
  dontShowDatabase?: boolean;
  title?: string;
}) => {
  const { project_id } = useParams();
  const navigate = useNavigate();
  const [trainModalOpened, setTrainModalOpened] = useState(false);
  const [deployAppModalOpened, setDeployAppModalOpened] = useState(false);
  const supportsMl = project?.supports_ml;
  const menuItems = [
    {
      label: "Deploy Application",
      icon: <FiLayers />,
      onClick: () => navigate(`/projects/${project_id}/apps/create`),
    },
    ...returnObject(!dontShowDatabase, [
      {
        label: "Spin Up a Database",
        icon: <GoDatabase />,
        onClick: () => navigate(`/projects/${project_id}/databases`),
      },
    ]),
    ...returnObject(supportsMl, [
      {
        label: "Train a Model",
        icon: <PiFlask />,
        onClick: () => setTrainModalOpened(true),
      },

      {
        label: "Deploy a Trained Model",
        icon: <RiRobot2Line />,
        onClick: () => setDeployAppModalOpened(true),
      },
    ]),
  ];

  return (
    <div>
      <Menu transitionProps={{ transition: "pop-top-right" }}>
        <Menu.Target>
          <Button rightSection={<IoIosArrowDown />} size="sm">
            {title}
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          {menuItems.map((item) => (
            <Menu.Item
              key={item.label}
              leftSection={item.icon}
              onClick={item.onClick}
            >
              {item.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
      <ModalConfirm
        opened={trainModalOpened}
        onClose={() => setTrainModalOpened(false)}
        title="Train a Model"
        buttonText="Train"
        onConfirm={() => {}}
        size="xl"
        showFooterActions={false}
      >
        <DeployNotebookForm
          project={project}
          showTitle={false}
          onCancel={() => setTrainModalOpened(false)}
          refresh={() => setRefresh(true)}
        />
      </ModalConfirm>
      <ModalConfirm
        opened={deployAppModalOpened}
        onClose={() => setDeployAppModalOpened(false)}
        title="Deploy a Trained Model"
        buttonText="Deploy"
        onConfirm={() => {}}
        size="xl"
        showFooterActions={false}
      >
        <DeployAppModalForm
          project={project}
          showTitle={false}
          onCancel={() => setDeployAppModalOpened(false)}
          refresh={() => setRefresh(true)}
        />
      </ModalConfirm>
    </div>
  );
};

interface Item {
  value: string;
  label?: string;
  description: string;
}

const groceries: Item[] = [
  { value: "Apples", description: "Crisp and refreshing fruit" },
  {
    value: "Bananas",
    description: "Naturally sweet and potassium-rich fruit",
  },
  {
    value: "Broccoli",
    description: "Nutrient-packed green vegetable",
  },
  {
    value: "Carrots",
    description: "Crunchy and vitamin-rich root vegetable",
  },
  {
    value: "Chocolate",
    description: "Indulgent and decadent treat",
  },
];

function SelectOption({ value, description, label }: Item) {
  return (
    <Group wrap="nowrap" gap="xs">
      <Avatar name={label || value} color="initials" radius="md" />
      <Stack gap={0} justify="space-between">
        <Text fz="sm" fw={700}>
          {label || value}
        </Text>
        <Text fz="xs" opacity={0.6} fw={600} lineClamp={1}>
          {description}
        </Text>
      </Stack>
    </Group>
  );
}

export function CustomSelect({
  options = groceries,
  loading = false,
  defaultValue,
  onChange,
}: {
  options: any[];
  loading: boolean;
  defaultValue: string;
  onChange: (value: string) => void;
}) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<Item | null>(null);
  useEffect(() => {
    setSelectedOption(
      options.find(
        (item) => item.value === value || item.value === defaultValue,
      ),
    );
  }, [value, defaultValue, options, loading]);

  const optionsList = options.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      <SelectOption {...item} />
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setValue(val);
        onChange(val);
        combobox.closeDropdown();
      }}
      zIndex={2000}
      shadow="md"
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          multiline
        >
          {selectedOption ? (
            <SelectOption {...selectedOption} />
          ) : (
            <Input.Placeholder>Pick value</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{optionsList}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export function SelectProject({ project_id }: { project_id?: string }) {
  const { project } = useContext(MenuContext);
  const [currentProject, setCurrentProject] = useState<any>(project);
  const { data: projectsData, getData, loading, success } = useGet();
  const [optionsList, setOptionsList] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    getData({
      api: "/projects",
    });
  }, []);

  useEffect(() => {
    if (success) {
      setOptionsList(
        projectsData?.data?.projects.map((project: any) => ({
          value: project.id,
          label: project.name,
          description: project.description,
        })),
      );
    }
  }, [success]);

  const onChange = (value: string) => {
    setCurrentProject(value);
    navigate(`/projects/${value}`);
  };

  return (
    <CustomSelect
      defaultValue={currentProject?.id || project_id}
      onChange={onChange}
      options={optionsList}
      loading={loading}
    />
  );
}
