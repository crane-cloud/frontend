import React from "react";
import { shallow } from "enzyme";
import TeamPage from ".";

describe('Testing the TeamPage component', () => {
    it('should match the team page snapshot', () => {
        const TeamPageComponent = shallow(<TeamPage />);
        expect(TeamPageComponent).toMatchSnapshot();
    })
})