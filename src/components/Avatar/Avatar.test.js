import React from 'react';
import { shallow } from "enzyme";
import Avatar from './index';

const sampleName = "JohnDoe";
describe('Test the avatar component', () => {
    const AvatarComponent = shallow(<Avatar name={sampleName} />);
    it('checks if the avatar component matches the snapshot', () => {
        expect(AvatarComponent).toMatchSnapshot();
    });
    it('checks if the avatar component correctly displays the name initial', () => {
        const UserAvatar = AvatarComponent.find("div");
        // Has class
        expect(UserAvatar.hasClass("UserAvatar")).toBe(true);
        // Renders the name initial correctly
        expect(UserAvatar.text()).toEqual(sampleName.charAt(0).toUpperCase());
    });
});