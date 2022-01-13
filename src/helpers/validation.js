const validateName = (name) => {
  if (/^[a-z]/i.test(name)) {
    if (name.match(/[^-a-zA-Z]/)) {
      return "false_convention";
    }
    return true;
  }
  return false;
};

const validateProjectName = (name) => {
  let projectNameError;

  if (!name) {
    projectNameError = "Project Name cannot be empty";
  }

  if (validateName(name) === "false_convention") {
    projectNameError = "Project name may only contain letters and a hypen -";
  }

  if (validateName(name) === false) {
    projectNameError = "Project name should start with a letter";
  }

  if (name.length > 30) {
    projectNameError = "Project name may not exceed 30 characters";
  };

  return projectNameError;
};

const validateProjectType = (type) => {
  let projectTypeError;

  if (!type) {
    projectTypeError = "Project Type cannot be empty";
  }

  if (type.length < 4) {
    projectTypeError = "Project Type must be at least 4 characters";
  }

  if(validateName(type) === "false_convention") {
    projectTypeError = "Project Type may only contain letters and a hypen -";
  }

  if(validateName(type) === false) {
    projectTypeError = "Project Type should start with a letter";
  }

  if (validateName(type) === "false_convention") {
    projectTypeError = "Project Type may only contain letters and a hypen -";
  }

  return projectTypeError;
};


export const handleProjectValidation = ({
  projectName,
  projectDescription,
  organisationType,
  organisation,
}) => {
  let error = "";

  //Name
  error = validateProjectName(projectName);

  // project type
  error = validateProjectType(organisationType);
  
  // project description
  if (!projectDescription) {
    error = "Project description cannot be empty";
  }

  if (!organisationType) {
    error = "Select organisation type";
  }

  if (!organisation) {
    error = "Organisation cannot be empty";
  }

  return error;
};
