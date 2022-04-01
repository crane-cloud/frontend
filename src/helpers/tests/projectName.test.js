import {
  getProjectName,
  getDateCreated,
  getProjectDescription,
} from "../projectName";

it("should call the get project name function ", () => {
  let projects = [
    { id: 0, name: "fruit" },
    { id: 1, name: "vegetable" },
  ];
  expect(getProjectName(projects, 1)).toEqual("vegetable");
});
it("this calls the getDateCreated method ", () => {
  let sampleProjects = [
    { Id: 0, date_created: "12-02-2022" },
    { Id: 1, date_created: "08-10-2022" },
  ];
  console.log(getDateCreated(sampleProjects, 1))
  expect(getDateCreated(sampleProjects, 1)).toEqual("08-10-2022");
});
it("return of project description ", () => {
  let projectsExample = [
    { projectId: 0, description: "airqo" },
    { projectId: 1, description: "cranecloud" },
  ];
  expect(getProjectDescription(projectsExample, 1)).toEqual("cranecloud");
});
