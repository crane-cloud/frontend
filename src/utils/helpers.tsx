import { useContext, useEffect, useState } from "react";
import useGet from "./useGet";
import { MenuContext } from "@/components/Layouts/DashboardLayout";
import { Badge } from "@mantine/core";
import { TbCheck, TbX } from "react-icons/tb";
import moment from "moment";
import { BiTrash } from "react-icons/bi";
import { TiEdit } from "react-icons/ti";
import {
  FiCheck,
  FiDatabase,
  FiPlus,
  FiTrash2,
  FiUserPlus,
  FiUserX,
  FiX,
} from "react-icons/fi";
import { format, formatDistanceToNowStrict, parseISO } from "date-fns";
import { AdminMenuContext } from "@/components/Layouts/AdminDashboardLayout";
import { useParams } from "react-router-dom";
import { UserActivity } from "@/types/activity";

export const beautify = (str: string | undefined) => {
  if (typeof str !== "string") {
    return "";
  }
  return (str || "")
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replaceAll("/", "")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const shortenID = (value: string) => {
  if (value) {
    const parts = value.split("-");
    return parts[parts.length - 1]; // Returns the last part after the last hyphen
  }
  return "";
};

export const useGetProject = (project_id: string) => {
  const { setMenuType, setProjectId, setTitle, setSubtitle, setProject } =
    useContext(MenuContext);
  const { data: projectData, getData, success, loading } = useGet();
  const [project, setCurrentProject] = useState<any>({});
  const [cluster, setCluster] = useState<any>({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getData({
      id: project_id,
      api: `/projects`,
    });
  }, [project_id, refresh]);

  useEffect(() => {
    if (success) {
      setCurrentProject(projectData?.data?.project || {});
      setCluster(projectData?.data?.cluster || {});
      if (setTitle) {
        setTitle(projectData?.data?.project?.name || "");
      }
    }
  }, [success, projectData]);

  useEffect(() => {
    setMenuType("project");
    setProjectId(project_id || "");
    if (setProject) {
      setProject(projectData?.data?.project || {});
    }
    if (setTitle && success) {
      setTitle(projectData?.data?.project?.name || "");
      if (projectData?.data?.project?.disabled && setSubtitle) {
        setSubtitle("Disabled");
      }
    }
  }, [setMenuType, project_id, project]);

  return { project, cluster, loading, success, refresh, setRefresh };
};

export const useGetApp = (app_id: string, refresh?: number) => {
  const { setMenuType, setProjectId, setAppId, setTitle, setSubtitle } =
    useContext(MenuContext);
  const { data: appData, getData, success, loading } = useGet();
  const [app, setApp] = useState<any>({});

  useEffect(() => {
    getData({
      id: app_id,
      api: `/apps`,
    });
  }, [app_id, refresh]);

  useEffect(() => {
    if (success) {
      setApp(appData?.data?.apps || {});
      setProjectId(appData?.data?.apps?.project_id || "");
      if (setTitle) {
        setTitle(appData?.data?.apps?.name);
      }
      if (app?.disabled && setSubtitle) {
        setSubtitle("Disabled");
      }
    }
  }, [success, appData]);

  useEffect(() => {
    if (setAppId) {
      setAppId(app_id || "");
    }
    if (appData?.data?.apps?.is_ai) {
      setMenuType("mlops");
    } else {
      setMenuType("app");
    }
    if (setTitle && success) {
      setTitle(appData?.data?.apps?.name);

      if (appData?.data?.apps?.disabled && setSubtitle) {
        setSubtitle("Disabled");
      }
    }
  }, [setMenuType, setAppId, app_id, appData, success]);

  return { app, loading, success, refresh };
};

export const useGetAdminCluster = (cluster_id: string) => {
  useSetAdminClusterSidebar();
  const {
    getData: getClusterInfo,
    data: clusterData,
    loading,
    success,
  } = useGet();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (cluster_id) {
      getClusterInfo({ api: `/clusters/${cluster_id}` });
    }
  }, [cluster_id, refresh]);

  const cluster = clusterData?.data?.cluster;

  return { cluster, clusterData, loading, success, setRefresh };
};

