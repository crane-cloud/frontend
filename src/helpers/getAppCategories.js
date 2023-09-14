export const getAppCategories = () => {
  const appCategories = [
    { id: 1, name: "All Apps", value: "all" },
    { id: 2, name: "Active Apps", value: "active" },
    { id: 3, name: "Disabled Apps", value: "disabled" },
  ];
  return appCategories;
};
