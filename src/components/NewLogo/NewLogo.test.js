import React from 'react';

import { shallow } from 'enzyme';

import NewLogo from './index';

describe('Test new logo', () => {
    it('checks whether the component rendered correctly', () => {
        const NewLogoComponent = shallow(<NewLogo />);
        
        expect(NewLogoComponent).toMatchSnapshot();

        const BrandLogoType = NewLogoComponent.find("div > div");
        expect(BrandLogoType.hasClass("BrandLogoType")).toEqual(true);
        expect(BrandLogoType.text()).toBe("Crane Cloud");
    })
})