export const returnObject = (show: boolean, object: any) => {
  return show ? object : [];
};

export const useSetHomeSidebar = () => {
  const { setMenuType } = useContext(MenuContext);
  useEffect(() => {
    setMenuType("home");
  }, [setMenuType]);
};

export const useSetNoSidebar = () => {
  const { setMenuType } = useContext(MenuContext);
  useEffect(() => {
    setMenuType("noSidebar");
  }, [setMenuType]);
};
export const useSetAdminHomeSidebar = () => {
  const { setMenuType } = useContext(AdminMenuContext);
  useEffect(() => {
    setMenuType("home");
  }, [setMenuType]);
};
export const useSetAdminClusterSidebar = () => {
  const { setMenuType, setClusterId } = useContext(AdminMenuContext);
  const { cluster_id } = useParams();

  useEffect(() => {
    setMenuType("cluster");
    if (cluster_id) {
      setClusterId(cluster_id);
    }
  }, [setMenuType, setClusterId, cluster_id]);
};

export const useSetContainerSize = (size: string) => {
  const { setContainerSize } = useContext(MenuContext);
  useEffect(() => {
    setContainerSize(size);
  }, [setContainerSize, size]);
};

export const useSetAdminContainerSize = (size: string) => {
  const { setContainerSize } = useContext(AdminMenuContext);
  useEffect(() => {
    setContainerSize(size);
  }, [setContainerSize, size]);

  useEffect(() => {
    return () => {
      setContainerSize("lg");
    };
  }, []);
};

export const getDatabaseStatus = (status: string) => {
  if (status) {
    return (
      <Badge
        color="green"
        variant="outline"
        size="xs"
        leftSection={<TbCheck />}
      >
        Ready
      </Badge>
    );
  }
  return (
    <Badge color="red" variant="outline" size="xs" leftSection={<TbX />}>
      Not Ready
    </Badge>
  );
};

export const numberFormat = (value: number) =>
  Number(value || 0).toLocaleString();

export const dateFormat = (date: string, format = "DD/MMM/YYYY") =>
  moment(date).format(format);

export const formatTimestamp = (timestamp: number) => {
  return format(new Date(timestamp * 1000), "MMM dd HH:mm");
};

export const getConnectionString = (database: any) => {
  if (!database) {
    return "";
  }
  if (database?.database_flavour_name === "postgres") {
    return `postgresql://${database?.user}:${database?.password}@${database?.host}:${database?.port}/${database?.name}`;
  }
  return `mysql://${database?.user}:${database?.password}@${database?.host}:${database?.port}/${database?.name}`;
};

