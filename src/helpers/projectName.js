export function getProjectName(projects, id) {
  let name = projects?.find((project) => project.id === id);
  return name?.name
}

export function getProjectDescription(projects, id) {
  let description = projects?.find((project) => project.id === id).description;
  return description
}

export function getDateCreated(projects, projectID) {
  let created = projects?.find((project) => project.id === projectID);
  return created?.date_created
}
