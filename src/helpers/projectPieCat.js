export const projectPieCategories = () => {
    const projectPieChartCategories = [
      { id: 1, name: "Project Categories Summary", value: "Projects" },
      { id: 2, name: "Orgaisation Categories Summary", value: "Organizations" },
    ];
    return projectPieChartCategories;
  };

  export const projectGraphCategories = () => {
    const projectGraphCategories = [
      { id : 1, name : "Projects" , value: "Projects"},
      { id : 2, name : "Types" , value : "Types"},
    ];
    return projectGraphCategories;
  }
  export const projectLists = () => {
    const projectLists = [
      { id : 1, name : "All Projects" , value: "All Projects"},
      { id : 2, name : "Active Projects" , value : "Active Projects"},
      { id : 3, name : "Disabled Projects" , value : "Disabled Projects"},
    ];
    return projectLists;
  }
