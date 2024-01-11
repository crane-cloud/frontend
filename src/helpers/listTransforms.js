// Function to transform a list into the required format
export const transformListForSelect = (list) => {
  return list.map((item, index) => ({
    id: index + 1,
    name: item,
    value: item,
  }));
};

export const transformProjectsListForSelect = (projects) => {
  return projects.map((project, index) => ({
    id: project.id,
    name: project.name,
    index: index,
  }));
};
