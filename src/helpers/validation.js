export const validateDomain = (name) => {
  const expression =
    /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);
  if (!name) {
    return "Please provide domain name";
  } else {
    if (regex.test(name)) {
      if (name.match(!regex)) {
        return "Use accepted formats for example google.com, domain.ug";
      }
    } else {
      return "Domain name should start with a letter";
    }
  }
};

export const validateDomainName = (domainName) => {
  const expression =
    /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);
  if (regex.test(domainName)) {
    if (domainName.match(!regex)) {
      return "false_convention";
    }
    return true;
  }
  return false;
}

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
  if (
    !name ||
    validateName(name) === false ||
    validateName(name) === "false_convention"
  ) {
    return "Project organisation must start with a letter and may only contain letters and a hypen -";
  }
};

export const validateProjectName = (name) => {
  if (!name) {
    return "Project Name cannot be empty";
  }

  if (validateName(name) === "false_convention") {
    return "Project name may only contain letters and a hypen -";
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
    return "Project Type may only contain letters and a hypen -";
  }

  if (validateName(projectType) === false) {
    return "Project Type should start with a letter";
  }

  if (validateName(projectType) === "false_convention") {
    return "Project Type may only contain letters and a hypen -";
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