export const convertArrayToObject = (arrayData: any[]) => {
  // Create an object from the array of env variables
  if (!arrayData) {
    return {};
  }
  const envObject = arrayData.reduce(
    (acc, env) => {
      if (env.key && env.key.trim() !== "") {
        acc[env.key] = env.value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  return envObject;
};
export const convertObjectToArray = (objectData: any) => {
  if (!objectData) {
    return [];
  }
  return Object.entries(objectData).map(([key, value]) => ({
    key,
    value,
  }));
};

export const createColumn = (id: any) => {
  return {
    id,
    header: beautify(id),
  };
};

export const removeUnnecessaryFields = (data: any, keys: string[] = []) => {
  const newData = { ...data };
  keys.forEach((item) => {
    delete newData[item];
  });
  return newData;
};

export const createEditAction = (url: string) => {
  return {
    label: "Edit",
    to: url,
    icon: <TiEdit color="var(--mantine-primary-color-7)" size={18} />,
  };
};

export const createDeleteAction = ({
  url,
  params,
}: {
  url: string;
  params?: any;
}) => {
  return {
    label: "Delete",
    to: url,
    icon: <BiTrash color="var(--mantine-color-red-7)" size={18} />,
    params,
  };
};

export const bytesToMB = (bytesPerSecond: number) => bytesPerSecond / 1_000_000;

export const formatMetricValue = (chartType: string, value: number) => {
  if (chartType === "cpu") {
    return `Usage: ${value.toFixed(4)} cores`;
  } else if (chartType === "memory") {
    return `Usage: ${bytesToMB(value).toFixed(2)} MB/s`;
  } else if (chartType === "network") {
    return `Usage: ${Math.round(value).toLocaleString()} KB/s`;
  }
  return `Count: ${value.toLocaleString()}`;
};

export function formatPlural(count: number, singular: string, plural?: string) {
  if (count === 1) {
    return `${count} ${singular}`;
  }
  return `${count} ${plural || `${singular}s`}`;
}

export function formatAgo(age: string) {
  return age
    .replace(/\b1 years\b/, "1 year")
    .replace(/\b1 months\b/, "1 month")
    .replace(/\b1 days\b/, "1 day")
    .replace(/\b1 hours\b/, "1 hour")
    .replace(/\b1 minutes\b/, "1 minute")
    .replace(/\b1 seconds\b/, "1 second");
}

export const detailsCardView = (item: any) => {
  const new_item: any = {};
  Object.keys(item).forEach((key) => {
    if (!key.includes("-name")) {
      new_item[key] =
        item[`${key}-name`] != null ? item[`${key}-name`] : item[key];
    }
  });
  return new_item;
};

export const formatDate = (value: any, format?: string) => {
  return moment(value).format(format || "DD MMM YYYY");
};

export const validateProjectName = (name: string) => {
  return name.length <= 30 && /^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/.test(name);
};

/**
 * Validates username to ensure it only contains alphanumeric characters, underscores, and hyphens
 */
export const validateUsername = (
  username: string,
): {
  isValid: boolean;
  errorMessage: string | null;
} => {
  if (!username || username.trim() === "") {
    return {
      isValid: false,
      errorMessage: "Username is required",
    };
  }

  // Check for spaces
  if (/\s/.test(username)) {
    return {
      isValid: false,
      errorMessage: "Username cannot contain spaces",
    };
  }

  // Only allow alphanumeric characters, underscores, and hyphens
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return {
      isValid: false,
      errorMessage:
        "Username can only contain letters, numbers, underscores, and hyphens",
    };
  }

  // Optional: Check minimum length
  if (username.length < 3) {
    return {
      isValid: false,
      errorMessage: "Username must be at least 3 characters long",
    };
  }

  // Optional: Check maximum length
  if (username.length > 30) {
    return {
      isValid: false,
      errorMessage: "Username cannot exceed 30 characters",
    };
  }

  return {
    isValid: true,
    errorMessage: null,
  };
};

export const formatClusterServicePorts = (ports: any) => {
  let portValue = "";
  ports.map((port: any) => {
    if (portValue !== "") {
      portValue += ", ";
    }
    portValue += `${port.port}`;
    if (port.nodePort !== undefined) {
      portValue += `:${port.nodePort}`;
    }
    portValue += `/${port.protocol}`;
    return portValue;
  });
  return portValue;
};

// Password Validation
export type PasswordStrength =
  | "very-weak"
  | "weak"
  | "fair"
  | "good"
  | "strong";

export const strengthColorMap: Record<PasswordStrength, string> = {
  "very-weak": "red.7",
  weak: "red.5",
  fair: "orange.5",
  good: "blue.5",
  strong: "green.6",
};

export const strengthValueMap: Record<PasswordStrength, number> = {
  "very-weak": 20,
  weak: 40,
  fair: 60,
  good: 80,
  strong: 100,
};

export const strengthLabelMap: Record<PasswordStrength, string> = {
  "very-weak": "Very Weak",
  weak: "Weak",
  fair: "Fair",
  good: "Good",
  strong: "Strong",
};

export const strengthDescriptionMap: Record<PasswordStrength, string> = {
  "very-weak": "Your password is vulnerable to attacks",
  weak: "Add more characters and variety",
  fair: "Consider adding special characters",
  good: "Almost there! Add more complexity",
  strong: "Excellent! Your password is secure",
};

export const getPasswordStrength = (password: string): PasswordStrength => {
  if (!password) {
    return "very-weak";
  }

  let score = 0;

  // Length scoring (0-30 points)
  if (password.length >= 8) {
    score += 10;
  }
  if (password.length >= 12) {
    score += 10;
  }
  if (password.length >= 16) {
    score += 10;
  }

  // Character variety scoring (0-40 points)
  if (/[a-z]/.test(password)) {
    score += 5; // lowercase
  }
  if (/[A-Z]/.test(password)) {
    score += 5; // uppercase
  }
  if (/[0-9]/.test(password)) {
    score += 10; // numbers
  }
  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 15; // special characters
  }
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 5; // common special chars
  }

  // Pattern complexity (0-20 points)
  if (!/(.)\1{2,}/.test(password)) {
    score += 5; // no repeating chars (3+)
  }
  if (!/123|abc|qwe|pass|admin/i.test(password)) {
    score += 5; // no common patterns
  }
  if (password.length > 0 && !/^(.)\1*$/.test(password)) {
    score += 5; // not all same char
  }
  if (!/^[a-zA-Z]+$/.test(password) && !/^[0-9]+$/.test(password)) {
    score += 5; // mixed types
  }

  // Entropy bonus (0-10 points)
  const uniqueChars = new Set(password.toLowerCase()).size;
  if (uniqueChars >= 8) {
    score += 5;
  }
  if (uniqueChars >= 12) {
    score += 5;
  }

  // Convert score to strength level
  if (score < 25) {
    return "very-weak";
  }
  if (score < 45) {
    return "weak";
  }
  if (score < 65) {
    return "fair";
  }
  if (score < 85) {
    return "good";
  }
  return "strong";
};

