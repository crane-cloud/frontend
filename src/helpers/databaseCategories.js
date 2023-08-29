export const getDatabaseFlavors = () => {
  const databaseFlavors = [
    { id: 1, name: "All Databases", value: "all" },
    { id: 2, name: "MySQL", value: "mysql" },
    { id: 3, name: "PostgresSQL", value: "postgress" },
  ];
  return databaseFlavors;
};
