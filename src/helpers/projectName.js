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

export function getUser(users, userID){
  let user = users?.find((user) => user.id === userID);
  return user
}

export function nameStringToHslColor(name){
  let hash = 0;
  let i = 0;
  for (i; i < name?.length; i += 1) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash); // eslint-disable-line no-bitwise
  }
  const h = hash % 360;
  return `hsl(${h}, 30%, 80%)`; // syntax: hsl(h, s%, l%)
};

export function avatarName(name){
  return name?.match(/(\b\S)?/g).join("")
    .match(/(^\S|\S$)?/g)
    .join("").toUpperCase();
}
