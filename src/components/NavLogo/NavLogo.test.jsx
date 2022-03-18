import React from 'react';

import { shallow } from 'enzyme';

import NavLogo from '.';


describe('NavLogo Component', () => { 
    it('Renders correctly', () => {
        const NavLogoComponent = shallow(<NavLogo />)
        expect(NavLogoComponent).toMatchSnapshot();
        expect(NavLogoComponent.find('img').length).toBe(1)
    })
})