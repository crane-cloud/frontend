import React from 'react';

import { shallow } from 'enzyme';

import Logo from './index';

describe('Logo Component', () => {
    it('Renders a Logo component', () => {
        const LogoComponent = shallow(<Logo />);
        
        expect(LogoComponent).toMatchSnapshot();

        const LogoType = LogoComponent.find("div > div");
        expect(LogoType.hasClass("LogoType")).toEqual(true);
        expect(LogoType.text()).toBe("Crane Cloud");
    })
})