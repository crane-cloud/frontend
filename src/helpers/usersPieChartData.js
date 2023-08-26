export const createUsersPieChartData = (userCounts) => {
  const pieChartData = [
    { category: "Verified Users", value: userCounts.verified },
    { category: "Unverified Users", value: userCounts.unverified },
    { category: "Beta Users", value: userCounts.beta },
  ];
  return pieChartData;
};
