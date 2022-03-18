import React from 'react';

import { shallow } from 'enzyme';

import Logo from './index';

describe('Logo component test', () => {
    it('checks whether the component rendered with expected elements', () => {
        const LogoComponent = shallow(<Logo />);
        
        expect(LogoComponent).toMatchSnapshot();

        const LogoType = LogoComponent.find("div > div");
        expect(LogoType.hasClass("LogoType")).toEqual(true);
        expect(LogoType.text()).toBe("Crane Cloud");
    })
})