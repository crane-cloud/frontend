export const filterStatusData = (data) => {
  // Calculate the start date for the 30-day window.
  const currentDate = new Date();
  const startDate = new Date();
  startDate.setDate(currentDate.getDate() - 30);

  return Object.keys(data).reduce((result, parentName) => {
    result[parentName] = {};
    Object.keys(data[parentName]).forEach((name) => {
      const subgroup = data[parentName][name];

      // Create a map to track unique dates and their latest records
      const uniqueDatesMap = new Map();

      // Iterate through the subgroup and populate the uniqueDatesMap
      subgroup.forEach((data) => {
        const timestamp = data.timestamp * 1000;
        const date = new Date(timestamp);
        const formattedDate = date.toDateString();

        // Only consider data within the 30-day window
        if (date >= startDate && date <= currentDate) {
          if (
            !uniqueDatesMap.has(formattedDate) ||
            timestamp > uniqueDatesMap.get(formattedDate).timestamp
          ) {
            uniqueDatesMap.set(formattedDate, {
              ...data,
              timestamp: formattedDate,
            });
          }
        }
      });

      const latestRecords = Array.from(uniqueDatesMap.values());
      latestRecords.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );

      if (latestRecords.length > 0) {
        result[parentName][name] = latestRecords;
      }
    });
    return result;
  }, {});
};
