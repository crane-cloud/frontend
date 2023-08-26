export const retrieveDefaultDateRanges = () => {
  const ranges = [
    { id: 1, name: "7 Days ago", value: "7" },
    { id: 2, name: "14 Days ago", value: "14" },
    { id: 3, name: "30 Days ago", value: "30" },
    { id: 4, name: "Custom range", value: "custom" },
  ];

  return ranges;
};
