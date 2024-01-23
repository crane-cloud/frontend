export const validateDomain = (name) => {
  const expression =
    /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

  if (!name) {
    return "Please provide a domain name";
  }

  if (!expression.test(name)) {
    return "Use accepted formats, for example, google.com, yourdomain.ug";
  }

  return false;
};

export const validateName = (name) => {
  if (/^[a-z]/i.test(name)) {
    if (name.match(/[^-a-zA-Z]/)) {
      return "false_convention";
    }
    return true;
  }
  return false;
};

export const validateProjectDescription = (description) => {
  if (!description || description.length <= 1) {
    return "Add Project Description";
  }
};

export const validateOrganizationName = (name) => {
  if (!name) {
    return "Organisation field can't be an empty";
  }
};

export const validateProjectName = (name) => {
  if (!name) {
    return "Project Name cannot be empty";
  }

  if (validateName(name) === "false_convention") {
    return "Project name can only contain letters and a hypen but no spaces.";
  }

  if (validateName(name) === false) {
    return "Project name should start with a letter";
  }

  if (name.length > 30) {
    return "Project name may not exceed 30 characters";
  }
};

export const validateProjectType = (projectType) => {
  if (!projectType) {
    return "Project Type cannot be empty";
  }

  if (projectType.length < 4) {
    return "Project Type must be at least 4 characters";
  }

  if (validateName(projectType) === "false_convention") {
    return "Project Type may only contain letters and a hypen but no spaces.";
  }

  if (validateName(projectType) === false) {
    return "Project Type should start with a letter";
  }
};

export const handleProjectValidation = (
  projectName,
  projectDescription,
  organisationType,
  organisation,
  clusterID
) => {
  if (
    !projectName ||
    !clusterID ||
    !projectDescription ||
    !organisationType ||
    !organisation
  ) {
    return "All fields are required";
  } else if (!clusterID) {
    return "Please select a cluster";
  } else if (validateProjectDescription(projectDescription) !== undefined) {
    return validateProjectDescription(projectDescription);
  } else if (validateProjectName(projectName) !== undefined) {
    return validateProjectName(projectName);
  } else if (validateProjectType(organisationType) !== undefined) {
    return validateProjectType(organisationType);
  } else if (validateOrganizationName(organisation) !== undefined) {
    return validateOrganizationName(organisation);
  }
};

export default handleProjectValidation;
