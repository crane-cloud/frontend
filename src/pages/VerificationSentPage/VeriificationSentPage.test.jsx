/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";

import VerificationSentPage, { mapStateToProps } from "./";

const VerificationSentPageProps = {
  data: [],
  match: { params: { token: "my_token" } },
};

describe("Testing the App Metrics Page component", () => {
  const WrapperVerificationSentPage = VerificationSentPage.WrappedComponent;
  const VerificationSentPageComponent = render(
    <WrapperVerificationSentPage {...VerificationSentPageProps} />
  );
  it("should match the snapshot for VerificationSentPage after adding props", () => {
    VerificationSentPageComponent.setProps(VerificationSentPageProps);
    expect(VerificationSentPageComponent).toBeDefined();
  });
  it("matchs the VerificationSentPage component snapshot", () => {
    expect(VerificationSentPageComponent).toMatchSnapshot();
  });
});

describe("Testing the exported mapstate to props and dispatch", () => {
  it("match the Project settings page mapstostate", () => {
    expect(
      mapStateToProps({
        user: { data: [] },
      })
    ).toEqual({
      data: [],
    });
  });
});
