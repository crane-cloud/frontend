export const projectCategories = (
  allProjects,
  myProjectsList,
  sharedProjectsList
) => {
  const categories = [
    { id: 1, name: `All (${allProjects.length})`, value: "All" },
    {
      id: 2,
      name: `My Projects (${myProjectsList.length})`,
      value: "My Projects",
    },
    {
      id: 3,
      name: `Shared Projects (${sharedProjectsList.length})`,
      value: "Shared Projects",
    },
  ];
  return categories;
};
