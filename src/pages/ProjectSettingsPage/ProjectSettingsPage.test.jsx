/* eslint-disable no-undef */
import React from "react";
import { shallow } from "enzyme";
import ProjectSettingsPage, { mapStateToProps } from "./";

const ProjectSettingsPageProps = {
  match: { params: { projectID: "1" } },
  location: { pathname: "path" },
  data: [],

};


describe("Testing the Project Settings Page component", () => {
  const WrapperProjectSettingsPage = ProjectSettingsPage.WrappedComponent;
  const ProjectSettingsPageComponent = shallow(
    <WrapperProjectSettingsPage {...ProjectSettingsPageProps} />
  );

  it("should match the snapshot for ProjectSettingsPage after adding props", () => {
    ProjectSettingsPageComponent.setProps(ProjectSettingsPage);
    expect(ProjectSettingsPageComponent).toBeDefined();
  });
  it("matchs the ProjectSettingsPage component snapshot", () => {
    expect(ProjectSettingsPageComponent).toMatchSnapshot();
  });
  it("test functions inside components",()=>{
   // const spy = jest.spyOn(ProjectSettingsPageComponent, 'getProjectMemberz');
   // const getMembers = ProjectSettingsPageComponent.instance().getProjectMemberz();
   // expect(spy)
    // .toBeCalled();
  })

});

describe("Testing the exported mapstate to props and dispatch for ProjectSettingsPage", () => {
  it("matches the ProjectSettingsPage mapstostate", () => {
    expect(
      mapStateToProps({
        user: { data: [] },
      })
    ).toEqual({
      data: [],
    });
  });
});
