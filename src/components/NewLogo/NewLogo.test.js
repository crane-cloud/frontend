import React from 'react';

import { shallow } from 'enzyme';

import NewLogo from './index';

describe('NewLogo Component', () => {
    it('Renders a Logo component', () => {
        const LogoComponent = shallow(<NewLogo />);
        
        expect(LogoComponent).toMatchSnapshot();

        const BrandLogoType = LogoComponent.find("div > div");
        expect(BrandLogoType.hasClass("BrandLogoType")).toEqual(true);
        expect(BrandLogoType.text()).toBe("Crane Cloud");
    })
})