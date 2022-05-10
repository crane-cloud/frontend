import React from 'react';

import { shallow } from 'enzyme';

import NavLogo from '.';


describe('Test the nav logo', () => { 
    it('checks for correct rendering of the component', () => {
        const NavLogoComponent = shallow(<NavLogo />);
        expect(NavLogoComponent).toMatchSnapshot();
        expect(NavLogoComponent.find('img').length).toBe(1);
    })
})