export const getPasswordCriteria = (password: string) => {
  return [
    {
      label: "At least 8 characters",
      met: password.length >= 8,
      critical: true,
    },
    {
      label: "Contains uppercase letter",
      met: /[A-Z]/.test(password),
      critical: true,
    },
    {
      label: "Contains lowercase letter",
      met: /[a-z]/.test(password),
      critical: true,
    },
    {
      label: "Contains number",
      met: /[0-9]/.test(password),
      critical: true,
    },
    {
      label: "Contains special character",
      met: /[^a-zA-Z0-9]/.test(password),
      critical: true,
    },
    {
      label: "At least 12 characters (recommended)",
      met: password.length >= 12,
      critical: false,
    },
    {
      label: "No common patterns",
      met: !/123|abc|qwe|pass|admin|password/i.test(password),
      critical: false,
    },
  ];
};

export const getPasswordRequirements = (value: string) => [
  {
    test: value.length >= 6,
    message: "At least 6 characters",
    met: value.length >= 6,
  },
  {
    test: /[A-Z]/.test(value),
    message: "One uppercase letter",
    met: /[A-Z]/.test(value),
  },
  {
    test: /[a-z]/.test(value),
    message: "One lowercase letter",
    met: /[a-z]/.test(value),
  },
  {
    test: /[0-9]/.test(value),
    message: "One number",
    met: /[0-9]/.test(value),
  },
  {
    test: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    message: "One special character",
    met: /[!@#$%^&*(),.?":{}|<>]/.test(value),
  },
];

export const validatePasswordRequirements = (password: string) => {
  const requirements = getPasswordRequirements(password);
  const unmetRequirements = requirements.filter((req) => !req.met);

  return {
    isValid: unmetRequirements.length === 0,
    unmetRequirements,
    allRequirements: requirements,
    errorMessage:
      unmetRequirements.length > 0 ? "Password requirements not met" : null,
  };
};

export const validatePasswordsMatch = (
  password: string,
  confirmPassword: string,
) => {
  if (!confirmPassword) {
    return {
      isValid: false,
      errorMessage: "Please confirm your password",
    };
  }

  if (password !== confirmPassword) {
    return {
      isValid: false,
      errorMessage: "Passwords do not match",
    };
  }

  return {
    isValid: true,
    errorMessage: null,
  };
};

export const getPasswordValidationState = (
  password: string,
  type: "login" | "register",
) => {
  if (type === "login") {
    return {
      isValid: password.length > 0,
      errorMessage: password.length === 0 ? "Password is required" : null,
    };
  }

  return validatePasswordRequirements(password);
};

export function getActivityDescription(desc: string): string {
  const match = desc.match(/'message':\s*'([^']+)'/);
  return match ? beautify(match[1]) : beautify(desc);
}

