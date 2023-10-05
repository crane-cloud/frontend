export const getStatusColor = (status) => {
  return status === "success" ? "green" : "red";
};

export const toSentenceCase = (str) => {
  const replacements = {
    cranecloud_status: "Crane Cloud Status",
    "cranecloud-frontend": "Crane Cloud Frontend",
    "cranecloud-backend": "Crane Cloud Backend",
    mysql: "MySQL",
    postgres: "PostgreSQL",
  };

  Object.entries(replacements).forEach(([search, replace]) => {
    if (str.includes(search)) {
      str = str.replace(search, replace);
    }
  });

  return str
    .split(/[_-]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const getStatusValueByKey = (key, status) => {
  if (key.includes("cluster_status")) {
    key = key.replace("cluster_status", "clusters_status");
  }

  return status[key]?.status || "Key not found";
};

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};
