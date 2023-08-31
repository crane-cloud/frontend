export const createDatabasesPieChartData = (databaseCounts) => {
  const pieChartData = [
    { category: "MySQL", value: databaseCounts.mysql },
    { category: "PostgreSQL", value: databaseCounts.postgres },
  ];
  return pieChartData;
};