export const getActivityOperationIcon = (activity: UserActivity) => {
  const operation = beautify(activity.operation);
  const model = beautify(activity.model);

  if (operation.includes("Delete")) {
    return <FiTrash2 size={16} color="gray" />;
  }
  if (operation === "Create") {
    return <FiPlus size={16} color="gray" />;
  }
  if (operation === "Follow") {
    return <FiUserPlus size={16} color="gray" />;
  }
  if (operation === "Unfollow") {
    return <FiUserX size={16} color="gray" />;
  }
  if (operation.includes("Enable")) {
    return <FiCheck size={16} color="gray" />;
  }
  if (operation.includes("Disable")) {
    return <FiX size={16} color="gray" />;
  }
  if (model === "Database") {
    return <FiDatabase size={20} color="gray" />;
  }

  return null;
};

// User activity relative date helper
export function formatRelativeDate(dateString: string) {
  try {
    const normalized = dateString.endsWith("Z") ? dateString : `${dateString}Z`;
    return formatDistanceToNowStrict(parseISO(normalized), { addSuffix: true });
  } catch {
    return dateString;
  }
}

// User activity status color
export const getStatusColor = (status: string): string => {
  const statusLower = status.toLowerCase();
  if (statusLower.includes("success") || statusLower === "completed") {
    return "green";
  }
  if (statusLower.includes("fail") || statusLower === "error") {
    return "red";
  }
  if (statusLower.includes("pending") || statusLower === "in progress") {
    return "yellow";
  }
  return "gray";
};

// Date for tooltip
export const formatAbsoluteDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

// Get color for tag badges
export const getTagColor = (tagName: string) => {
  const brightColors = [
    "blue.6",
    "cyan.6",
    "teal.6",
    "green.6",
    "lime.6",
    "yellow.6",
    "orange.6",
    "red.6",
    "pink.6",
    "grape.6",
    "violet.6",
    "indigo.6",
  ];

  let hash = 0;
  for (let i = 0; i < tagName.length; i++) {
    hash = tagName.charCodeAt(i) + ((hash << 5) - hash);
  }

  return brightColors[Math.abs(hash) % brightColors.length];
};

export function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: { label: string; seconds: number }[] = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return count === 1
        ? `${count} ${interval.label} ago`
        : `${count} ${interval.label}s ago`;
    }
  }

  return "just now";
}

export type InvalidFeedback = {
  hashtags?: string[];
  commas?: string[];
  numbers?: string[];
};

export const sanitizeTags = (values: string[]) => {
  const invalid: InvalidFeedback = {};
  const valid: string[] = [];

  for (const tag of values) {
    const trimmed = tag.trim().toLowerCase();
    if (!trimmed) {
      continue;
    }

    if (trimmed.startsWith("#")) {
      invalid.hashtags = [...(invalid.hashtags || []), tag];
      continue;
    }

    if (trimmed.includes(",")) {
      invalid.commas = [...(invalid.commas || []), tag];
      continue;
    }

    if (/^\d+$/.test(trimmed)) {
      invalid.numbers = [...(invalid.numbers || []), tag];
      continue;
    }

    valid.push(trimmed);
  }

  // Deduplicate valid tags
  const uniqueValid = Array.from(new Set(valid));

  return { validTags: uniqueValid, invalid };
};
