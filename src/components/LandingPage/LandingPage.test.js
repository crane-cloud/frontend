import React from 'react';

import { shallow } from 'enzyme';

import LandingPage from './';

const LandingPageProps = {
    user: {
        data: {
            id: ""
        }
    }
}
describe('LandingPage component test', () => { 
    it('matches rendered component with the existing snapshot', () => {
        const wrapper = LandingPage.WrappedComponent;
        const LandingPageComponent = shallow(<wrapper {...LandingPageProps} />);
        expect(LandingPageComponent).toMatchSnapshot();
    })
})
