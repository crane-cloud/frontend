export const filterStatusData = (data) => {
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
        const formattedDate = date.toDateString(); // You can format the date as desired

        if (
          !uniqueDatesMap.has(formattedDate) ||
          timestamp > uniqueDatesMap.get(formattedDate).timestamp
        ) {
          uniqueDatesMap.set(formattedDate, {
            ...data,
            timestamp: formattedDate,
          });
        }
      });

      // Convert the map values (latest records) back to an array
      const latestRecords = Array.from(uniqueDatesMap.values());

      // Sort the latestRecords by timestamp (most current first)
      latestRecords.sort(
        (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
      );

      const slicedRecords = latestRecords.slice(12);

      if (slicedRecords.length > 0) {
        result[parentName][name] = slicedRecords;
      }
    });
    return result;
  }, {});
};
