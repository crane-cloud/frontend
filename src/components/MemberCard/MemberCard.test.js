import React from "react";
import { shallow } from "enzyme";
import MemberCard from ".";

describe('Testing the MemberCard component', () => {
    it('should match the member card snapshot', () => {
        const MemberCardComponent = shallow(<MemberCard  name="" title="" icon=""  />);
        expect(MemberCardComponent).toMatchSnapshot();
    })
})