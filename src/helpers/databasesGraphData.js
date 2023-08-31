export const createDatabaseGraphData = (databases) => {
  const graphDataArray = [];

  databases.forEach((database) => {
    const date = new Date(database.date_created);
    const year = date.getFullYear();
    const month = parseInt(
      date.toLocaleString("default", { month: "2-digit" }),
      10
    );

    // Check if an entry with the same year and month already exists
    const existingEntryIndex = graphDataArray.findIndex(
      (entry) => entry.Year === year.toString() && entry.Month === month
    );

    if (existingEntryIndex !== -1) {
      // If entry exists, increment the Value
      graphDataArray[existingEntryIndex].Value += 1;
    } else {
      // Otherwise, create a new entry
      graphDataArray.push({ Year: year.toString(), Month: month, Value: 1 });
    }
  });

  return graphDataArray.sort((a, b) => {
    if (a.Year === b.Year) {
      // Sort by month if years are equal
      return a.Month - b.Month;
    } else {
      // Sort by year
      return a.Year.localeCompare(b.Year);
    }
  });
};
