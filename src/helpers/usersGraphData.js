export const createUserGraphData = (users) => {
  const graphDataArray = [];

  users.forEach((user) => {
    const date = new Date(user.date_created);
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

export const createappsGraphData = (apps) => {
  const graphDataArray = [];

  apps.forEach((app) => {
    const date = new Date(app.date_created);
    const year = date.getFullYear();
    const month = parseInt(
      date.toLocaleString("default", { month: "2-digit" }),
      10
    );

    // Check if an entry with the same year and month already exists
    const existingEntryIndex = graphDataArray.findIndex(
      (entry) => entry.year === year.toString() && entry.month === month
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
