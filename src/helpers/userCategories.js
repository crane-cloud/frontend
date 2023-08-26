export const getUserCategories = () => {
  const userCategories = [
    { id: 1, name: "All Users", value: "all" },
    { id: 2, name: "Active Users", value: "active" },
    { id: 3, name: "Verified Users", value: "verified" },
    { id: 4, name: "Unverified Users", value: "unverified" },
    { id: 5, name: "Beta Users", value: "beta" },
  ];
  return userCategories;
};
